# Website tracking — events, retention, migration

Reference for `src/lib/conversionTracking.ts`.

Two rules govern everything in this file:

1. **No monetary value is attached to any website event.** Only a completed
   Square payment is revenue, and that never happens in the browser. A
   `value` on a directions tap would flow into Google Ads conversion value
   and manufacture a ROAS figure that describes nothing.
2. **No personal data is transmitted.** Attribution lives in the visitor's
   own `localStorage`. Names, phone numbers, email addresses and booking
   notes are never read, hashed or sent by this module.

---

## 1. Event inventory

| Event | Trigger | Value | Deduplication |
|---|---|---|---|
| `contact_call_click` | Click on any `a[href^="tel:"]` | none | same target within 1500 ms suppressed |
| `contact_email_click` | Click on any `a[href^="mailto:"]` | none | same target within 1500 ms suppressed |
| `contact_whatsapp` | Click on `wa.me`, `api.whatsapp.com`, `web.whatsapp.com` | none | same target within 1500 ms suppressed |
| `get_directions` | Click on `maps.google.*` or `google.*/maps` | none | same target within 1500 ms suppressed |
| `booking_start_square` | Click on `square.site` or `square.link` | none | same target within 1500 ms suppressed |
| `qualify_lead` | Formspree returns HTTP 2xx for a booking submission | none | booking reference, persisted — fires at most once per reference, ever |

All six are attached by a single delegated listener on `document` with
`capture: true`, so links rendered later by React are covered without
re-binding.

`get_directions`, `contact_whatsapp` and `contact_email_click` are
intent signals. They should be **secondary** in Google Ads, never primary —
the whole lesson of the account audit was that bidding on map engagement
optimises for the wrong thing.

### Why `qualify_lead` and not `generate_lead`

`generate_lead` is the better name and the GA4 recommended one. It is
deliberately **not** used yet: production GA4 and Google Ads both key off
`qualify_lead` today, and renaming it in code alone would silently stop
recording lead conversions. `LEAD_EVENT_NAME` is exported as a single
constant so the rename is a one-line change once the account side is ready.
See section 5.

---

## 2. Example payloads

Captured from a real Chromium run against the production build. Values are
example test values, not customer data.

**`contact_call_click`**

```json
["event", "contact_call_click", {
  "link_url": "tel:9545103073",
  "page_path": "/",
  "session_ref": "smt2632zjky70la",
  "gclid": "EXAMPLEGCLID",
  "first_gclid": "EXAMPLEGCLID",
  "utm_source": "google",
  "first_utm_source": "google",
  "utm_medium": "cpc",
  "first_utm_medium": "cpc",
  "utm_campaign": "2026q3_handwash",
  "first_utm_campaign": "2026q3_handwash",
  "first_landing_page": "/",
  "last_landing_page": "/",
  "transport_type": "beacon"
}]
```

**`qualify_lead`**

```json
["event", "qualify_lead", {
  "booking_reference": "FR-REDACTED",
  "event_id": "frothy-FR-REDACTED",
  "service_type": "Full Detail Package",
  "lead_source": "website_booking_form",
  "session_ref": "smt2632zjky70la",
  "gclid": "EXAMPLEGCLID",
  "utm_source": "google",
  "transport_type": "beacon"
}]
```

Note what is absent from both: no `value`, no `currency`, no `phone`, no
`email`, no `name`, no free-text `notes`. There is a test asserting each of
those absences.

`ga_client_id` appears when the `_ga` cookie is readable. `ga_session_id`
appears only if `gtag('get', …)` has resolved — it is best-effort and its
absence never blocks an event.

---

## 3. Attribution record and its real retention behaviour

Stored at `localStorage["frothy_attribution_v2"]`:

```json
{
  "first": { "gclid": "…", "utm_source": "…", "ts": 1787000000000,
             "landing_page": "/hand-car-wash-hollywood-fl", "referrer": "https://www.google.com/" },
  "last":  { "…same shape, refreshed on every tagged arrival…" }
}
```

