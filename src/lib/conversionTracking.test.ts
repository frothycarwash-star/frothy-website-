/**
 * Tests for the website tracking module.
 *
 * Runs on Node's built-in test runner with no third-party test framework,
 * so the project gains no new dependencies and package-lock.json is
 * unchanged. Real-browser behaviour (delegated listeners, actual anchor
 * elements) is covered separately by the Playwright QA pass documented in
 * docs/tracking-events.md.
 */
import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

/* ------------------------------------------------------------------ *
 * Minimal browser harness. Installed before importing the module.
 * ------------------------------------------------------------------ */

class FakeStorage {
  private map = new Map<string, string>()
  failRead = false
  failWrite = false

  getItem(key: string): string | null {
    if (this.failRead) throw new Error('SecurityError')
    return this.map.has(key) ? (this.map.get(key) as string) : null
  }
  setItem(key: string, value: string): void {
    if (this.failWrite) throw new Error('QuotaExceededError')
    this.map.set(key, value)
  }
  removeItem(key: string): void {
    if (this.failWrite) throw new Error('SecurityError')
    this.map.delete(key)
  }
  clear(): void {
    this.map.clear()
    this.failRead = false
    this.failWrite = false
  }
}

type GtagCall = [string, string, Record<string, string>]

const localStorageFake = new FakeStorage()
const sessionStorageFake = new FakeStorage()
let gtagCalls: GtagCall[] = []

const win: Record<string, unknown> = {
  localStorage: localStorageFake,
  sessionStorage: sessionStorageFake,
  location: new URL('https://frothycarwash.com/hand-car-wash-hollywood-fl'),
  fetch: async () => new Response('{}', { status: 200 }),
}
const doc: Record<string, unknown> = {
  cookie: '',
  referrer: '',
  addEventListener: () => {},
}
;(globalThis as Record<string, unknown>).window = win
;(globalThis as Record<string, unknown>).document = doc

const {
  ALLOWED_MARKER_EVENTS,
  LEAD_EVENT_NAME,
  MARKER_ATTRIBUTE,
  __resetForTests,
  applyGa4Limits,
  buildFormspreeAttribution,
  buildGa4Params,
  captureAttribution,
  enrichBookingRequest,
  handleOutboundClick,
  installFetchWrapper,
  matchProtocolEvent,
  purgeExpiredAttribution,
  readStore,
  referrerHost,
  resolveEventName,
  sendLeadEvent,
} = await import('./conversionTracking.js')

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const DAY = 24 * 60 * 60 * 1000

function setGtag(impl?: (...args: unknown[]) => void): void {
  if (impl === undefined) {
    delete win.gtag
    return
  }
  win.gtag = impl
}

function workingGtag(): void {
  setGtag((...args: unknown[]) => {
    gtagCalls.push(args as unknown as GtagCall)
  })
}

function events(name?: string): GtagCall[] {
  return gtagCalls.filter((c) => c[0] === 'event' && (name === undefined || c[1] === name))
}

function lastParams(name: string): Record<string, string> {
  const list = events(name)
  return list.length ? list[list.length - 1][2] : {}
}

function setUrl(search: string): void {
  win.location = new URL(`https://frothycarwash.com/hand-car-wash-hollywood-fl${search}`)
}

/** A stand-in for an anchor element. */
function link(href: string, marker?: string) {
  return {
    getAttribute(name: string): string | null {
      if (name === 'href') return href
      if (name === MARKER_ATTRIBUTE) return marker ?? null
      return null
    },
  }
}

/** A stand-in for a click event whose target resolves to `el`. */
function clickEvent(el: ReturnType<typeof link> | null): Event {
  return { target: { closest: () => el } } as unknown as Event
}

function clickLink(href: string, marker?: string): void {
  handleOutboundClick(clickEvent(link(href, marker)))
}

function writeStore(ageMs: number, extra: Record<string, unknown> = {}): void {
  const ts = Date.now() - ageMs
  localStorageFake.setItem(
    'frothy_attribution_v2',
    JSON.stringify({
      first: { gclid: 'FIRSTCLICK', ts, landing_page: '/', ...extra },
      last: { gclid: 'LASTCLICK', ts, landing_page: '/', ...extra },
    })
  )
}

