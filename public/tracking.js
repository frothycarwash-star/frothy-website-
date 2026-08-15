/*
 * Paid-booking attribution
 *
 * Captures Google click identifiers when a visitor arrives, attaches them to
 * the existing Formspree booking submission, and records a GA4 lead only
 * after Formspree accepts the booking. No contact details are sent to GA4.
 */
;(function () {
  const BOOKING_ENDPOINT = 'https://formspree.io/f/mdavkzej'
  const STORAGE_PREFIX = 'frothy_attribution_'
  const CLICK_IDS = ['gclid', 'gbraid', 'wbraid']

  function storeClickIds() {
    const params = new URLSearchParams(window.location.search)
    CLICK_IDS.forEach((key) => {
      const value = params.get(key)
      if (value) window.sessionStorage.setItem(STORAGE_PREFIX + key, value)
    })
  }

  function savedClickIds() {
    return CLICK_IDS.reduce((result, key) => {
      const value = window.sessionStorage.getItem(STORAGE_PREFIX + key)
      if (value) result[key] = value
      return result
    }, {})
  }

  function trackConfirmedBooking(payload) {
    const eventParams = {
      booking_channel: 'website',
      service_type: String(payload.service || 'unspecified').slice(0, 100),
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', eventParams)
      return
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(['event', 'generate_lead', eventParams])
  }

  function isBookingRequest(input) {
    const url = typeof input === 'string' ? input : input && input.url
    return typeof url === 'string' && url.indexOf(BOOKING_ENDPOINT) === 0
  }

  storeClickIds()

  const nativeFetch = window.fetch.bind(window)
  window.fetch = async function (input, init) {
    if (!isBookingRequest(input) || !init || typeof init.body !== 'string') {
      return nativeFetch(input, init)
    }

    let payload
    try {
      payload = JSON.parse(init.body)
    } catch {
      return nativeFetch(input, init)
    }

    const response = await nativeFetch(input, {
      ...init,
      body: JSON.stringify({
        ...payload,
        ...savedClickIds(),
        lead_source: payload.lead_source || 'website_booking',
      }),
    })

    if (response.ok) trackConfirmedBooking(payload)
    return response
  }
})()
