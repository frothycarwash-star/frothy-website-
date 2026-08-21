/**
 * Website conversion tracking.
 *
 * Design rules this file must keep to:
 *
 *   1. No monetary value on any event. Only a completed Square payment is
 *      revenue, and that never happens in the browser. Adding `value` here
 *      would flow into Google Ads conversion value and fabricate ROAS.
 *
 *   2. Ambiguous links are never inferred from their URL. A link to
 *      google.com/maps/place/... may be "get directions" or "read our
 *      reviews", and a square.link URL may be an appointment or a
 *      membership purchase. Those links must carry an explicit
 *      data-analytics-event marker. Only tel:, mailto: and WhatsApp are
 *      matched automatically, because those protocols are unambiguous.
 *
 *   3. Two payloads, two budgets. GA4 has hard collection limits (25
 *      parameters, 40-character names, 100-character values); the Formspree
 *      submission does not. Full-fidelity click IDs live in the browser
 *      record and the Formspree submission only.
 *
 *   4. Nothing here may throw into the booking flow. Tracking failures must
 *      be silent to the customer.
 *
 * PRIVACY NOTE: this module transmits no name, phone number or email
 * address. It does attach advertising identifiers to the Formspree booking
 * submission, which already contains the customer's name and phone. Those
 * identifiers are pseudonymous, not anonymous. See docs/tracking-events.md.
 */

const CLICK_ID_KEYS = [
  'gclid', 'gbraid', 'wbraid',   // Google
  'fbclid',                       // Meta
  'msclkid',                      // Microsoft
  'ttclid',                       // TikTok
  'li_fat_id',                    // LinkedIn
  'twclid',                       // X
] as const

const UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign',
  'utm_term', 'utm_content', 'utm_id',
] as const

const ATTRIBUTION_KEYS = [...CLICK_ID_KEYS, ...UTM_KEYS] as const

const FORMSPREE_ENDPOINT = 'formspree.io/f/mdavkzej'
const MEASUREMENT_ID = 'G-TEGKNGS3QS'

const STORE_KEY = 'frothy_attribution_v2'
const LEAD_DEDUP_KEY = 'frothy_leads_sent_v1'
const SESSION_REF_KEY = 'frothy_sid'

/** GA4 standard-property collection limits. */
const GA4_MAX_PARAMS = 25
const GA4_MAX_NAME_LENGTH = 40
const GA4_MAX_VALUE_LENGTH = 100

/** The browser record and the Formspree submission tolerate longer values. */
const STORE_MAX_VALUE_LENGTH = 300

/**
 * Attribution older than this is treated as invalid and purged.
 *
 * localStorage has NO native expiry. A record does not delete itself after
 * 90 days — it sits in the browser until this code runs again and removes
 * it, which only happens when the visitor returns. What is guaranteed is
 * that an expired record is never read and never attached to anything.
 */
const TTL_MS = 90 * 24 * 60 * 60 * 1000

/** Repeat suppression window for click events, in milliseconds. */
const CLICK_DEDUP_MS = 1500

/** How many recent lead references to remember for deduplication. */
const LEAD_DEDUP_LIMIT = 50

/** Attribute carrying an explicit event name on an ambiguous link. */
export const MARKER_ATTRIBUTE = 'data-analytics-event'

/**
 * Event names a marker attribute is allowed to select. An unrecognised
 * marker fires nothing rather than passing an arbitrary string to GA4.
 */
export const ALLOWED_MARKER_EVENTS: readonly string[] = [
  'get_directions',
  'google_reviews_click',
  'booking_start_square',
  'membership_checkout_start',
  'contact_call_click',
  'contact_email_click',
  'contact_whatsapp',
]

/**
 * Unambiguous protocols only. Note there is deliberately no Maps or Square
 * pattern here: those URLs cannot be classified without knowing intent.
 */
const PROTOCOL_EVENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/^tel:/i, 'contact_call_click'],
  [/^mailto:/i, 'contact_email_click'],
  [/^(https?:)?\/\/(wa\.me|(api|web)\.whatsapp\.com)/i, 'contact_whatsapp'],
]

/**
 * The GA4 event name for a submitted booking request.
 *
 * Deliberately still `qualify_lead`. Production GA4 and Google Ads both key
 * off this name today; renaming it to `generate_lead` in isolation would
 * silently stop recording lead conversions. See docs/tracking-events.md.
 */
export const LEAD_EVENT_NAME = 'qualify_lead'

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]
type Attribution = Partial<Record<AttributionKey, string>>
type Touch = Attribution & {
  ts: number
  landing_page: string
  /** Hostname only. The full referrer URL is never stored or sent. */
  referrer_host?: string
}
type Store = { first: Touch; last: Touch }
type BookingPayload = { reference?: string; service?: string }
type Params = Record<string, string>

/** Minimal shape of an anchor, so the resolver is testable without a DOM. */
export interface LinkLike {
  getAttribute(name: string): string | null
}

type TrackingWindow = Window & { gtag?: (...args: unknown[]) => void }

