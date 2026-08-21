# Website tracking — events, data flow, retention, deployment

Reference for `src/lib/conversionTracking.ts`.

Three rules govern everything in this file:

1. **No monetary value is attached to any website event.** Only a completed
   Square payment is revenue, and that never happens in the browser. A
   `value` on a directions tap would flow into Google Ads conversion value
   and manufacture a ROAS figure that describes nothing.
2. **No event is inferred from a URL when the URL is ambiguous.** A link is
   classified by an explicit `data-analytics-event` marker, or by an
   unambiguous protocol (`tel:`, `mailto:`, WhatsApp), or not at all.
3. **This module transmits advertising identifiers, and they are not
   anonymous.** See section 3 for exactly what goes where. Click IDs
   (`gclid`, `fbclid`, `msclkid`, …) are pseudonymous identifiers issued by
   ad platforms that can be joined back to a click and, on the platform
   side, to a person. They are never described as anonymous anywhere in
   this codebase.

---

## 1. Event inventory

| Event | How the link is identified | Value | Deduplication |
|---|---|---|---|
| `get_directions` | `data-analytics-event="get_directions"` marker | none | same target within 1500 ms suppressed |
| `google_reviews_click` | `data-analytics-event="google_reviews_click"` marker | none | same target within 1500 ms suppressed |
| `booking_start_square` | `data-analytics-event="booking_start_square"` marker | none | same target within 1500 ms suppressed |
| `membership_checkout_start` | `data-analytics-event="membership_checkout_start"` marker | none | same target within 1500 ms suppressed |
| `contact_call_click` | protocol: `a[href^="tel:"]` | none | same target within 1500 ms suppressed |
| `contact_email_click` | protocol: `a[href^="mailto:"]` | none | same target within 1500 ms suppressed |
| `contact_whatsapp` | protocol: `wa.me`, `api.whatsapp.com`, `web.whatsapp.com` | none | same target within 1500 ms suppressed |
| `qualify_lead` | Formspree returns HTTP 2xx for a booking submission | none | booking reference, persisted — **best effort**, see section 6 |

All click events are attached by one delegated listener on `document` with
`capture: true`, so links React renders later are covered without re-binding.

`get_directions`, `google_reviews_click`, `contact_whatsapp` and
`contact_email_click` are intent signals. They should be **secondary** in
Google Ads, never primary — the lesson of the account audit was that bidding
on map engagement optimises for the wrong thing.

### 1.1 Why markers replaced URL inference

The previous implementation classified links by URL pattern. Two of its
patterns were wrong on this site:

- `/(maps\.google\.[a-z.]+|google\.[a-z.]+\/maps)/i` matched
  `https://www.google.com/maps/search/Frothy+Carwash+Lounge+…` and
  `https://www.google.com/maps/place/Frothy+Carwash+Lounge`. Those are the
  **"read our reviews" links** in `Reviews.tsx`, `GoogleReviewsSlider.tsx`
  and `About.tsx`. Every review click was being counted as a directions tap.
- `/square\.(site|link)/i` matched the six `square.link/u/*` **membership
  subscription** links in `Memberships.tsx` and labelled them
  `booking_start_square`. Memberships are recurring subscriptions, not
  appointments; counting them as bookings inflates booking conversions and
  hides membership sign-ups entirely.

Neither URL can be classified correctly by pattern, because Google Maps and
Square use the same hostnames for different intents. `matchProtocolEvent()`
therefore contains **no Maps or Square pattern at all** — those two events
exist only where a developer has stated the intent on the element.

**A marker that is not in `ALLOWED_MARKER_EVENTS` fires nothing.** A typo
produces silence, not a junk event name in the GA4 event list.

### 1.2 Marker placement (13 markers, 11 files)

