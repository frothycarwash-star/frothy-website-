/**
 * Website conversion tracking.
 *
 * Design rules this file must keep to:
 *   1. No monetary value on any event. Only a completed Square payment is
 *      revenue, and that never happens in the browser. Adding `value` here
 *      would flow into Google Ads conversion value and fabricate ROAS.
 *   2. No personal data is transmitted. Attribution lives in the visitor's
 *      own localStorage and is attached to events; names, phone numbers and
 *      email addresses are never read, hashed or sent from this module.
 *   3. Every event is deduplicated on our side. Platform-side deduplication
 *      is not relied upon.
 *   4. Nothing here may throw into the booking flow. Tracking failures must
 *      be silent to the customer.
 */

/** Click identifiers and campaign parameters captured from the landing URL. */
const ATTRIBUTION_KEYS = [
  'gclid', 'gbraid', 'wbraid',      // Google
  'fbclid',                          // Meta
  'msclkid',                         // Microsoft
  'ttclid',                          // TikTok
  'li_fat_id',                       // LinkedIn
  'twclid',                          // X
  'utm_source', 'utm_medium', 'utm_campaign',
  'utm_term', 'utm_content', 'utm_id',
] as const

const FORMSPREE_ENDPOINT = 'formspree.io/f/mdavkzej'
const MEASUREMENT_ID = 'G-TEGKNGS3QS'

const STORE_KEY = 'frothy_attribution_v2'
const LEAD_DEDUP_KEY = 'frothy_leads_sent_v1'
const SESSION_REF_KEY = 'frothy_sid'

/**
 * Attribution older than this is treated as invalid and purged.
 *
 * localStorage has NO native expiry. A record does not delete itself after
 * 90 days — it sits in the browser until this code runs again and removes
 * it, which only happens when the visitor returns to the site (or they
 * clear browsing data themselves). What is guaranteed is that an expired
 * record is never read and never attached to an event.
 */
const TTL_MS = 90 * 24 * 60 * 60 * 1000

/** Repeat suppression window for click events, in milliseconds. */
const CLICK_DEDUP_MS = 1500

/** How many recent lead references to remember for deduplication. */
const LEAD_DEDUP_LIMIT = 50

/**
 * Outbound intent events: [href pattern, event name].
 *
 * NOTE: none of these carries a value. A directions tap is not worth $5.
 */
const OUTBOUND_EVENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/^tel:/i, 'contact_call_click'],
  [/^mailto:/i, 'contact_email_click'],
  [/(^https?:)?\/\/(wa\.me|(api|web)\.whatsapp\.com)/i, 'contact_whatsapp'],
  [/(maps\.google\.[a-z.]+|google\.[a-z.]+\/maps)/i, 'get_directions'],
  [/(square\.site|square\.link)/i, 'booking_start_square'],
]

/**
 * The GA4 event name for a submitted booking request.
 *
 * Deliberately still `qualify_lead`. Production GA4 and Google Ads both key
 * off this name today; renaming it to `generate_lead` in isolation would
 * silently stop recording lead conversions. The rename is a coordinated
 * account-plus-code change — see docs/tracking-events.md.
 */
export const LEAD_EVENT_NAME = 'qualify_lead'

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]
type Attribution = Partial<Record<AttributionKey, string>>
type Touch = Attribution & { ts: number; landing_page: string; referrer: string }
type Store = { first: Touch; last: Touch }
type BookingPayload = Attribution & { reference?: string; service?: string }
type TrackingWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

let installed = false
let cachedSessionId: string | null = null
const recentClicks = new Map<string, number>()

/* ------------------------------------------------------------------ *
 * Storage helpers — every access is guarded.
 * Private browsing, disabled storage and quota errors must all degrade
 * to "no attribution" rather than throwing.
 * ------------------------------------------------------------------ */

function safeRead(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeWrite(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable or full — attribution is best-effort */
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* nothing to do */
  }
}

function isExpired(store: Store | null): boolean {
  if (!store) return true
  return Date.now() - store.last.ts > TTL_MS
}

function isValidTouch(value: unknown): value is Touch {
  if (!value || typeof value !== 'object') return false
  const touch = value as Record<string, unknown>
  return typeof touch.ts === 'number' && Number.isFinite(touch.ts)
}

