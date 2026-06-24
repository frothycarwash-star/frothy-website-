const faqs = [
  {
    question: 'Which Frothy membership plan is right for me?',
    answer:
      'If you want a clean car every week without thinking about it, Silver covers two full Inside & Out washes a month plus two exterior-only touch-ups. Gold adds wax protection and a monthly Signature Detail, and is our most popular plan for weekly drivers. Platinum is built for luxury and exotic car owners who want VIP priority and a monthly Executive Finish detail.',
  },
  {
    question: 'How does billing work for car wash memberships?',
    answer:
      'Memberships are billed monthly through Square with a card on file — there are no long-term contracts and you can cancel anytime. Unused visits do not roll over to the next month, since each plan is priced around a set number of monthly washes and details.',
  },
  {
    question: 'Can I use my membership on more than one vehicle?',
    answer:
      'Memberships are tied to a single vehicle, since pricing is based on sedan or SUV/truck size. If you have multiple cars in your household, many of our members sign up for a separate plan for each vehicle — ask our team about multi-car discounts when you sign up in person.',
  },
  {
    question: 'Is ceramic coating included in any membership?',
    answer:
      "Ceramic coating is not included in monthly memberships since it's a separate, longer-lasting service, but members get a discount when booking it separately. Many members start with a Silver or Gold plan for regular washing and add a ceramic coating package once or twice a year for extra protection.",
  },
]

export default function MembershipsSEOContent() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div className="bg-frothy-cream pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-4">
          Why Hollywood, FL drivers choose a Frothy membership
        </h2>
        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            A car wash membership only makes sense if it actually saves you money and time, so we built our Silver, Gold, and Platinum plans around real usage patterns rather than arbitrary perks. Every plan bundles a set number of full hand washes and details each month at a meaningful discount off our walk-in pricing — Gold members, for example, save roughly $106 a month compared to paying for the same services individually.
          </p>
          <p>
            Beyond the savings, membership means you never have to think about scheduling a wash around your week. With priority scheduling on Gold and Platinum plans, members skip the regular line and get in and out faster, which matters most for daily commuters and anyone juggling a tight calendar. Your membership also locks in current pricing, so you're protected if our walk-in rates change.
          </p>
          <p>
            Memberships work for both sedans and SUVs/trucks, with a flat pricing adjustment for larger vehicles, and there are no long-term contracts — you can cancel anytime through Square. Whether you're a daily commuter near Hollywood, FL or a weekend driver who wants their car looking sharp every time they take it out, there's a plan built for how you actually use your car.
          </p>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
          Membership FAQs
        </h2>
        <div className="space-y-5 mb-4">
          {faqs.map((item) => (
            <div key={item.question} className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-heading text-lg text-frothy-navy mb-2">{item.question}</h3>
              <p className="text-frothy-navy/70 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