| Event | File:line |
|---|---|
| `get_directions` | `components/Footer.tsx:72` · `sections/LocationCTA.tsx:32` · `sections/LocationCTA.tsx:93` · `pages/Contact.tsx:26` · `pages/PrivacyPolicy.tsx:288` |
| `google_reviews_click` | `components/GoogleReviewsSlider.tsx:113` · `sections/Reviews.tsx:79` · `sections/Reviews.tsx:95` · `sections/Hero.tsx:76` · `pages/About.tsx:188` |
| `booking_start_square` | `components/BookingModal.tsx:213` · `pages/Services.tsx:279` |
| `membership_checkout_start` | `pages/Memberships.tsx:196` |

The single `Memberships.tsx` anchor is rendered once per plan × vehicle size
and covers all six `square.link/u/*` URLs. The Google Maps `<iframe>` embeds
in `LocationCTA.tsx` and `Contact.tsx` are not anchors and are never tracked.

### 1.3 Why `qualify_lead` and not `generate_lead`

`generate_lead` is the better name and the GA4 recommended one. It is
deliberately **not** used yet: production GA4 and Google Ads both key off
`qualify_lead` today, and renaming it in code alone would silently stop
recording lead conversions. `LEAD_EVENT_NAME` is exported as a single
constant so the rename is a one-line change once the account side is ready.
See section 7.

---

## 2. Example payloads

Captured from a real headless Chromium run against the production build
(`docs` values below come from `/tmp/audit/qa.mjs`, desktop profile). The
identifiers are synthetic test values, not customer data.

**`google_reviews_click`** — the event that used to be `get_directions`:

```json
["event", "google_reviews_click", {
  "link_url": "https://www.google.com/maps/search/Frothy+Carwash+Lounge+2223+Pembroke+Road+Hollywood+FL+33020",
  "page_path": "/",
  "session_ref": "smt2zp726hphigv",
  "transport_type": "beacon",
  "utm_source": "qa", "utm_medium": "test", "utm_campaign": "qa_camp",
  "click_id_types": "gclid,fbclid,msclkid",
  "gclid": "QA123", "fbclid": "FBQA", "msclkid": "MSQA",
  "first_utm_source": "qa", "first_utm_medium": "test",
  "first_utm_campaign": "qa_camp", "first_landing_page": "/"
}]
```

**`membership_checkout_start`** — the event that used to be
`booking_start_square`:

```json
["event", "membership_checkout_start", {
  "link_url": "https://square.link/u/18XnOa8I",
  "page_path": "/memberships",
  "session_ref": "smt2zp726hphigv",
  "transport_type": "beacon",
  "utm_source": "qa", "utm_medium": "test", "utm_campaign": "qa_camp",
  "click_id_types": "gclid,fbclid,msclkid",
  "gclid": "QA123", "fbclid": "FBQA", "msclkid": "MSQA",
  "first_utm_source": "qa", "first_utm_medium": "test",
  "first_utm_campaign": "qa_camp", "first_landing_page": "/"
}]
```

**`qualify_lead`**:

```json
["event", "qualify_lead", {
  "booking_reference": "QA-1",
  "event_id": "frothy-QA-1",
  "service_type": "Inside & Out",
  "lead_source": "website_booking_form",
  "session_ref": "smt2zp726hphigv",
  "transport_type": "beacon",
  "utm_source": "qa", "utm_medium": "test", "utm_campaign": "qa_camp",
  "click_id_types": "gclid,fbclid,msclkid",
  "gclid": "QA123", "fbclid": "FBQA", "msclkid": "MSQA",
  "first_utm_source": "qa", "first_utm_medium": "test",
  "first_utm_campaign": "qa_camp", "first_landing_page": "/"
}]
```

`service_type` is the plan name with its price suffix stripped
(`"Inside & Out ($40)"` → `"Inside & Out"`). The price is removed precisely
so that no monetary figure travels with the event. No payload anywhere in
this module contains `value`, `currency`, a name, a phone number, an email
address or a booking note.

---

## 3. Where each field actually goes

This module writes to three destinations. They receive different data and
the difference matters.

