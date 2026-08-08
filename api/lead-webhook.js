// Receives lead submissions from the Google Ads lead form asset.
//
// Google Ads holds leads for only 30 days and does not email them out, so this
// endpoint catches each submission as it happens and forwards it to the same
// Formspree inbox the website booking form already uses.
//
// Google POSTs JSON shaped like:
//   { lead_id, api_version, form_id, campaign_id, gcl_id, is_test, google_key,
//     user_column_data: [{ column_id, column_name, string_value }, ...] }
//
// The endpoint must return HTTP 200 for Google to accept and keep the webhook
// active — including for the test ping sent when the form is first saved.

const GOOGLE_KEY = process.env.LEAD_WEBHOOK_KEY || 'frothy-lead-hook-2026-a7f3d9e1'
const FORWARD_TO = 'https://formspree.io/f/mdavkzej'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  // Shared secret set on the Google Ads lead form asset.
  if (body.google_key !== GOOGLE_KEY) {
    return res.status(401).json({ error: 'Invalid key' })
  }

  // Google sends a test ping when the webhook is first configured.
  if (body.is_test) {
    return res.status(200).json({ status: 'test received' })
  }

  const answers = {}
  for (const item of body.user_column_data || []) {
    const label = item.column_name || item.column_id
    if (label) answers[label] = item.string_value
  }

  try {
    await fetch(FORWARD_TO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'New Google Ads lead — Frothy Carwash Lounge',
        source: 'Google Ads lead form',
        received_at: new Date().toISOString(),
        lead_id: body.lead_id,
        campaign_id: body.campaign_id,
        gclid: body.gcl_id,
        ...answers,
      }),
    })
  } catch (err) {
    // Never fail the request back to Google — a non-200 makes it retry and then
    // disable the webhook. Log instead so the lead is still visible in Google Ads.
    console.error('Lead forward to Formspree failed', err)
  }

  return res.status(200).json({ status: 'ok' })
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}