/** Reads the store, returning null for missing, malformed or expired data. */
export function readStore(): Store | null {
  const raw = safeRead(STORE_KEY)
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    safeRemove(STORE_KEY) // malformed JSON is unusable — drop it
    return null
  }

  const candidate = parsed as Partial<Store> | null
  if (!candidate || !isValidTouch(candidate.first) || !isValidTouch(candidate.last)) {
    safeRemove(STORE_KEY)
    return null
  }

  const store = candidate as Store
  if (isExpired(store)) {
    safeRemove(STORE_KEY)
    return null
  }
  return store
}

/** Deletes attribution older than the TTL. Called on every initialization. */
export function purgeExpiredAttribution(): void {
  const raw = safeRead(STORE_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw) as Partial<Store>
    if (!isValidTouch(parsed.last) || isExpired(parsed as Store)) {
      safeRemove(STORE_KEY)
    }
  } catch {
    safeRemove(STORE_KEY)
  }
}

/* ------------------------------------------------------------------ *
 * Attribution capture
 * ------------------------------------------------------------------ */

export function captureAttribution(): void {
  const params = new URLSearchParams(window.location.search)
  const found: Attribution = {}
  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 300)
  })
  if (Object.keys(found).length === 0) return

  const prior = readStore()
  const touch: Touch = {
    ...found,
    ts: Date.now(),
    landing_page: window.location.pathname.slice(0, 200),
    referrer: (document.referrer || '').slice(0, 200),
  }

  const next: Store = {
    first: prior?.first ?? touch, // written once, never overwritten
    last: touch,                  // always the most recent tagged arrival
  }
  safeWrite(STORE_KEY, JSON.stringify(next))
}

/**
 * Flattens the stored attribution into GA4 event parameters.
 * Returns {} when storage is empty, malformed, unavailable or expired.
 */
export function attributionParams(): Record<string, string> {
  const store = readStore()
  if (!store) return {}

  const out: Record<string, string> = {}
  ATTRIBUTION_KEYS.forEach((key) => {
    const last = store.last[key]
    const first = store.first[key]
    if (last) out[key] = last
    if (first) out[`first_${key}`] = first
  })
  if (store.first.landing_page) out.first_landing_page = store.first.landing_page
  if (store.last.landing_page) out.last_landing_page = store.last.landing_page
  if (store.first.referrer) out.first_referrer = store.first.referrer
  return out
}

/* ------------------------------------------------------------------ *
 * Best-effort GA identifiers
 * Neither is load-bearing. The `_ga` cookie format is stable in practice
 * but is not a documented public contract, and session_id resolves through
 * an async callback that may not have returned yet.
 * ------------------------------------------------------------------ */

export function readGaClientId(): string | undefined {
  try {
    const match = document.cookie.match(/(?:^|;\s*)_ga=GA\d\.\d\.(\d+\.\d+)/)
    return match ? match[1] : undefined
  } catch {
    return undefined
  }
}

function primeSessionId(): void {
  const tracker = window as TrackingWindow
  try {
    tracker.gtag?.('get', MEASUREMENT_ID, 'session_id', (value: unknown) => {
      if (typeof value === 'string' || typeof value === 'number') {
        cachedSessionId = String(value)
      }
    })
  } catch {
    /* gtag not ready — session_id stays absent */
  }
}