### 3.1 The visitor's `localStorage` — key `frothy_attribution_v2`

Never leaves the browser on its own. Holds a first-touch and a last-touch
record:

| Field | Notes |
|---|---|
| `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`, `li_fat_id`, `twclid` | pseudonymous advertising click identifiers, when present in the URL |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id` | as supplied in the URL |
| `landing_page` | path only |
| `referrer_host` | **hostname only** — see section 4 |
| `ts` | epoch ms of the touch |

Each stored value is capped at 300 characters. Nothing else is stored. No
name, phone, email, booking note or Square identifier is ever written here.

### 3.2 Google Analytics 4 — via `gtag('event', …)`

Built by `buildGa4Params()`, always passed through `applyGa4Limits()`.
Every event carries:

`link_url`* · `page_path` · `session_ref` · `transport_type` ·
`ga_client_id`† · `ga_session_id`† · last-touch `utm_source`, `utm_medium`,
`utm_campaign`, `utm_term`, `utm_content`, `utm_id` · `click_id_types` ·
each present click ID **whose value is ≤ 100 characters** ·
`first_utm_source` · `first_utm_medium` · `first_utm_campaign` ·
`first_landing_page`

\* click events only. `qualify_lead` carries `booking_reference`, `event_id`,
`service_type` and `lead_source` instead.
† best effort — omitted silently when the `_ga` cookie or the gtag
`session_id` callback is unavailable. Neither is load-bearing.

GA4 receives a **deliberately reduced** first-touch summary (four fields, not
the full first-touch record) so that the 25-parameter ceiling is not
approached. Observed maximum in QA: **15 parameters**.

### 3.3 The Formspree booking submission

**The Formspree submission already contains the customer's name and phone
number.** That is pre-existing behaviour of `BookingModal.tsx`, not something
this PR introduces. What this PR does introduce is that
`buildFormspreeAttribution()` adds the attribution identifiers **to that same
submission**, so name, phone and advertising click IDs now travel together in
one payload to Formspree and into the booking notification email.

That is the deliberate design — matching a lead back to an ad click requires
the two to be linked somewhere — but it must not be described as anonymous,
and it is a change in what Formspree holds. Fields added by this PR:

`gclid` · `first_gclid` · `gbraid` · `first_gbraid` · `wbraid` ·
`first_wbraid` · `fbclid` · `first_fbclid` · `msclkid` · `first_msclkid` ·
`ttclid` · `first_ttclid` · `li_fat_id` · `first_li_fat_id` · `twclid` ·
`first_twclid` · `utm_source` · `first_utm_source` · `utm_medium` ·
`first_utm_medium` · `utm_campaign` · `first_utm_campaign` · `utm_term` ·
`first_utm_term` · `utm_content` · `first_utm_content` · `utm_id` ·
`first_utm_id` · `first_landing_page` · `last_landing_page` ·
`first_referrer_host` · `first_touch_at` · `last_touch_at`

(only the keys that actually have values are sent — an 18-key payload in QA).

No `value`, no `currency`, no hashed or raw phone number, and no field that
was not already in the URL the visitor arrived on.

The Formspree payload is **not subject to GA4's collection limits** — those
limits apply to `gtag('event', …)` calls, not to a JSON body posted to a form
endpoint — so this builder keeps full fidelity where GA4 gets the compact
version. Two builders exist for exactly this reason.

That is not the same as saying Formspree accepts anything. **Formspree's own
applicable limits — on payload size, field count, or field length — have not
been independently verified here**, because the account is not accessible from
this audit. If a submission is ever rejected or truncated at the Formspree
end, this builder is the place to look first.

**Privacy consequence to be aware of:** anyone with access to the Formspree
inbox can now see which ad click a named customer came from. If that is not
acceptable, the correct fix is to stop sending attribution to Formspree and
solve lead matching server-side — not to relabel the data as anonymous.

---

## 4. Referrer handling

`document.referrer` is never stored or transmitted as a URL. `referrerHost()`
parses it and keeps **only the hostname**:

```
https://www.google.com/search?q=confidential+search+terms&aqs=…
                    ↓
              www.google.com