beforeEach(() => {
  localStorageFake.clear()
  sessionStorageFake.clear()
  gtagCalls = []
  doc.cookie = ''
  doc.referrer = ''
  setUrl('')
  __resetForTests()
  workingGtag()
})

/* ================================================================== *
 * Ambiguous links must be marked explicitly
 * ================================================================== */

describe('review clicks are never directions', () => {
  const reviewLinks = [
    'https://www.google.com/maps/place/Frothy+Carwash+Lounge',
    'https://www.google.com/maps/search/Frothy+Carwash+Lounge+2223+Pembroke+Road',
    'https://g.page/r/CR3lzL_ii6qJEBM/review',
    'https://search.google.com/local/reviews?placeid=ChIJabc',
  ]

  for (const href of reviewLinks) {
    test(`${href} never fires get_directions`, () => {
      clickLink(href, 'google_reviews_click')
      assert.equal(events('get_directions').length, 0)
      assert.equal(events('google_reviews_click').length, 1)
    })

    test(`${href} fires nothing at all when unmarked`, () => {
      clickLink(href)
      assert.equal(events().length, 0, 'an unmarked Maps URL must not be guessed')
    })
  }
})

describe('directions links', () => {
  test('a marked directions link fires exactly one get_directions', () => {
    clickLink('https://maps.google.com/?q=2223+Pembroke+Rd+Hollywood+FL+33020', 'get_directions')
    assert.equal(events('get_directions').length, 1)
    assert.equal(events('google_reviews_click').length, 0)
  })

  test('repeated clicks on the same directions link are suppressed', () => {
    const href = 'https://maps.google.com/?q=2223+Pembroke+Rd'
    clickLink(href, 'get_directions')
    clickLink(href, 'get_directions')
    clickLink(href, 'get_directions')
    assert.equal(events('get_directions').length, 1)
  })
})

describe('Square links: appointments and memberships are distinct', () => {
  test('the appointment link fires booking_start_square', () => {
    clickLink(
      'https://square.site/book/L52E1Y2E4PK6M/frothy-carwash-lounge-hollywood-fl',
      'booking_start_square'
    )
    assert.equal(events('booking_start_square').length, 1)
    assert.equal(events('membership_checkout_start').length, 0)
  })

  test('a membership payment link fires membership_checkout_start', () => {
    clickLink('https://square.link/u/TfrwVKKt', 'membership_checkout_start')
    assert.equal(events('membership_checkout_start').length, 1)
  })

  test('no membership checkout is ever labelled a booking', () => {
    for (const href of [
      'https://square.link/u/18XnOa8I',
      'https://square.link/u/ojjyVr7P',
      'https://square.link/u/TfrwVKKt',
      'https://square.link/u/HCgmJglV',
      'https://square.link/u/a3JZmF41',
      'https://square.link/u/uYVlji14',
    ]) {
      clickLink(href, 'membership_checkout_start')
    }
    assert.equal(events('membership_checkout_start').length, 6)
    assert.equal(events('booking_start_square').length, 0)
  })

  test('an unmarked Square URL is not guessed', () => {
    clickLink('https://square.link/u/TfrwVKKt')
    assert.equal(events().length, 0)
  })
})

describe('protocol links stay automatic', () => {
  test('tel, mailto and WhatsApp resolve without a marker', () => {
    assert.equal(matchProtocolEvent('tel:9545103073'), 'contact_call_click')
    assert.equal(matchProtocolEvent('mailto:info@frothycarwash.com'), 'contact_email_click')
    assert.equal(matchProtocolEvent('https://wa.me/19545103073'), 'contact_whatsapp')
    assert.equal(matchProtocolEvent('https://web.whatsapp.com/send'), 'contact_whatsapp')
  })

  test('no Maps or Square URL matches by protocol inference', () => {
    assert.equal(matchProtocolEvent('https://maps.google.com/?q=x'), undefined)
    assert.equal(matchProtocolEvent('https://www.google.com/maps/place/Frothy'), undefined)
    assert.equal(matchProtocolEvent('https://square.site/book/x'), undefined)
    assert.equal(matchProtocolEvent('https://square.link/u/x'), undefined)
  })

  test('an unrecognised marker fires nothing', () => {
    assert.equal(resolveEventName(link('tel:123', 'purchase')), undefined)
    assert.equal(resolveEventName(link('tel:123', 'buy_now')), undefined)
  })

  test('every allowed marker resolves to itself', () => {
    for (const name of ALLOWED_MARKER_EVENTS) {
      assert.equal(resolveEventName(link('https://example.com', name)), name)
    }
  })

  test('a click that is not on a link fires nothing', () => {
    handleOutboundClick(clickEvent(null))
    assert.equal(events().length, 0)
  })
})

