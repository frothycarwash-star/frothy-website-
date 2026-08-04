const ATTRIBUTION_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

const FORMSPREE_ENDPOINT = 'formspree.io/f/mdavkzej'
let installed = false

type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>
type BookingPayload = Attribution & { reference?: string; service?: string }
type TrackingWindow = Window & { gtag?: (...args: unknown[]) => void }

function captureAttribution(): void {
  const params = new URLSearchParams(window.location.search)
  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) window.sessionStorage.setItem(`frothy_${key}`, value)
  })
}

function storedAttribution(): Attribution {
  return ATTRIBUTION_KEYS.reduce<Attribution>((values, key) => {
    const value = window.sessionStorage.getItem(`frothy_${key}`)
    if (value) values[key] = value
    return values
  }, {})
}

function sendQualifiedBooking(payload: BookingPayload): void {
  const reference = payload.reference ?? `booking-${Date.now()}`
  const tracker = window as TrackingWindow

  tracker.gtag?.('event', 'qualify_lead', {
    event_id: `frothy-${reference}`,
    booking_reference: reference,
    service_type: payload.service ?? 'not_provided',
    lead_source: 'website_booking_request',
    ...storedAttribution(),
  })
}

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (input instanceof Request) return input.url
  return input.toString()
}

function enrichBookingRequest(init?: RequestInit): RequestInit | undefined {
  if (!init || typeof init.body !== 'string') return init

  try {
    const payload = JSON.parse(init.body) as BookingPayload
    return { ...init, body: JSON.stringify({ ...payload, ...storedAttribution() }) }
  } catch {
    return init
  }
}

export function initializeConversionTracking(): void {
  if (installed || typeof window === 'undefined') return
  installed = true
  captureAttribution()

  const nativeFetch = window.fetch.bind(window)
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const isBookingRequest = requestUrl(input).includes(FORMSPREE_ENDPOINT)
    const enrichedInit = isBookingRequest ? enrichBookingRequest(init) : init
    const response = await nativeFetch(input, enrichedInit)

    if (!isBookingRequest) return response
    if (!response.ok) throw new Error('Booking request was not accepted.')

    const payload = enrichedInit && typeof enrichedInit.body === 'string'
      ? JSON.parse(enrichedInit.body) as BookingPayload
      : {}
    sendQualifiedBooking(payload)
    return response
  }
}