function sessionRef(): string {
  try {
    let id = window.sessionStorage.getItem(SESSION_REF_KEY)
    if (!id) {
      id = `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
      window.sessionStorage.setItem(SESSION_REF_KEY, id)
    }
    return id
  } catch {
    return 'nosession'
  }
}

function identityParams(): Record<string, string> {
  const out: Record<string, string> = { session_ref: sessionRef() }
  const clientId = readGaClientId()
  if (clientId) out.ga_client_id = clientId
  if (cachedSessionId) out.ga_session_id = cachedSessionId
  return out
}

/* ------------------------------------------------------------------ *
 * Event dispatch
 * ------------------------------------------------------------------ */

function sendEvent(name: string, params: Record<string, string>): void {
  const tracker = window as TrackingWindow
  try {
    tracker.gtag?.('event', name, {
      ...params,
      ...identityParams(),
      ...attributionParams(),
      // transport_type: 'beacon' keeps the request alive across the
      // navigation that these clicks usually trigger.
      transport_type: 'beacon',
    })
  } catch {
    /* never let a tracking failure surface to the customer */
  }
}

/** True when this (event, target) pair fired within the suppression window. */
function isDuplicateClick(name: string, href: string): boolean {
  const key = `${name}|${href}`
  const now = Date.now()
  const previous = recentClicks.get(key)
  if (previous !== undefined && now - previous < CLICK_DEDUP_MS) return true
  recentClicks.set(key, now)
  // keep the map from growing without bound on a long session
  if (recentClicks.size > 50) {
    recentClicks.forEach((t, k) => {
      if (now - t > CLICK_DEDUP_MS) recentClicks.delete(k)
    })
  }
  return false
}

export function matchOutboundEvent(href: string): string | undefined {
  const hit = OUTBOUND_EVENTS.find(([pattern]) => pattern.test(href))
  return hit ? hit[1] : undefined
}

export function handleOutboundClick(event: Event): void {
  const target = event.target as HTMLElement | null
  const link = target && target.closest ? target.closest('a') : null
  if (!link) return

  const href = link.getAttribute('href') || ''
  if (!href) return

  const name = matchOutboundEvent(href)
  if (!name) return
  if (isDuplicateClick(name, href)) return

  sendEvent(name, {
    link_url: href.slice(0, 200),
    page_path: window.location.pathname.slice(0, 200),
  })
}

/* ------------------------------------------------------------------ *
 * Lead event
 * ------------------------------------------------------------------ */

function sentLeadReferences(): string[] {
  const raw = safeRead(LEAD_DEDUP_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : []
  } catch {
    safeRemove(LEAD_DEDUP_KEY)
    return []
  }
}

function rememberLeadReference(reference: string): void {
  const list = sentLeadReferences()
  list.push(reference)
  safeWrite(LEAD_DEDUP_KEY, JSON.stringify(list.slice(-LEAD_DEDUP_LIMIT)))
}

/**
 * Fires the lead event exactly once per booking reference.
 *
 * The reference is generated by BookingModal before submission and is the
 * only durable idempotency key available in the browser. GA4 does not
 * deduplicate arbitrary events, so this guard is the deduplication.
 */
export function sendLeadEvent(payload: BookingPayload): boolean {
  const reference = payload.reference
  if (!reference) return false
  if (sentLeadReferences().indexOf(reference) !== -1) return false

  rememberLeadReference(reference)

  const service = (payload.service ?? '').replace(/\s*\(\$\d+\)\s*$/, '').trim()
  sendEvent(LEAD_EVENT_NAME, {
    booking_reference: reference,
    // event_id is reserved for future server-side deduplication. It is a
    // random-ish reference, not a customer identifier.
    event_id: `frothy-${reference}`,
    service_type: service || 'not_provided',
    lead_source: 'website_booking_form',
  })
  return true
}

/* ------------------------------------------------------------------ *
 * fetch wrapper — attaches attribution to the booking submission and
 * fires the lead event on a successful response.
 * ------------------------------------------------------------------ */

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (input instanceof Request) return input.url
  return String(input)
}

function enrichBookingRequest(init?: RequestInit): RequestInit | undefined {
  if (!init || typeof init.body !== 'string') return init
  try {
    const payload = JSON.parse(init.body) as BookingPayload
    return { ...init, body: JSON.stringify({ ...payload, ...attributionParams() }) }
  } catch {
    return init
  }
}

export function initializeConversionTracking(): void {
  if (installed || typeof window === 'undefined') return
  installed = true

  purgeExpiredAttribution()
  captureAttribution()
  primeSessionId()

  document.addEventListener('click', handleOutboundClick, { capture: true })

  const nativeFetch = window.fetch.bind(window)
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const isBooking = requestUrl(input).includes(FORMSPREE_ENDPOINT)
    const enriched = isBooking ? enrichBookingRequest(init) : init
    const response = await nativeFetch(input, enriched)

    // Return the response unchanged either way. The previous version threw
    // on a non-ok booking response, which made BookingModal's own !res.ok
    // branch unreachable.
    if (!isBooking || !response.ok) return response

    try {
      const payload =
        enriched && typeof enriched.body === 'string'
          ? (JSON.parse(enriched.body) as BookingPayload)
          : {}
      sendLeadEvent(payload)
    } catch {
      /* tracking must never break a confirmed booking */
    }
    return response
  }
}

/** Test-only reset. Not called by application code. */
export function __resetForTests(): void {
  installed = false
  cachedSessionId = null
  recentClicks.clear()
}