```

A referrer that fails to parse, or whose hostname exceeds 100 characters,
is dropped entirely. The full referrer — which can carry search terms,
session tokens or private query strings from the referring site — is never
persisted and never sent to GA4 or Formspree.

QA asserts that the string `confidential`, the parameter name `aqs`, and any
`http://`/`https://` prefix appear nowhere in the stored record.

---

## 5. GA4 collection limits

GA4 silently discards events and parameters that exceed its documented
limits, so the module enforces them before dispatch rather than trusting
the tag:

| Limit | Constant | Behaviour on exceed |
|---|---|---|
| 25 parameters per event | `GA4_MAX_PARAMS` | later entries dropped; entries are listed in priority order |
| 40 characters per parameter name | `GA4_MAX_NAME_LENGTH` | parameter dropped |
| 100 characters per parameter value | `GA4_MAX_VALUE_LENGTH` | value truncated |

Click identifiers are the exception to truncation. A truncated `gclid` is
worse than a missing one — it will never match and it looks like data. So
`buildGa4Params()` includes an individual click ID **only when the whole
value fits in 100 characters**; when it does not, the identifier's *name*
still appears in `click_id_types`, and the complete value remains in
`localStorage` and in the Formspree submission.

**What `click_id_types` does and does not do.** It is an **informational
custom parameter only**. It records which click identifiers were present on
the visit, so that a report can tell "this event came from a session that
carried a `gclid`" apart from one that carried nothing. **It does not cause
GA4 to attribute the event to any channel or campaign.** GA4 attribution is
determined primarily by the landing session — Google Ads auto-tagging (the
`gclid` on the landing URL, linked through the Google Ads ↔ GA4 property
link) and the UTM parameters on that landing URL — and is resolved by GA4's
own attribution model, not by parameters an event happens to carry. Sending
or omitting `click_id_types`, or any individual click ID, on a later event
changes what a custom report can show; it does not change the source, medium
or campaign GA4 assigns.

Empty strings, `null` and `undefined` are dropped rather than sent as `""`.

---

## 6. Lead deduplication — best effort, not guaranteed

`sendLeadEvent()` fires at most once per booking reference **on that browser
profile**, using a list of at most 50 recent references in `localStorage`.

The reference is recorded **only after `gtag` accepts the call**:

```ts
const sent = sendEvent(LEAD_EVENT_NAME, { … })
if (!sent) return false          // blocked / not-yet-loaded tag: retry stays possible
rememberLeadReference(reference) // recorded only after a confirmed send
```

`sendEvent()` returns `false` when `window.gtag` is not a function or when
the call throws. Recording the reference before that check — the previous
behaviour — meant a booking made while the tag was blocked was permanently
marked as sent and could never be recovered.

**Deduplication is not guaranteed.** It will not hold when:

- the visitor is in private browsing, or `localStorage` is blocked by
  browser settings, an extension, or a cookie-consent tool;
- the visitor books from a second device or a second browser;
- browsing data is cleared between submissions;
- storage quota is exhausted (the write fails silently and the next
  submission of the same reference will fire again).

If exact once-per-lead counting is required, it has to be enforced
server-side on the booking reference. This module cannot provide it and does
not claim to.

The same caveat applies to the 90-day attribution window: `localStorage` has
no native TTL. Expired records are removed by `purgeExpiredAttribution()`
**the next time the visitor loads the site**. A visitor who never returns
keeps the record in their browser indefinitely. There is no automatic
deletion at exactly 90 days.

---

## 7. Lead-event rename — coordinated, not independent

Do **not** change `LEAD_EVENT_NAME` in a deploy of its own. The order is:

1. Register `generate_lead` as a GA4 key event alongside the existing
   `qualify_lead`.