Captured keys: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`,
`li_fat_id`, `twclid`, and `utm_source|medium|campaign|term|content|id`.
First touch is written once and never overwritten; last touch always
advances.

### What "90-day retention" actually means

**`localStorage` has no native TTL. A record does not delete itself after
90 days.** The honest description of the behaviour is:

- A record whose `last.ts` is older than 90 days is treated as **invalid**.
- It is **deleted on the next `initializeConversionTracking()` call**, which
  happens when the visitor next loads the site.
- It is **never read and never attached to an event** once expired, even in
  the window before it is deleted.
- If the visitor never returns, **the expired record physically remains in
  their browser** until they clear site data. We cannot reach into a browser
  we are not running in.

So: guaranteed not to be *used* after 90 days; not guaranteed to be *gone*
at 90 days. Do not describe it as automatic deletion.

---

## 4. Hashed phone numbers are pseudonymous, not anonymous

Nothing in this PR hashes or transmits a phone number. This section exists
so the later enhanced-conversions work starts from the right premise.

A SHA-256 hash of a phone number is **pseudonymous customer data, not
anonymous data**. US phone numbers have roughly 10 digits of entropy, so
the entire keyspace can be hashed and matched by brute force in minutes. A
plain SHA-256 phone hash should be handled with the same care as the number
itself.

When that work is scoped, compare three representations:

| Representation | Purpose | Reversible by brute force? |
|---|---|---|
| Plain SHA-256 of E.164 | The only form Google accepts for upload | **Yes** — low entropy |
| Keyed HMAC-SHA256 (server-side secret) | Internal matching between a lead and a Square customer | No, unless the key leaks |
| Encrypted-at-rest normalised number | Only if a recoverable value is genuinely required | Reversible by design — avoid unless justified |

**Producing Google's hash without retaining a raw number.** Normalise to
E.164 and SHA-256 it in the browser at submission time, then discard the raw
value from the tracking layer. Persist only the HMAC for internal matching
and hold the plain SHA-256 transiently for the upload call. This does not
make the site "not process personal data" — the form and Formspree still
receive the raw number in plain text today, and that is the fact that
governs the privacy notice.

### Identity record fields (proposed, not built)

Beyond the attribution fields, the record must carry:

- `consent_ad_user_data` — GRANTED / DENIED / UNKNOWN
- `consent_timestamp`
- `privacy_notice_version` — which notice the visitor actually saw
- `data_source` — e.g. `website_booking_form`
- `retention_status` — active / expired / deleted-on-request
- `deletion_requested_at`

### Audit table after a deletion request

The audit trail must not become a back door that preserves what the
deletion removed. After a deletion request, an audit row may retain **only**:

- the internal surrogate row ID
- the action taken (`uploaded`, `adjusted`, `deleted`)
- the timestamp
- the destination (e.g. `google_ads`)
- the outcome (`ok` / `error`) and an error code

It must **not** retain a phone number, an email address, any hash or HMAC of
either, a click ID, a UTM set, a GA client ID, a Square customer or payment
ID, or a free-text JSON `detail` blob that could carry any of them. The
free-form `detail JSONB` column sketched in the earlier design is withdrawn
for exactly this reason: it would have smuggled identifiers past the delete.

---

## 5. Lead-event migration sequence (`qualify_lead` → `generate_lead`)

**Do not ship the rename on its own.** Sequence, with a verification gate at
each step:

1. **Ship this PR.** `qualify_lead` keeps firing under its existing name.
   Reporting is unaffected. Nothing to verify beyond the QA below.
2. **Add the emit, do not switch.** In a later PR, fire `generate_lead`
   *in addition to* `qualify_lead`, behind a build flag defaulting to off.
   Enable it on a preview deployment only.
3. **Observe in GA4 DebugView.** Submit one test booking on preview.
   Confirm both events arrive with identical parameters. Not a key event
   yet — no Ads impact.
4. **Enable in production, still not a conversion.** Both events fire for
   real traffic. `generate_lead` is not marked as a GA4 key event and is not
   imported into Google Ads, so it cannot double-count.
5. **Wait 7 days.** Confirm `generate_lead` count equals `qualify_lead`
   count for the same period. A mismatch means stop and investigate.
6. **Mark `generate_lead` as a GA4 key event.** Still not imported into Ads.
7. **Import into Google Ads as Secondary.** Set counting to
   `ONE_PER_CLICK`. Verify one test submission appears within 24–48 h in
   both GA4 and Google Ads.
8. **Swap primacy in a single session.** Make `generate_lead` Primary and
   `qualify_lead` Secondary in the same sitting. Both never count as primary
   simultaneously — this is what prevents double-counting.
9. **After 30 days**, stop emitting `qualify_lead` and remove the flag.

**Rollback.** At any step before 8: set `generate_lead` to Secondary and
`qualify_lead` back to Primary, then disable the flag. Because
`qualify_lead` is emitted continuously until step 9, there is never a window
in which no lead event fires. That redundancy is the rollback.

---

## 6. Google conversion-upload route — verified findings

Relevant to the future revenue import, not to this PR.

- Google's Ads Developer Blog states that from **15 June 2026** the Google
  Ads API stops accepting **new adopters** of offline conversion import via
  `UploadClickConversions`. Existing adopters that imported data between
  December 2025 and May 2026 may continue while they migrate. New adopters
  receive `CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE`.
- **Frothy is a new adopter.** A query of the Google Ads account
  (customer 7568810515) for conversion actions of type `UPLOAD_CLICKS`,
  `UPLOAD_CALLS`, `STORE_SALES` or `STORE_SALES_DIRECT_UPLOAD` returns
  **zero rows**. No offline conversion action has ever existed, so no
  offline or enhanced-conversion upload can have been made from this
  account, before or after the cutoff.
- **Therefore the Data Manager API must be used.** The Google Ads API route
  is not available to us.
- Frothy holds no developer token of its own; any upload would run under a
  third party's token. Whether *that* token is grandfathered is a question
  for whoever owns it, and it does not change the conclusion above — the
  account has no import history either way.

### Data Manager API shape (to be verified against the reference before coding)

- Method: `POST` to `events.ingest`.
- `destinations[]`: `operatingAccount` (`accountType: GOOGLE_ADS_ACCOUNT`,
  `accountId`), optional `loginAccount`, and `productDestinationId` — for
  event ingestion this is the **conversion action ID** (the `ctId` query
  parameter in the Ads UI conversion detail URL).
- `events[]`: `eventTimestamp` (ISO 8601), `transactionId` (the
  deduplication key — use the Square payment ID), `eventSource`
  (`WEB` / `APP` / `IN_STORE` — ours is `IN_STORE`), `conversionValue`,
  `currency`, and at least one identifier: `adIdentifiers.gclid|gbraid|wbraid`
  **or** `userData`.
- `userData`: SHA-256 hashed, hex or Base64 per the request-level `encoding`
  field, normalised to lowercase and trimmed before hashing.
- `consent`: `{ "adUserData": "GRANTED|DENIED", "adPersonalization": "GRANTED|DENIED" }`.
- `validateOnly: true` supports a dry run — use it for the first end-to-end test.
- Auth is OAuth 2.0. **The exact scope string is not yet confirmed** and must
  be read from the API reference before implementation; the scope quoted on
  the developer-guide page belongs to the docs site itself, not to this API.

**Nothing is to be built against this until the payload and scope are
confirmed against the official reference and a `validateOnly` call succeeds.**

---

## 7. QA

### Automated

```bash
npm test        # vitest, 36 tests
npm run build   # tsc -b && vite build && SSR build && prerender
npx eslint .    # 11 pre-existing errors, none in changed files
```

### Manual, in GA4 DebugView

Install the GA Debugger extension, open a preview deployment, then
**GA4 → Admin → DebugView**.

| Do this | Expect |
|---|---|
| Land on `/?gclid=TEST1&utm_source=qa` | `localStorage.frothy_attribution_v2` holds `gclid: "TEST1"` |
| Tap a phone number | one `contact_call_click`, no `value`, `gclid: TEST1` |
| Tap "Get Directions" | one `get_directions`, no `value` |
| Tap WhatsApp | one `contact_whatsapp`, no `value` |
| Tap an email link | one `contact_email_click`, no `value` |
| Open Book Now → tap the Square banner | one `booking_start_square`, no `value` |
| Double-tap any of the above quickly | still exactly one event |
| Submit a test booking | one `qualify_lead` with `booking_reference`, no `value` |
| Submit again with the same reference | no second `qualify_lead` |
| Close the tab, return tomorrow, submit | attribution still present |

### Browser-level QA already performed

A headless Chromium run against the production build, desktop (1440×900)
and mobile (iPhone 14 profile): **34/34 checks passed on both**, covering
event firing, single-fire, absence of `value`/`currency`, attribution
attachment, repeat-click suppression, absence of the dead `tracking.js`
request, and deletion of an expired record on initialization.

---

## 8. Deployment and rollback

**This PR is a draft. It must not be merged or deployed without approval.**

Sequence when approved:

1. Merge to `main`. Vercel builds a preview.
2. Run the manual DebugView checklist against the **preview** URL.
3. Confirm zero CSP violations in the browser console — the only CSP change
   widens `connect-src` for GA4's regional collection endpoints
   (`*.google-analytics.com`, `*.analytics.google.com`), which the previous
   policy did not permit.
4. Promote to production.
5. Re-run the checklist against production.
6. Watch GA4 Realtime for 30 minutes. New event names should appear;
   `qualify_lead` volume should be unchanged.

**Rollback:** revert the merge commit and redeploy. No account setting is
changed by this PR, so nothing needs undoing outside the repository. Stored
`frothy_attribution_v2` records in visitors' browsers are inert once the
code is gone and expire on their own terms.

### Expected changes after deployment

**GA4** — five new event names appear (`contact_call_click`,
`contact_email_click`, `contact_whatsapp`, `get_directions`,
`booking_start_square`). Existing `click` events from enhanced measurement
continue in parallel; that overlap is expected and harmless because neither
is a key event. `qualify_lead` volume should be flat. No revenue appears —
GA4 revenue stays at $0.00, correctly, because no payment event exists.

**Google Ads** — **no change.** No new conversion action is created, no
import is configured, no bidding or goal setting is touched. The new events
have no effect on Ads until someone imports them, which is a separate,
separately-approved decision.