describe('no event carries money', () => {
  test('no value or currency on any event type', () => {
    clickLink('tel:9545103073')
    clickLink('mailto:info@frothycarwash.com')
    clickLink('https://wa.me/19545103073')
    clickLink('https://maps.google.com/?q=x', 'get_directions')
    clickLink('https://www.google.com/maps/place/F', 'google_reviews_click')
    clickLink('https://square.site/book/x', 'booking_start_square')
    clickLink('https://square.link/u/x', 'membership_checkout_start')
    sendLeadEvent({ reference: 'FR-MONEY', service: 'Full Detail Package ($199)' })

    assert.equal(events().length, 8)
    for (const call of events()) {
      assert.ok(!('value' in call[2]), `${call[1]} must not carry value`)
      assert.ok(!('currency' in call[2]), `${call[1]} must not carry currency`)
    }
  })
})

/* ================================================================== *
 * Referrer sanitisation
 * ================================================================== */

describe('referrer is reduced to a hostname', () => {
  test('a referrer with a query string yields only the host', () => {
    assert.equal(
      referrerHost('https://www.google.com/search?q=car+wash+near+me&oq=secret'),
      'www.google.com'
    )
  })

  test('unparseable referrers are omitted', () => {
    assert.equal(referrerHost(''), undefined)
    assert.equal(referrerHost('not a url'), undefined)
    assert.equal(referrerHost('   '), undefined)
  })

  test('the query and path never reach storage, GA4 or Formspree', () => {
    doc.referrer = 'https://www.google.com/search?q=super+secret+query&session=abc123'
    setUrl('?gclid=REF1')
    captureAttribution()

    const stored = localStorageFake.getItem('frothy_attribution_v2') as string
    assert.ok(!stored.includes('super+secret+query'), 'query must not be stored')
    assert.ok(!stored.includes('session=abc123'), 'query must not be stored')
    assert.ok(!stored.includes('/search'), 'path must not be stored')
    assert.ok(stored.includes('www.google.com'), 'host is retained')

    clickLink('tel:9545103073')
    const ga4 = JSON.stringify(lastParams('contact_call_click'))
    assert.ok(!ga4.includes('super+secret+query'))
    assert.ok(!ga4.includes('/search'))

    const formspree = JSON.stringify(buildFormspreeAttribution())
    assert.ok(!formspree.includes('super+secret+query'))
    assert.ok(!formspree.includes('/search'))
    assert.equal(buildFormspreeAttribution().first_referrer_host, 'www.google.com')
  })
})

/* ================================================================== *
 * GA4 collection limits
 * ================================================================== */

