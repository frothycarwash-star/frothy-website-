import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const LAST_UPDATED = 'August 21, 2026'

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">{title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
    </section>
  )
}

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Frothy Carwash Lounge | Hollywood, FL',
    description:
      'How Frothy Carwash Lounge collects, uses, and protects your personal information, including our use of cookies, analytics, and advertising services.',
    canonical: '/privacy-policy',
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-frothy-navy text-frothy-foam py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-frothy-foam/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-lg text-gray-700 leading-relaxed">
          This Privacy Policy explains how Frothy Carwash Lounge (&ldquo;Frothy,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, shares, and protects information about you
          when you visit frothycarwash.com, contact us, book a service, or interact with our ads. We operate a
          hand car wash, detailing, and coffee lounge at 2223 Pembroke Rd, Hollywood, FL 33020.
        </p>

        <Section id="information-we-collect" title="1. Information We Collect">
          <p className="font-semibold text-gray-900">Information you give us directly</p>
          <p>
            When you submit a booking or contact request, call us, message us on WhatsApp, or complete a form
            in one of our ads, we collect the information you choose to provide. This typically includes your
            name, phone number, email address, vehicle details, and the service you are interested in, along
            with any message you write.
          </p>

          <p className="font-semibold text-gray-900 pt-2">Information collected automatically</p>
          <p>
            When you browse the site, we and our service providers automatically collect technical and usage
            information, including your IP address, browser type and version, device type, operating system,
            referring website, the pages you view, the links you click, and the dates and times of your visits.
          </p>

          <p className="font-semibold text-gray-900 pt-2">Advertising identifiers</p>
          <p>
            If you reach our site from an ad or a marketing link, the link often carries a tracking code in its
            web address. We record these codes so we can tell which advertising brought you to us. Depending on
            where you clicked, that may include{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">gclid</code>,{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">gbraid</code>, and{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">wbraid</code> (Google),{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">fbclid</code> (Facebook and Instagram),{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">msclkid</code> (Microsoft and Bing),{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">ttclid</code> (TikTok),{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">li_fat_id</code> (LinkedIn), and{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">twclid</code> (X), together with any
            campaign parameters in the address (<code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">utm_source</code>,{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">utm_medium</code>,{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">utm_campaign</code>,{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">utm_term</code>,{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">utm_content</code>, and{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">utm_id</code>).
          </p>
          <p>
            We also record the page you first landed on. If another website sent you here, we keep only the
            <strong> name of that website</strong> &mdash; for example{' '}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">www.google.com</code> &mdash; and not
            the full address, the page path, or anything you typed into a search box.
          </p>

          <p className="font-semibold text-gray-900 pt-2">Where this is kept, and for how long</p>
          <p>
            This information is stored in your own browser, in what is called{' '}
            <strong>local storage</strong>. It is not session storage, and it does not disappear when you close
            the tab or the browser.
          </p>
          <p>
            We treat it as expired after <strong>90 days</strong>. Expired information is not used, and it is
            deleted the next time you load our website. If you never come back, the expired information may
            physically remain in your browser until you clear it yourself. You can remove it at any time using
            your browser&apos;s settings for site data &mdash; usually under a heading such as &ldquo;Cookies
            and other site data&rdquo; or &ldquo;Clear browsing data.&rdquo;
          </p>

          <p className="font-semibold text-gray-900 pt-2">When you submit a booking</p>
          <p>
            If you submit a booking request, the advertising identifiers and campaign information described
            above are attached to that submission. The submission already contains the details you entered,
            including your name and phone number, so these are sent together in one message to Formspree, our
            form provider, and on to our inbox.
          </p>
          <p>
            These advertising identifiers are <strong>pseudonymous, not anonymous</strong>. On their own they do
            not spell out your name, but they are unique to your click and, when combined with other information
            &mdash; including the name and phone number in the same booking &mdash; they can be connected to you.
            We describe them this way deliberately rather than calling them anonymous.
          </p>

          <p className="font-semibold text-gray-900 pt-2">Payments</p>
          <p>
            <strong>This website does not collect or store payment card details.</strong> There is no card
            form anywhere on frothycarwash.com.
          </p>
          <p>
            Some buttons on this site &mdash; booking an appointment, or signing up for a membership &mdash;
            take you to <strong>Square</strong>, our scheduling and payment provider. If you enter card or
            payment details there, you are entering them on Square&apos;s own website, and Square handles them
            under its own privacy practices. You can also pay in person at our location, where payment is again
            processed by Square.
          </p>
          <p>
            Either way, the tracking described on this page{' '}
            <strong>never receives or sends any payment information</strong>. It does not see your card
            details, the amount you paid, the currency, our point-of-sale takings, or any other Square sales
            figure.
          </p>
        </Section>

        <Section id="cookies" title="2. Cookies and Similar Technologies">
          <p>
            We use cookies, storage inside your browser, and similar technologies to keep the site working, to
            understand how it is used, and to measure the performance of our advertising. Broadly, these fall
            into three groups:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Strictly necessary</strong> &mdash; required for the site to load and function correctly.
            </li>
            <li>
              <strong>Analytics</strong> &mdash; help us understand which pages are visited and how people move
              through the site, so we can improve it.
            </li>
            <li>
              <strong>Advertising</strong> &mdash; let us measure whether an ad led to a booking or a call, and
              allow Google to attribute conversions to the right campaign.
            </li>
          </ul>
          <p>
            Most browsers let you block or delete cookies through their settings. The advertising identifiers
            described above are kept in local storage, which is <strong>not</strong> cleared by closing the tab
            or the browser &mdash; to remove them, use your browser&apos;s controls for clearing site data.
            Blocking cookies or clearing site data may affect how parts of the site behave.
          </p>
        </Section>

        <Section id="how-we-use" title="3. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your enquiry and schedule, confirm, or follow up on a booking.</li>
            <li>To provide the car wash, detailing, ceramic coating, or membership services you request.</li>
            <li>To operate, secure, maintain, and improve our website.</li>
            <li>
              To measure and improve our advertising &mdash; including understanding which campaigns and
              keywords lead to real enquiries.
            </li>
            <li>To keep business records and comply with our legal and tax obligations.</li>
            <li>
              To send you service-related messages, and &mdash; only where you have asked for them &mdash;
              offers or updates. You can opt out of marketing messages at any time.
            </li>
          </ul>
        </Section>

        <Section id="third-parties" title="4. Service Providers and Third Parties">
          <p>
            We do not sell your personal information. We share it only with service providers who help us run
            our business, and only to the extent they need it:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">Provider</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">What it does</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Google (Analytics &amp; Ads)</td>
                  <td className="px-4 py-3 text-gray-700">
                    Website analytics, advertising, and conversion measurement. Includes Google Analytics 4 and
                    Google Ads conversion tracking, and any lead form you complete inside a Google ad.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Square</td>
                  <td className="px-4 py-3 text-gray-700">
                    Appointment scheduling, membership and payment checkout, and in-person point-of-sale
                    processing. Any payment information you enter on Square is handled by Square under its own
                    privacy practices.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Formspree</td>
                  <td className="px-4 py-3 text-gray-700">
                    Receives booking and contact form submissions and delivers them to our inbox. Where
                    attribution information is available, the advertising identifiers and campaign parameters
                    described in section 1 are attached to the same submission.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Vercel</td>
                  <td className="px-4 py-3 text-gray-700">
                    Website hosting, plus aggregate traffic and page-speed measurement.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">WhatsApp (Meta)</td>
                  <td className="px-4 py-3 text-gray-700">
                    If you choose to message us via the WhatsApp button, your message is handled under Meta&apos;s
                    own privacy policy.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We may also disclose information where required by law, to enforce our terms, or to protect the
            rights, safety, or property of Frothy Carwash Lounge, our customers, or others. If our business is
            sold or reorganised, customer information may transfer as part of that transaction.
          </p>
        </Section>

        <Section id="advertising" title="5. Advertising and Analytics Choices">
          <p>
            We may advertise or promote Frothy through Google, ChatGPT/OpenAI, Apple Maps, Meta and other
            platforms. The platforms used may change over time, and we are not necessarily running paid
            advertising on all of them at any given moment. These platforms may use cookies and advertising
            identifiers to show you our ads and to report on their performance. The controls below are the
            Google ones, since Google is where most of our measurement happens; other platforms provide their
            own settings:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Google My Ad Center
              </a>{' '}
              &mdash; manage the ads Google shows you.
            </li>
            <li>
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Google Analytics Opt-out Browser Add-on
              </a>{' '}
              &mdash; stop your visits being measured by Google Analytics.
            </li>
            <li>
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Digital Advertising Alliance opt-out
              </a>{' '}
              &mdash; opt out of interest-based advertising across participating companies.
            </li>
          </ul>
          <p>
            Most browsers also offer a &ldquo;Do Not Track&rdquo; setting. There is currently no industry
            standard for how sites should respond to it, so our site does not respond to Do Not Track signals.
          </p>
        </Section>

        <Section id="retention" title="6. How Long We Keep Information">
          <p>
            We keep enquiry and booking information for as long as needed to provide the service and to keep
            reasonable business records &mdash; generally no longer than three years after your last contact
            with us, unless a longer period is required by law.
          </p>
          <p>
            Advertising identifiers are held in your browser&apos;s local storage and are treated as expired
            after 90 days. Once expired they are not used, and they are deleted the next time you load our
            website. Because this data sits in your own browser rather than on our servers, we cannot delete it
            remotely: if you never return to the site, it may remain in your browser until you clear your site
            data. Advertising identifiers that were attached to a booking you submitted are kept with that
            booking record, under the retention period above. Analytics data is retained according to the
            settings we configure in Google Analytics.
          </p>
        </Section>

        <Section id="your-rights" title="7. Your Privacy Rights">
          <p>
            Depending on where you live, you may have the right to request access to the personal information we
            hold about you, to have it corrected or deleted, to obtain a copy of it, and to opt out of the sale
            or sharing of your personal information for targeted advertising. We do not sell personal
            information.
          </p>
          <p>
            Florida residents have these rights under the Florida Digital Bill of Rights. Residents of other
            states and countries may have similar rights under their own laws.
          </p>
          <p>
            To make a request, email{' '}
            <a href="mailto:info@frothycarwash.com" className="text-blue-600 hover:underline font-medium">
              info@frothycarwash.com
            </a>{' '}
            or call{' '}
            <a href="tel:+19545103073" className="text-blue-600 hover:underline font-medium">
              (954) 510-3073
            </a>
            . We may need to verify your identity before we act on a request, and we will not discriminate
            against you for exercising these rights.
          </p>
        </Section>

        <Section id="security" title="8. Security">
          <p>
            We take reasonable technical and organisational steps to protect your information, including serving
            this site over an encrypted HTTPS connection. No method of transmission or storage is completely
            secure, however, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section id="children" title="9. Children&rsquo;s Privacy">
          <p>
            Our website and services are intended for adults. We do not knowingly collect personal information
            from children under 13. If you believe a child has provided us with personal information, please
            contact us and we will delete it.
          </p>
        </Section>

        <Section id="third-party-links" title="10. Links to Other Sites">
          <p>
            Our site links to third-party services such as Google Maps, Google reviews, Instagram, and TikTok.
            We are not responsible for the privacy practices of those sites, and we encourage you to read their
            policies.
          </p>
        </Section>

        <Section id="changes" title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last
            updated&rdquo; date at the top of this page. Material changes will be made clear on this page.
          </p>
        </Section>

        <Section id="contact" title="12. Contact Us">
          <p>If you have any questions about this policy or how we handle your information, contact us:</p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3 not-prose">
            <p className="font-bold text-gray-900">Frothy Carwash Lounge</p>
            <a
              href="https://maps.google.com/?q=2223+Pembroke+Rd+Hollywood+FL+33020"
              data-analytics-event="get_directions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              2223 Pembroke Rd, Hollywood, FL 33020
            </a>
            <a
              href="tel:+19545103073"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              (954) 510-3073
            </a>
            <a
              href="mailto:info@frothycarwash.com"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              info@frothycarwash.com
            </a>
          </div>
          <p className="pt-4">
            <Link to="/contact" className="text-blue-600 hover:underline font-medium">
              Back to Contact &amp; Booking
            </Link>
          </p>
        </Section>
      </article>
    </main>
  )
}
