// Creates a Google Calendar event for each website booking.
//
// Square bookings reach the calendar through Square's own native sync. This
// handles the other source: bookings made through the site's own form, which
// previously only ever went to Formspree by email.
//
// Events are titled "WEB - <service> - <name>" so they are distinguishable at a
// glance from the ones Square creates.
//
// Required Vercel environment variables:
//   GOOGLE_SA_EMAIL        service account address (...iam.gserviceaccount.com)
//   GOOGLE_SA_PRIVATE_KEY  the service account private key, newlines as \n
//   GOOGLE_CALENDAR_ID     defaults to frothycarwash@gmail.com
//   BOOKING_WEBHOOK_KEY    shared value, also set in the booking form
//
// Until those are set the endpoint returns 200 and does nothing, so it is safe
// to deploy before the credentials exist.

import crypto from 'node:crypto'

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'frothycarwash@gmail.com'
const TIMEZONE = 'America/New_York'
const WEBHOOK_KEY = process.env.BOOKING_WEBHOOK_KEY || 'frothy-booking-hook-2026'

// Roughly how long each service occupies a bay, from the published service times.
const DURATIONS_MINUTES = [
  [/exterior wash/i, 30],
  [/interior vacuum/i, 30],
  [/inside & out/i, 45],
  [/signature detail/i, 60],
  [/executive finish/i, 90],
  [/full detail/i, 180],
  [/showroom detail/i, 240],
  [/paint correction/i, 240],
  [/ceramic coating/i, 480],
  [/headlight restoration/i, 60],
  [/membership/i, 30],
]

function durationFor(service) {
  for (const [pattern, minutes] of DURATIONS_MINUTES) {
    if (pattern.test(service || '')) return minutes
  }
  return 60
}

// "9:00 AM" -> { hour: 9, minute: 0 }
function parseTime(value) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(value || '').trim())
  if (!match) return null
  let hour = Number(match[1])
  const minute = Number(match[2])
  const meridiem = match[3].toUpperCase()
  if (meridiem === 'PM' && hour !== 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0
  return { hour, minute }
}

// Builds a floating local timestamp. UTC is used only as a calendar calculator
// here - the actual zone is declared separately via the timeZone field.
function localTimestamp(dateStr, hour, minute, addMinutes = 0) {
  const [year, month, day] = String(dateStr).split('-').map(Number)
  if (!year || !month || !day) return null
  const dt = new Date(Date.UTC(year, month - 1, day, hour, minute))
  dt.setUTCMinutes(dt.getUTCMinutes() + addMinutes)
  const pad = (n) => String(n).padStart(2, '0')
  return (
    `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}` +
    `T${pad(dt.getUTCHours())}:${pad(dt.getUTCMinutes())}:00`
  )
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

// Service account -> OAuth access token, signed locally. Avoids pulling in the
// full googleapis package for a single API call.
async function getAccessToken() {
  const clientEmail = process.env.GOOGLE_SA_EMAIL
  const privateKey = (process.env.GOOGLE_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  if (!clientEmail || !privateKey) return null

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/calendar.events',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  )

  const signer = crypto.createSign('RSA-SHA256')
  signer.update(`${header}.${claims}`)
  const signature = signer
    .sign(privateKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  })

  const data = await res.json()
  if (!data.access_token) throw new Error(`Token exchange failed: ${JSON.stringify(data)}`)
  return data.access_token
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  if (body.key !== WEBHOOK_KEY) {
    return res.status(401).json({ error: 'Invalid key' })
  }

  const time = parseTime(body.time)
  if (!body.date || !time || !body.name) {
    return res.status(400).json({ error: 'Missing or invalid date, time or name' })
  }

  // Reject anything outside a sensible window. The endpoint is reachable from
  // the browser, so these checks limit what junk can reach the calendar.
  const bookingDay = new Date(`${body.date}T00:00:00Z`)
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const daysAhead = (bookingDay - today) / 86400000
  if (Number.isNaN(daysAhead) || daysAhead < 0 || daysAhead > 365) {
    return res.status(400).json({ error: 'Date out of range' })
  }

  const minutes = durationFor(body.service)
  const start = localTimestamp(body.date, time.hour, time.minute)
  const end = localTimestamp(body.date, time.hour, time.minute, minutes)
  if (!start || !end) return res.status(400).json({ error: 'Could not build event times' })

  let token
  try {
    token = await getAccessToken()
  } catch (err) {
    console.error('Google auth failed', err)
    return res.status(200).json({ status: 'auth failed, skipped' })
  }

  // Credentials not configured yet - accept quietly so bookings still work.
  if (!token) {
    console.warn('Calendar credentials not set; skipping event creation')
    return res.status(200).json({ status: 'not configured' })
  }

  const details = [
    `Name: ${body.name}`,
    `Phone: ${body.phone || 'not given'}`,
    `Service: ${body.service || 'not specified'}`,
    `Add-ons: ${body.addOns || 'None'}`,
    body.notes ? `Notes: ${body.notes}` : null,
    `Reference: ${body.reference || 'n/a'}`,
    '',
    'Booked via the website form.',
  ]
    .filter(Boolean)
    .join('\n')

  const event = {
    summary: `WEB - ${body.service || 'Booking'} - ${body.name}`,
    description: details,
    location: '2223 Pembroke Rd, Hollywood, FL 33020',
    start: { dateTime: start, timeZone: TIMEZONE },
    end: { dateTime: end, timeZone: TIMEZONE },
  }

  try {
    const calendarRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    )

    if (!calendarRes.ok) {
      const text = await calendarRes.text()
      console.error('Calendar insert failed', calendarRes.status, text)
      return res.status(200).json({ status: 'calendar error', detail: calendarRes.status })
    }

    const created = await calendarRes.json()
    return res.status(200).json({ status: 'created', eventId: created.id })
  } catch (err) {
    console.error('Calendar insert threw', err)
    return res.status(200).json({ status: 'calendar error' })
  }
}
