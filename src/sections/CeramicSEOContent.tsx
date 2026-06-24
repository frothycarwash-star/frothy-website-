const faqs = [
  {
    question: 'How long does ceramic coating last?',
    answer:
      "It depends on the tier. Our entry-level spray sealant lasts a few months to a year with proper care. Our professionally applied coatings are rated for 1, 3, or 5 years of protection — the 3-year and 5-year packages are the most popular because they hold up well to Hollywood's sun, salt air, and seasonal rain.",
  },
  {
    question: 'Is ceramic coating worth it for a daily driver?',
    answer:
      "Yes. Daily drivers face the most exposure to UV rays, road grime, and water spots, which is exactly what ceramic coating protects against. Many of our Hollywood, FL customers choose the 1-year or 3-year package specifically because they park outdoors and want to cut down on how often they need a full wash.",
  },
  {
    question: 'Does ceramic coating replace regular car washes?',
    answer:
      'No — ceramic coating makes washing easier and less frequent, but it does not eliminate the need for it. A coated car still needs regular hand washes to remove dirt and brake dust; the coating just means water and grime sheet off more easily and the paint resists staining and etching in between washes.',
  },
  {
    question: 'How much does ceramic coating cost in Hollywood, FL?',
    answer:
      'Our ceramic coating packages range from $149 for a spray-applied sealant up to $899–$1,499 for our 5-year, full-vehicle package with wheel and glass coating included. Most customers land in the $299–$699 range for 1 to 3 years of protection. Call (954) 510-3073 for an exact quote based on your vehicle.',
  },
]

export default function CeramicSEOContent() {
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
          Ceramic coating in Hollywood, FL — built for South Florida weather
        </h2>
        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            South Florida is one of the toughest climates in the country for car paint. Intense year-round UV exposure breaks down clear coat and fades color, salt air from the coast accelerates oxidation, and sudden summer downpours leave hard water spots that etch into unprotected paint. Ceramic coating creates a sacrificial, hydrophobic barrier on top of your factory paint that takes the damage instead of your clear coat — which is why it has become the standard upgrade for Hollywood, FL drivers who park outdoors.
          </p>
          <p>
            At Frothy Carwash Lounge, every ceramic coating job starts with a full paint decontamination and, for our 3-year and 5-year packages, a multi-stage paint correction to remove existing swirl marks and light scratches before the coating ever touches the surface. That prep work is what separates a coating that lasts years from one that fails after a few months — applying ceramic over dirty or contaminated paint is the most common reason DIY and budget coatings don&apos;t hold up.
          </p>
          <p>
            We see the most demand for ceramic coating from three types of customers: daily commuters who park outside and want fewer washes, owners of newer or weekend cars who want to protect their investment, and luxury and exotic car owners who want the deepest possible gloss along with protection. Whichever category you fall into, our team will recommend the right tier for your vehicle, your parking situation, and your budget — there&apos;s no upsell pressure, just an honest read on what will actually protect your paint.
          </p>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
          Ceramic Coating FAQs
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
