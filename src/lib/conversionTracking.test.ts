import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  LEAD_EVENT_NAME,
  __resetForTests,
  attributionParams,
  captureAttribution,
  handleOutboundClick,
  initializeConversionTracking,
  matchOutboundEvent,
  purgeExpiredAttribution,
  readGaClientId,
  readStore,
  sendLeadEvent,
} from './conversionTracking'

const STORE_KEY = 'frothy_attribution_v2'
const DAY = 24 * 60 * 60 * 1000

type GtagCall = [string, string, Record<string, unknown>]

function gtagCalls(): GtagCall[] {
  return (window.gtag as unknown as { mock: { calls: GtagCall[] } }).mock.calls
}

function eventCalls(): GtagCall[] {
  return gtagCalls().filter((c) => c[0] === 'event')
}

function setLocation(search: string): void {
  Object.defineProperty(window, 'location', {
    value: new URL(`https://frothycarwash.com/hand-car-wash-hollywood-fl${search}`),
    writable: true,
  })
}

function writeStore(ageMs: number, extra: Record<string, unknown> = {}): void {
  const ts = Date.now() - ageMs
  localStorage.setItem(
    STORE_KEY,
    JSON.stringify({
      first: { gclid: 'FIRSTCLICK', ts, landing_page: '/', referrer: '', ...extra },
      last: { gclid: 'LASTCLICK', ts, landing_page: '/', referrer: '', ...extra },
    })
  )
}

function clickLink(href: string): void {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  document.body.appendChild(a)
  const event = new MouseEvent('click', { bubbles: true })
  Object.defineProperty(event, 'target', { value: a })
  handleOutboundClick(event)
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
  __resetForTests()
  window.gtag = vi.fn()
  setLocation('')
  vi.useRealTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
})

/* ------------------------------------------------------------------ */

describe('no monetary value is ever attached', () => {
  const cases: Array<[string, string]> = [
    ['tel:9545103073', 'contact_call_click'],
    ['mailto:info@frothycarwash.com', 'contact_email_click'],
    ['https://wa.me/19545103073', 'contact_whatsapp'],
    ['https://maps.google.com/?q=2223+Pembroke+Rd', 'get_directions'],
    ['https://square.site/book/L52E1Y2E4PK6M/x', 'booking_start_square'],
  ]

  it.each(cases)('%s fires %s with no value or currency', (href, expected) => {
    clickLink(href)
    const calls = eventCalls()
    expect(calls).toHaveLength(1)
    expect(calls[0][1]).toBe(expected)
    expect(calls[0][2]).not.toHaveProperty('value')
    expect(calls[0][2]).not.toHaveProperty('currency')
  })

  it('the lead event carries no value or currency', () => {
    sendLeadEvent({ reference: 'FR-AAA111', service: 'Full Detail Package ($199)' })
    const calls = eventCalls()
    expect(calls).toHaveLength(1)
    expect(calls[0][1]).toBe(LEAD_EVENT_NAME)
    expect(calls[0][2]).not.toHaveProperty('value')
    expect(calls[0][2]).not.toHaveProperty('currency')
    expect(calls[0][2].service_type).toBe('Full Detail Package')
  })
})

describe('no personal data is transmitted', () => {
  it('never forwards name, phone, email or notes from the booking payload', () => {
    sendLeadEvent({
      reference: 'FR-BBB222',
      service: 'Exterior Wash ($25)',
      ...({ name: 'Test Person', phone: '+15550001111', notes: 'private' } as object),
    })
    const serialised = JSON.stringify(eventCalls()[0][2])
    expect(serialised).not.toContain('Test Person')
    expect(serialised).not.toContain('5550001111')
    expect(serialised).not.toContain('private')
  })
})