let installed = false
let cachedSessionId: string | null = null
const recentClicks = new Map<string, number>()

/* ------------------------------------------------------------------ *
 * Storage helpers. Private browsing, disabled storage and quota errors
 * must all degrade to "no attribution" rather than throwing.
 * ------------------------------------------------------------------ */

function safeRead(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Returns false when the write did not happen. */
function safeWrite(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* nothing to do */
  }
}

function isExpired(store: Store): boolean {
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
    safeRemove(STORE_KEY)
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
 * Referrer — hostname only.
 * A full referrer URL can carry query strings and paths that leak search
 * terms or session identifiers, so only the host is ever retained.
 * ------------------------------------------------------------------ */

export function referrerHost(rawReferrer: string): string | undefined {
  if (!rawReferrer) return undefined
  try {
    const host = new URL(rawReferrer).hostname
    return host && host.length <= GA4_MAX_VALUE_LENGTH ? host : undefined
  } catch {
    return undefined // unparseable: omit rather than guess
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
    if (value) found[key] = value.slice(0, STORE_MAX_VALUE_LENGTH)
  })
  if (Object.keys(found).length === 0) return

  const prior = readStore()
  const touch: Touch = {
    ...found,
    ts: Date.now(),
    landing_page: window.location.pathname.slice(0, STORE_MAX_VALUE_LENGTH),
  }
  const host = referrerHost(document.referrer || '')
  if (host) touch.referrer_host = host

  const next: Store = {
    first: prior ? prior.first : touch, // written once, never overwritten
    last: touch,
  }
  safeWrite(STORE_KEY, JSON.stringify(next))
}

/* ------------------------------------------------------------------ *
 * Payload builders — GA4 and Formspree have different budgets.
 * ------------------------------------------------------------------ */

/**
 * Trims a parameter map to GA4's documented limits: at most 25 entries,
 * names of at most 40 characters, values of at most 100 characters.
 * Entries are kept in insertion order, so callers list them by priority.
 */
export function applyGa4Limits(candidates: Params): Params {
  const out: Params = {}
  for (const key of Object.keys(candidates)) {
    if (Object.keys(out).length >= GA4_MAX_PARAMS) break
    if (!key || key.length > GA4_MAX_NAME_LENGTH) continue
    const value = candidates[key]
    if (value === undefined || value === null || value === '') continue
    out[key] = String(value).slice(0, GA4_MAX_VALUE_LENGTH)
  }
  return out
}

/**
 * Compact GA4 payload. Click identifiers are included only when they fit
 * inside GA4's 100-character value limit; a truncated click ID is useless
 * for matching, so an oversized one is omitted and recorded by name in
 * `click_id_types` instead. The complete value stays in the browser record
 * and the Formspree submission.
 */
export function buildGa4Params(base: Params): Params {
  const store = readStore()
  const candidates: Params = { ...base }

  if (store) {
    UTM_KEYS.forEach((key) => {
      const value = store.last[key]
      if (value) candidates[key] = value
    })

    const presentClickIds = CLICK_ID_KEYS.filter((key) => Boolean(store.last[key]))
    if (presentClickIds.length > 0) {
      candidates.click_id_types = presentClickIds.join(',')
      presentClickIds.forEach((key) => {
        const value = store.last[key] as string
        // Only send identifiers that survive intact.
        if (value.length <= GA4_MAX_VALUE_LENGTH) candidates[key] = value
      })
    }

    // A small, fixed first-touch summary — not every first-touch field.
    if (store.first.utm_source) candidates.first_utm_source = store.first.utm_source
    if (store.first.utm_medium) candidates.first_utm_medium = store.first.utm_medium
    if (store.first.utm_campaign) candidates.first_utm_campaign = store.first.utm_campaign
    if (store.first.landing_page) candidates.first_landing_page = store.first.landing_page
  }

  return applyGa4Limits(candidates)
}

/**
 * Full-fidelity attribution for the Formspree submission, which has no
 * parameter or length limits. This is the record that makes later lead
 * matching possible.
 *
 * These fields are added to a submission that ALREADY contains the
 * customer's name and phone number.
 */
export function buildFormspreeAttribution(): Params {
  const store = readStore()
  if (!store) return {}

  const out: Params = {}
  ATTRIBUTION_KEYS.forEach((key) => {
    const last = store.last[key]
    const first = store.first[key]
    if (last) out[key] = last
    if (first) out[`first_${key}`] = first
  })
  if (store.first.landing_page) out.first_landing_page = store.first.landing_page
  if (store.last.landing_page) out.last_landing_page = store.last.landing_page
  if (store.first.referrer_host) out.first_referrer_host = store.first.referrer_host
  out.first_touch_at = new Date(store.first.ts).toISOString()
  out.last_touch_at = new Date(store.last.ts).toISOString()
  return out
}

/* ------------------------------------------------------------------ *
 * Best-effort GA identifiers. Neither is load-bearing.
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

/* ------------------------------------------------------------------ *
 * Event dispatch
 * ------------------------------------------------------------------ */