2. Create the matching Google Ads conversion action and import it, leaving
   the existing one live.
3. Deploy the one-line constant change.
4. Confirm in GA4 DebugView and in the Google Ads conversion diagnostics
   that `generate_lead` is arriving.
5. Only then retire `qualify_lead` in both accounts.

Steps 1, 2 and 5 are advertising-account changes and are **out of scope for
this PR**. They require separate approval.

---

## 8. Deployment sequence

**Merging into `main` is not a preview step.** Vercel deploys `main` to
production, so a merge performed "to see the preview" *is* the production
deployment. The sequence below never merges before verification.

1. Push the branch. Vercel builds a **preview deployment for the branch**,
   at a `*.vercel.app` preview URL, with no effect on `frothycarwash.com`.
2. On the preview URL, run the QA pass: markers fire the right events,
   reviews do not fire `get_directions`, memberships do not fire
   `booking_start_square`, no `value` or `currency`, no name or phone.
3. On the preview URL, confirm the Content-Security-Policy header allows
   `https://*.google-analytics.com` and `https://*.analytics.google.com` in
   `connect-src`, and that no GA request is being blocked in the console.
4. In GA4 DebugView, confirm each event arrives with the expected parameters.
5. Get explicit approval to deploy.
6. Merge to `main`; Vercel deploys to production.
7. Re-run steps 2–4 against `frothycarwash.com`.
8. If anything regresses, roll back by promoting the previous production
   deployment in Vercel — do not attempt a forward fix under live traffic.

**Preview status.** Vercel's GitHub app is installed on this repository and
does build a branch preview. For the current head of this branch the
deployment reports `Ready` / "Deployment has completed", at:

```
https://frothy-website-git-tracking-website-25ab23-michael-s-projects28.vercel.app
```

Production (`frothycarwash.com`, Vercel project `frothy-website`) is **not**
affected by that deployment.

**Outstanding:** steps 2–4 have not been run against the preview URL itself.
The audit environment has no network egress to `*.vercel.app` and no Vercel
account access, so the preview can be confirmed as built but not exercised
from here. Those three steps must be run from a browser that can reach the
preview URL before step 5. Merging to `main` is **not** an acceptable
substitute for them, because on this project that merge is itself the
production deploy.

---

## 9. Test suite

`npm test` compiles `src/lib/**` with `tsconfig.test.json` and runs the
result on Node's built-in test runner:

```
tsc -p tsconfig.test.json && node --test "build-test/**/*.test.js"
```

**No test dependency is installed.** There is no vitest, no jsdom, no test
framework in `package.json` at all — `src/lib/conversionTracking.test.ts`
builds its own minimal `window`, `document` and `localStorage` doubles. This
keeps `package-lock.json` byte-identical to `main`, so `npm ci` on Vercel
reproduces exactly the dependency tree that is running in production today.

69 tests across 13 suites cover:

- review links never fire `get_directions`; directions links fire exactly one
- Square appointment links vs. membership links, each to its own event
- unrecognised markers fire nothing; unmarked Maps/Square URLs fire nothing
- protocol links (`tel:`, `mailto:`, WhatsApp)
- no event carries `value` or `currency`
- referrer reduced to a hostname; malformed referrers dropped
- all three GA4 limits, including oversized-click-ID omission
- attribution capture, first vs. last touch, the 90-day window
- malformed, unavailable and write-failing `localStorage`
- lead dedup: gtag absent, gtag throwing, retry after failure, storage
  write failure
- the fetch wrapper: 2xx fires the lead, non-2xx does not, unrelated URLs
  pass through untouched, non-JSON bodies pass through untouched, a double
  submission fires once, a tracking failure never breaks the booking, a
  rejected network request still rejects

Browser-level QA (`/tmp/audit/qa.mjs`, not part of the repo) runs the
production build in headless Chromium on a desktop and an iPhone 14 profile:
78/78 checks pass.