describe('GA4 collection limits are enforced', () => {
  test('applyGa4Limits caps at 25 parameters', () => {
    const many: Record<string, string> = {}
    for (let i = 0; i < 60; i++) many[`p${i}`] = 'v'
    assert.equal(Object.keys(applyGa4Limits(many)).length, 25)
  })

  test('applyGa4Limits truncates values to 100 characters', () => {
    const out = applyGa4Limits({ long: 'x'.repeat(500) })
    assert.equal(out.long.length, 100)
  })

  test('applyGa4Limits drops names longer than 40 characters', () => {
    const out = applyGa4Limits({ ['n'.repeat(41)]: 'v', ok: 'v' })
    assert.deepEqual(Object.keys(out), ['ok'])
  })

  test('a fully populated attribution still produces a legal event', () => {
    setUrl(
      '?gclid=' + 'g'.repeat(80) +
        '&gbraid=GB&wbraid=WB&fbclid=' + 'f'.repeat(250) +
        '&msclkid=MS&ttclid=TT&li_fat_id=LI&twclid=TW' +
        '&utm_source=google&utm_medium=cpc&utm_campaign=camp' +
        '&utm_term=term&utm_content=content&utm_id=id1'
    )
    captureAttribution()
    clickLink('https://maps.google.com/?q=' + 'y'.repeat(400), 'get_directions')

    const params = lastParams('get_directions')
    assert.ok(Object.keys(params).length <= 25, `got ${Object.keys(params).length} params`)
    for (const [key, value] of Object.entries(params)) {
      assert.ok(key.length <= 40, `param name too long: ${key}`)
      assert.ok(value.length <= 100, `param value too long: ${key} (${value.length})`)
    }
  })

  test('a long URL is truncated rather than dropped', () => {
    clickLink('tel:' + '9'.repeat(400))
    assert.equal(lastParams('contact_call_click').link_url.length, 100)
  })

  test('an oversized click ID is omitted from GA4 but named in click_id_types', () => {
    setUrl('?gclid=' + 'g'.repeat(80) + '&fbclid=' + 'f'.repeat(250))
    captureAttribution()
    clickLink('tel:9545103073')

    const params = lastParams('contact_call_click')
    assert.equal(params.gclid, 'g'.repeat(80), 'a short gclid is sent intact')
    assert.ok(!('fbclid' in params), 'an oversized fbclid must not be sent truncated')
    assert.equal(params.click_id_types, 'gclid,fbclid')
  })

  test('the full oversized click ID survives in the Formspree payload', () => {
    setUrl('?gclid=G1&fbclid=' + 'f'.repeat(250))
    captureAttribution()
    const attribution = buildFormspreeAttribution()
    assert.equal(attribution.gclid, 'G1')
    assert.equal(attribution.fbclid.length, 250)
    assert.equal(attribution.first_fbclid.length, 250)
  })

  test('not every first-touch field is sent to GA4', () => {
    setUrl('?utm_source=s1&utm_term=t1&utm_content=c1&gclid=G1')
    captureAttribution()
    setUrl('?utm_source=s2&utm_term=t2&utm_content=c2&gclid=G2')
    captureAttribution()

    clickLink('tel:9545103073')
    const params = lastParams('contact_call_click')
    assert.equal(params.first_utm_source, 's1')
    assert.ok(!('first_utm_term' in params), 'first_utm_term is not worth a GA4 slot')
    assert.ok(!('first_utm_content' in params))
    assert.ok(!('first_gclid' in params))

    // ...but Formspree keeps the complete picture.
    const attribution = buildFormspreeAttribution()
    assert.equal(attribution.first_utm_term, 't1')
    assert.equal(attribution.first_gclid, 'G1')
    assert.equal(attribution.gclid, 'G2')
  })
})

/* ================================================================== *
 * Attribution capture and retention
 * ================================================================== */

describe('attribution capture', () => {
  test('captures all eight click IDs and six UTMs', () => {
    setUrl(
      '?gclid=G1&gbraid=GB1&wbraid=WB1&fbclid=FB1&msclkid=MS1&ttclid=TT1' +
        '&li_fat_id=LI1&twclid=TW1&utm_source=google&utm_medium=cpc' +
        '&utm_campaign=camp&utm_term=term&utm_content=content&utm_id=id1'
    )
    captureAttribution()
    const a = buildFormspreeAttribution()
    for (const [key, expected] of Object.entries({
      gclid: 'G1', gbraid: 'GB1', wbraid: 'WB1', fbclid: 'FB1', msclkid: 'MS1',
      ttclid: 'TT1', li_fat_id: 'LI1', twclid: 'TW1', utm_source: 'google',
      utm_medium: 'cpc', utm_campaign: 'camp', utm_term: 'term',
      utm_content: 'content', utm_id: 'id1',
    })) {
      assert.equal(a[key], expected, key)
    }
  })

  test('first touch is immutable, last touch advances', () => {
    setUrl('?utm_source=first_source')
    captureAttribution()
    setUrl('?utm_source=second_source')
    captureAttribution()
    const a = buildFormspreeAttribution()
    assert.equal(a.first_utm_source, 'first_source')
    assert.equal(a.utm_source, 'second_source')
  })

  test('an untagged URL writes nothing', () => {
    setUrl('?foo=bar')
    captureAttribution()
    assert.equal(localStorageFake.getItem('frothy_attribution_v2'), null)
  })
})