/**
 * Sends an event. Returns true ONLY if gtag existed and accepted the call.
 * Callers use the return value to decide whether to record the event as
 * sent — recording a send that never happened would silently drop it.
 */
export function sendEvent(name: string, params: Params): boolean {
  const tracker = window as TrackingWindow
  if (typeof tracker.gtag !== 'function') return false

  const base: Params = { ...params, session_ref: sessionRef() }
  const clientId = readGaClientId()
  if (clientId) base.ga_client_id = clientId
  if (cachedSessionId) base.ga_session_id = cachedSessionId
  base.transport_type = 'beacon'

  try {
    tracker.gtag('event', name, buildGa4Params(base))
    return true
  } catch {
    return false // blocked or throwing tag — allow a retry later
  }
}

/** True when this (event, target) pair fired within the suppression window. */
function isDuplicateClick(name: string, href: string): boolean {
  const key = `${name}|${href}`
  const now = Date.now()
  const previous = recentClicks.get(key)
  if (previous !== undefined && now - previous < CLICK_DEDUP_MS) return true
  recentClicks.set(key, now)
  if (recentClicks.size > 50) {
    recentClicks.forEach((t, k) => {
      if (now - t > CLICK_DEDUP_MS) recentClicks.delete(k)
    })
  }
  return false
}

/** Protocol-only inference. Never matches a Maps or Square URL. */
export function matchProtocolEvent(href: string): string | undefined {
  const hit = PROTOCOL_EVENTS.find(([pattern]) => pattern.test(href))
  return hit ? hit[1] : undefined
}

/**
 * Resolves the event for a link: an explicit marker wins, otherwise an
 * unambiguous protocol, otherwise nothing.
 */
export function resolveEventName(link: LinkLike): string | undefined {
  const marker = link.getAttribute(MARKER_ATTRIBUTE)
  if (marker) {
    return ALLOWED_MARKER_EVENTS.indexOf(marker) !== -1 ? marker : undefined
  }
  return matchProtocolEvent(link.getAttribute('href') || '')
}

export function handleOutboundClick(event: Event): void {
  const target = event.target as HTMLElement | null
  const link = target && target.closest ? target.closest('a') : null
  if (!link) return

  const href = link.getAttribute('href') || ''
  const name = resolveEventName(link)
  if (!name) return
  if (isDuplicateClick(name, href)) return

  sendEvent(name, {
    link_url: href,
    page_path: window.location.pathname,
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
 * Fires the lead event at most once per booking reference.
 *
 * The reference is only recorded AFTER gtag accepts the call, so a blocked
 * or not-yet-loaded tag leaves the reference free to retry.
 *
 * Deduplication is best-effort: it depends on localStorage, so it does not
 * hold across devices, cleared browsing data, or storage that is blocked
 * or unavailable.
 */
export function sendLeadEvent(payload: BookingPayload): boolean {
  const reference = payload.reference
  if (!reference) return false
  if (sentLeadReferences().indexOf(reference) !== -1) return false

  const service = (payload.service ?? '').replace(/\s*\(\$\d+\)\s*$/, '').trim()
  const sent = sendEvent(LEAD_EVENT_NAME, {
    booking_reference: reference,
    event_id: `frothy-${reference}`,
    service_type: service || 'not_provided',
    lead_source: 'website_booking_form',
  })

  if (!sent) return false
  rememberLeadReference(reference)
  return true
}

/* ------------------------------------------------------------------ *
 * fetch wrapper
 * ------------------------------------------------------------------ */

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (typeof Request !== 'undefined' && input instanceof Request) return input.url
  return String(input)
}

export function enrichBookingRequest(init?: RequestInit): RequestInit | undefined {
  if (!init || typeof init.body !== 'string') return init
  try {
    const payload = JSON.parse(init.body) as Record<string, unknown>
    return { ...init, body: JSON.stringify({ ...payload, ...buildFormspreeAttribution() }) }
  } catch {
    return init // non-JSON body: pass through untouched
  }
}

export function installFetchWrapper(): void {
  const nativeFetch = window.fetch.bind(window)
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let isBooking = false
    let enriched = init
    try {
      isBooking = requestUrl(input).includes(FORMSPREE_ENDPOINT)
      if (isBooking) enriched = enrichBookingRequest(init)
    } catch {
      isBooking = false
      enriched = init
    }

    const response = await nativeFetch(input, enriched)

    // The response is returned unchanged in every case. Whether the customer
    // sees success or failure is decided by BookingModal from this response,
    // never by anything in this module.
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

export function initializeConversionTracking(): void {
  if (installed || typeof window === 'undefined') return
  installed = true

  purgeExpiredAttribution()
  captureAttribution()
  primeSessionId()

  document.addEventListener('click', handleOutboundClick, { capture: true })
  installFetchWrapper()
}

/** Test-only reset. Not called by application code. */
export function __resetForTests(): void {
  installed = false
  cachedSessionId = null
  recentClicks.clear()
}