describe('outbound matcher', () => {
  it('matches only the intended targets', () => {
    expect(matchOutboundEvent('tel:+19545103073')).toBe('contact_call_click')
    expect(matchOutboundEvent('https://web.whatsapp.com/send')).toBe('contact_whatsapp')
    expect(matchOutboundEvent('https://www.google.com/maps/place/Frothy')).toBe('get_directions')
    expect(matchOutboundEvent('https://square.link/u/ABC')).toBe('booking_start_square')
    expect(matchOutboundEvent('/services')).toBeUndefined()
    expect(matchOutboundEvent('https://www.instagram.com/frothycarwashlounge/')).toBeUndefined()
  })

  it('ignores clicks that are not on a link', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', { value: div })
    handleOutboundClick(event)
    expect(eventCalls()).toHaveLength(0)
  })
})

describe('client-side duplicate protection', () => {
  it('suppresses a repeated click on the same target', () => {
    clickLink('tel:9545103073')
    clickLink('tel:9545103073')
    clickLink('tel:9545103073')
    expect(eventCalls()).toHaveLength(1)
  })

  it('does not suppress different targets', () => {
    clickLink('tel:9545103073')
    clickLink('https://wa.me/19545103073')
    expect(eventCalls()).toHaveLength(2)
  })

  it('fires the lead event once per booking reference', () => {
    expect(sendLeadEvent({ reference: 'FR-CCC333' })).toBe(true)
    expect(sendLeadEvent({ reference: 'FR-CCC333' })).toBe(false)
    expect(sendLeadEvent({ reference: 'FR-CCC333' })).toBe(false)
    expect(eventCalls()).toHaveLength(1)
  })

  it('still fires for a different reference', () => {
    sendLeadEvent({ reference: 'FR-DDD444' })
    sendLeadEvent({ reference: 'FR-EEE555' })
    expect(eventCalls()).toHaveLength(2)
  })

  it('refuses to fire without a reference', () => {
    expect(sendLeadEvent({})).toBe(false)
    expect(eventCalls()).toHaveLength(0)
  })

  it('survives a corrupted dedup list', () => {
    localStorage.setItem('frothy_leads_sent_v1', '{{{not json')
    expect(sendLeadEvent({ reference: 'FR-FFF666' })).toBe(true)
    expect(eventCalls()).toHaveLength(1)
  })
})

describe('attribution capture', () => {
  it('captures every supported click ID and UTM', () => {
    setLocation(
      '?gclid=G1&gbraid=GB1&wbraid=WB1&fbclid=FB1&msclkid=MS1&ttclid=TT1' +
        '&li_fat_id=LI1&twclid=TW1&utm_source=google&utm_medium=cpc' +
        '&utm_campaign=camp&utm_term=term&utm_content=content&utm_id=id1'
    )
    captureAttribution()
    const params = attributionParams()
    expect(params.gclid).toBe('G1')
    expect(params.gbraid).toBe('GB1')
    expect(params.wbraid).toBe('WB1')
    expect(params.fbclid).toBe('FB1')
    expect(params.msclkid).toBe('MS1')
    expect(params.ttclid).toBe('TT1')
    expect(params.li_fat_id).toBe('LI1')
    expect(params.twclid).toBe('TW1')
    expect(params.utm_source).toBe('google')
    expect(params.utm_id).toBe('id1')
  })

  it('keeps first touch immutable while last touch advances', () => {
    setLocation('?utm_source=first_source')
    captureAttribution()
    setLocation('?utm_source=second_source')
    captureAttribution()

    const params = attributionParams()
    expect(params.first_utm_source).toBe('first_source')
    expect(params.utm_source).toBe('second_source')
  })

  it('writes nothing when the URL carries no tracking parameters', () => {
    setLocation('?foo=bar')
    captureAttribution()
    expect(localStorage.getItem(STORE_KEY)).toBeNull()
  })

  it('attaches stored attribution to an outbound event', () => {
    setLocation('?gclid=ATTACHED')
    captureAttribution()
    clickLink('tel:9545103073')
    expect(eventCalls()[0][2].gclid).toBe('ATTACHED')
  })
})