describe('90-day validity window', () => {
  test('a record inside the window is used', () => {
    writeStore(89 * DAY)
    assert.notEqual(readStore(), null)
    assert.equal(buildFormspreeAttribution().gclid, 'LASTCLICK')
  })

  test('an expired record is ignored', () => {
    writeStore(91 * DAY)
    assert.equal(readStore(), null)
    assert.deepEqual(buildFormspreeAttribution(), {})
  })

  test('an expired record is deleted on initialization', () => {
    writeStore(120 * DAY)
    assert.notEqual(localStorageFake.getItem('frothy_attribution_v2'), null)
    purgeExpiredAttribution()
    assert.equal(localStorageFake.getItem('frothy_attribution_v2'), null)
  })

  test('expired attribution never reaches an event', () => {
    writeStore(200 * DAY)
    clickLink('tel:9545103073')
    const params = lastParams('contact_call_click')
    assert.ok(!('gclid' in params))
    assert.ok(!('click_id_types' in params))
  })

  test('a fresh record survives a purge', () => {
    writeStore(10 * DAY)
    purgeExpiredAttribution()
    assert.notEqual(localStorageFake.getItem('frothy_attribution_v2'), null)
  })
})

describe('malformed and unavailable storage', () => {
  test('unparseable JSON is discarded', () => {
    localStorageFake.setItem('frothy_attribution_v2', 'not-json-at-all')
    assert.equal(readStore(), null)
    assert.equal(localStorageFake.getItem('frothy_attribution_v2'), null)
  })

  test('a record with the wrong shape is discarded', () => {
    localStorageFake.setItem('frothy_attribution_v2', JSON.stringify({ first: 'x', last: 42 }))
    assert.equal(readStore(), null)
  })

  test('a non-numeric timestamp is discarded', () => {
    localStorageFake.setItem(
      'frothy_attribution_v2',
      JSON.stringify({ first: { ts: 'yesterday' }, last: { ts: 'yesterday' } })
    )
    assert.equal(readStore(), null)
  })

  test('reads that throw degrade to no attribution', () => {
    localStorageFake.failRead = true
    assert.doesNotThrow(() => readStore())
    assert.equal(readStore(), null)
    assert.deepEqual(buildFormspreeAttribution(), {})
  })

  test('writes that throw (private mode) do not break capture', () => {
    localStorageFake.failWrite = true
    setUrl('?gclid=PRIVATE')
    assert.doesNotThrow(() => captureAttribution())
  })

  test('events still fire with storage entirely unavailable', () => {
    localStorageFake.failRead = true
    localStorageFake.failWrite = true
    assert.doesNotThrow(() => clickLink('tel:9545103073'))
    assert.equal(events('contact_call_click').length, 1)
  })

  test('sessionStorage failure yields a fallback session_ref', () => {
    sessionStorageFake.failRead = true
    sessionStorageFake.failWrite = true
    clickLink('tel:9545103073')
    assert.equal(lastParams('contact_call_click').session_ref, 'nosession')
  })
})

/* ================================================================== *
 * Lead deduplication — only remember what was actually sent
 * ================================================================== */

describe('lead deduplication', () => {
  test('a repeated reference fires only once', () => {
    assert.equal(sendLeadEvent({ reference: 'FR-DEDUP' }), true)
    assert.equal(sendLeadEvent({ reference: 'FR-DEDUP' }), false)
    assert.equal(sendLeadEvent({ reference: 'FR-DEDUP' }), false)
    assert.equal(events(LEAD_EVENT_NAME).length, 1)
  })

  test('different references each fire', () => {
    sendLeadEvent({ reference: 'FR-A' })
    sendLeadEvent({ reference: 'FR-B' })
    assert.equal(events(LEAD_EVENT_NAME).length, 2)
  })

  test('no reference means no event', () => {
    assert.equal(sendLeadEvent({}), false)
    assert.equal(events().length, 0)
  })

  test('gtag absent: returns false and does NOT remember the reference', () => {
    setGtag(undefined)
    assert.equal(sendLeadEvent({ reference: 'FR-RETRY' }), false)
    assert.equal(localStorageFake.getItem('frothy_leads_sent_v1'), null)
  })

  test('gtag throws: returns false and does NOT remember the reference', () => {
    setGtag(() => {
      throw new Error('tag blocked by extension')
    })
    assert.equal(sendLeadEvent({ reference: 'FR-THROW' }), false)
    assert.equal(localStorageFake.getItem('frothy_leads_sent_v1'), null)
  })

  test('a retry succeeds once tracking becomes available', () => {
    setGtag(undefined)
    assert.equal(sendLeadEvent({ reference: 'FR-LATE' }), false)

    workingGtag()
    assert.equal(sendLeadEvent({ reference: 'FR-LATE' }), true, 'the retry must be allowed')
    assert.equal(events(LEAD_EVENT_NAME).length, 1)

    assert.equal(sendLeadEvent({ reference: 'FR-LATE' }), false, 'and then deduplicated')
    assert.equal(events(LEAD_EVENT_NAME).length, 1)
  })

  test('a failed storage write still sends, but dedup becomes best-effort', () => {
    localStorageFake.failWrite = true
    assert.equal(sendLeadEvent({ reference: 'FR-NOSTORE' }), true)
    assert.equal(events(LEAD_EVENT_NAME).length, 1)
    // Documented limitation: without storage the second submission fires again.
    assert.equal(sendLeadEvent({ reference: 'FR-NOSTORE' }), true)
    assert.equal(events(LEAD_EVENT_NAME).length, 2)
  })

  test('a corrupted dedup list does not block the event', () => {
    localStorageFake.setItem('frothy_leads_sent_v1', '{{{not json')
    assert.equal(sendLeadEvent({ reference: 'FR-CORRUPT' }), true)
    assert.equal(events(LEAD_EVENT_NAME).length, 1)
  })

  test('the service label is cleaned but no price is retained', () => {
    sendLeadEvent({ reference: 'FR-SVC', service: 'Full Detail Package ($199)' })
    const params = lastParams(LEAD_EVENT_NAME)
    assert.equal(params.service_type, 'Full Detail Package')
    assert.ok(!JSON.stringify(params).includes('199'))
  })
})

/* ================================================================== *
 * fetch wrapper
 * ================================================================== */