describe('90-day retention behaviour', () => {
  it('reads a record that is inside the window', () => {
    writeStore(89 * DAY)
    expect(readStore()).not.toBeNull()
    expect(attributionParams().gclid).toBe('LASTCLICK')
  })

  it('ignores an expired record', () => {
    writeStore(91 * DAY)
    expect(readStore()).toBeNull()
    expect(attributionParams()).toEqual({})
  })

  it('deletes an expired record on initialization', () => {
    writeStore(120 * DAY)
    expect(localStorage.getItem(STORE_KEY)).not.toBeNull()
    purgeExpiredAttribution()
    expect(localStorage.getItem(STORE_KEY)).toBeNull()
  })

  it('never attaches expired attribution to an event', () => {
    writeStore(200 * DAY)
    clickLink('tel:9545103073')
    const params = eventCalls()[0][2]
    expect(params).not.toHaveProperty('gclid')
    expect(params).not.toHaveProperty('first_gclid')
  })

  it('keeps a fresh record intact when purging', () => {
    writeStore(10 * DAY)
    purgeExpiredAttribution()
    expect(localStorage.getItem(STORE_KEY)).not.toBeNull()
  })
})

describe('malformed and unavailable storage', () => {
  it('discards unparseable JSON', () => {
    localStorage.setItem(STORE_KEY, 'not-json-at-all')
    expect(readStore()).toBeNull()
    expect(localStorage.getItem(STORE_KEY)).toBeNull()
  })

  it('discards a record with the wrong shape', () => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ first: 'x', last: 42 }))
    expect(readStore()).toBeNull()
  })

  it('discards a record with a non-numeric timestamp', () => {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ first: { ts: 'yesterday' }, last: { ts: 'yesterday' } })
    )
    expect(readStore()).toBeNull()
  })

  it('degrades gracefully when localStorage throws on read', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('SecurityError')
    })
    expect(() => readStore()).not.toThrow()
    expect(readStore()).toBeNull()
    expect(attributionParams()).toEqual({})
    spy.mockRestore()
  })

  it('degrades gracefully when localStorage throws on write (private mode quota)', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError')
    })
    setLocation('?gclid=PRIVATE')
    expect(() => captureAttribution()).not.toThrow()
    spy.mockRestore()
  })

  it('still fires events with storage completely unavailable', () => {
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('SecurityError')
    })
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('SecurityError')
    })
    expect(() => clickLink('tel:9545103073')).not.toThrow()
    expect(eventCalls()).toHaveLength(1)
    expect(eventCalls()[0][2]).not.toHaveProperty('gclid')
    get.mockRestore()
    set.mockRestore()
  })
})

describe('best-effort GA identifiers', () => {
  it('parses a client ID from the _ga cookie', () => {
    Object.defineProperty(document, 'cookie', {
      value: '_ga=GA1.1.1234567890.1787000000; _ga_TEGKNGS3QS=GS1.1.x',
      configurable: true,
    })
    expect(readGaClientId()).toBe('1234567890.1787000000')
  })

  it('returns undefined when the cookie is absent, without throwing', () => {
    Object.defineProperty(document, 'cookie', { value: '', configurable: true })
    expect(readGaClientId()).toBeUndefined()
  })

  it('omits ga_session_id rather than blocking when gtag has not resolved it', () => {
    clickLink('tel:9545103073')
    expect(eventCalls()[0][2]).not.toHaveProperty('ga_session_id')
    expect(eventCalls()[0][2]).toHaveProperty('session_ref')
  })
})

describe('tracking never breaks the page', () => {
  it('does nothing when gtag is absent', () => {
    delete (window as { gtag?: unknown }).gtag
    expect(() => clickLink('tel:9545103073')).not.toThrow()
  })

  it('swallows a gtag that throws', () => {
    window.gtag = vi.fn(() => {
      throw new Error('tag blocked')
    })
    expect(() => clickLink('tel:9545103073')).not.toThrow()
  })

  it('initializes only once', () => {
    const spy = vi.spyOn(document, 'addEventListener')
    initializeConversionTracking()
    initializeConversionTracking()
    const clickListeners = spy.mock.calls.filter((c) => c[0] === 'click')
    expect(clickListeners).toHaveLength(1)
    spy.mockRestore()
  })
})