describe('Formspree fetch interception', () => {
  const FORMSPREE = 'https://formspree.io/f/mdavkzej'

  function installWith(handler: (input: unknown, init?: RequestInit) => Promise<Response>) {
    win.fetch = handler
    installFetchWrapper()
  }

  test('a 2xx response enriches the request and fires one lead event', async () => {
    setUrl('?gclid=WRAPPED&utm_source=google')
    captureAttribution()

    let seenBody = ''
    installWith(async (_input, init) => {
      seenBody = String(init?.body ?? '')
      return new Response('{}', { status: 200 })
    })

    const res = await (win.fetch as typeof fetch)(FORMSPREE, {
      method: 'POST',
      body: JSON.stringify({ reference: 'FR-WRAP1', name: 'Test Person', phone: '+15550001111' }),
    })

    assert.equal(res.ok, true)
    const sent = JSON.parse(seenBody)
    assert.equal(sent.gclid, 'WRAPPED', 'attribution is added to the submission')
    assert.equal(sent.utm_source, 'google')
    assert.equal(sent.name, 'Test Person', 'the original fields are preserved')
    assert.equal(events(LEAD_EVENT_NAME).length, 1)
  })

  test('a non-2xx response fires no lead event and is returned unchanged', async () => {
    installWith(async () => new Response('rejected', { status: 422, statusText: 'Unprocessable' }))

    const res = await (win.fetch as typeof fetch)(FORMSPREE, {
      method: 'POST',
      body: JSON.stringify({ reference: 'FR-WRAP2' }),
    })

    assert.equal(res.status, 422)
    assert.equal(res.ok, false)
    assert.equal(await res.text(), 'rejected', 'the original response body is intact')
    assert.equal(events(LEAD_EVENT_NAME).length, 0)
  })

  test('unrelated fetch calls are untouched', async () => {
    let received: RequestInit | undefined
    installWith(async (_input, init) => {
      received = init
      return new Response('ok', { status: 200 })
    })

    const body = JSON.stringify({ reference: 'FR-OTHER' })
    await (win.fetch as typeof fetch)('https://example.com/api', { method: 'POST', body })

    assert.equal(received?.body, body, 'the body must not be enriched')
    assert.equal(events().length, 0)
  })

  test('a non-JSON body passes through without breaking the request', async () => {
    let seenBody: unknown
    installWith(async (_input, init) => {
      seenBody = init?.body
      return new Response('{}', { status: 200 })
    })

    const res = await (win.fetch as typeof fetch)(FORMSPREE, {
      method: 'POST',
      body: 'name=test&phone=123',
    })

    assert.equal(res.ok, true)
    assert.equal(seenBody, 'name=test&phone=123')
    assert.equal(events(LEAD_EVENT_NAME).length, 0, 'no reference means no event')
  })

  test('the same reference submitted twice does not double-fire', async () => {
    installWith(async () => new Response('{}', { status: 200 }))
    const body = JSON.stringify({ reference: 'FR-TWICE' })

    await (win.fetch as typeof fetch)(FORMSPREE, { method: 'POST', body })
    await (win.fetch as typeof fetch)(FORMSPREE, { method: 'POST', body })

    assert.equal(events(LEAD_EVENT_NAME).length, 1)
  })

  test('a tracking failure never changes what the customer sees', async () => {
    setGtag(() => {
      throw new Error('tag exploded')
    })
    installWith(async () => new Response('{"ok":true}', { status: 200 }))

    const res = await (win.fetch as typeof fetch)(FORMSPREE, {
      method: 'POST',
      body: JSON.stringify({ reference: 'FR-BOOM' }),
    })

    assert.equal(res.ok, true, 'the booking still succeeds')
    assert.equal(res.status, 200)
    assert.equal(await res.text(), '{"ok":true}')
  })

  test('a rejected network request still rejects', async () => {
    installWith(async () => {
      throw new TypeError('network down')
    })

    await assert.rejects(
      () => (win.fetch as typeof fetch)(FORMSPREE, {
        method: 'POST',
        body: JSON.stringify({ reference: 'FR-NET' }),
      }),
      /network down/
    )
    assert.equal(events(LEAD_EVENT_NAME).length, 0)
  })

  test('enrichBookingRequest leaves a bodyless init alone', () => {
    assert.equal(enrichBookingRequest(undefined), undefined)
    const init = { method: 'POST' }
    assert.equal(enrichBookingRequest(init), init)
  })
})

/* ================================================================== *
 * GA4 payload shape
 * ================================================================== */

describe('GA4 payload shape', () => {
  test('every event carries transport_type and session_ref', () => {
    clickLink('tel:9545103073')
    const params = lastParams('contact_call_click')
    assert.equal(params.transport_type, 'beacon')
    assert.ok(params.session_ref)
  })

  test('ga_client_id is read from the _ga cookie when present', () => {
    doc.cookie = '_ga=GA1.1.1234567890.1787000000; _ga_TEGKNGS3QS=GS1.1.x'
    clickLink('tel:9545103073')
    assert.equal(lastParams('contact_call_click').ga_client_id, '1234567890.1787000000')
  })

  test('a missing _ga cookie omits ga_client_id without throwing', () => {
    doc.cookie = ''
    assert.doesNotThrow(() => clickLink('tel:9545103073'))
    assert.ok(!('ga_client_id' in lastParams('contact_call_click')))
  })

  test('ga_session_id is omitted rather than blocking', () => {
    clickLink('tel:9545103073')
    assert.ok(!('ga_session_id' in lastParams('contact_call_click')))
  })

  test('no personal field can leak through the lead payload', () => {
    const payload = {
      reference: 'FR-PII',
      service: 'Exterior Wash ($25)',
      name: 'Test Person',
      phone: '+15550001111',
      notes: 'private note',
    }
    sendLeadEvent(payload as { reference: string; service: string })
    const serialised = JSON.stringify(lastParams(LEAD_EVENT_NAME))
    assert.ok(!serialised.includes('Test Person'))
    assert.ok(!serialised.includes('5550001111'))
    assert.ok(!serialised.includes('private note'))
  })

  test('buildGa4Params passes base params through', () => {
    const out = buildGa4Params({ link_url: 'tel:123', page_path: '/x' })
    assert.equal(out.link_url, 'tel:123')
    assert.equal(out.page_path, '/x')
  })
})
