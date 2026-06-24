const faqs = [
  {
    question: 'What is the difference between a hand wash and a full detail?',
    answer:
      'A hand wash (Exterior Wash or Inside & Out) focuses on a clean exterior, wheels, and a basic interior vacuum — it takes 15 to 35 minutes. A full detail (Signature Detail, Executive Finish, Full Detail, or Showroom Detail) goes much deeper, including shampooing, leather conditioning, clay bar decontamination, and paint correction depending on the package, and can take one to several hours.',
  },
  {
    question: 'Do you offer different pricing for SUVs and trucks?',
    answer:
      'Yes. SUVs and trucks have more surface area and interior space, so most of our services have a slightly higher price for larger vehicles. You can toggle between sedan and SUV/truck pricing at the top of this page to see accurate pricing for your vehicle before booking.',
  },
  {
    question: 'How often should I get a full detail versus a hand wash?',
    answer:
      "Most of our Hollywood, FL customers get a hand wash every one to two weeks to keep their car looking clean day-to-day, and a full detail every one to three months for a deeper clean, especially after road trips, beach trips, or heavy interior use. If you drive daily or park outdoors, our memberships make regular hand washes more affordable.",
  },
  {
    question: 'Can I add ceramic coating to any service?',
    answer:
      "Ceramic coating is typically booked as its own appointment since it requires its own paint prep and curing time, but you can absolutely combine a Showroom Detail with a ceramic coating package for the ultimate refresh. Call (954) 510-3073 and our team will help you schedule both.",
  },
]

export default function ServicesSEOContent() {
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-4">
          Hand car wash &amp; detailing services in Hollywood, FL
        </h2>
        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            Every service on this page is performed entirely by hand by our team in Hollywood, FL — there are no automatic tunnels, spinning brushes, or conveyor belts involved. That distinction matters because automated washes use the same brushes and cloth strips on every vehicle that passes through, which can introduce fine scratches and swirl marks over time. Hand washing with fresh microfiber towels and car-safe products is gentler on your paint and reaches tight spots — mirrors, door jambs, wheel wells — that machines simply can't get to.
          </p>
          <p>
            We've structured our services in tiers so you can pick exactly the level of care your car needs. A quick Exterior Wash or Inside &amp; Out package is perfect for routine upkeep between deeper cleans, while our Signature Detail, Executive Finish, and Full Detail packages are built for drivers who want a true deep clean — UV protection, leather conditioning, clay bar decontamination, and more. Our top-tier Showroom Detail adds paint correction and ceramic sealants for a finish that looks like the day you drove it off the lot.
          </p>
          <p>
            If your car needs something specific — pet hair removal, headlight restoration, engine bay cleaning, or fleet pricing for multiple vehicles — our add-on menu covers it. You can tap any add-on above to request it directly, or call ahead at (954) 510-3073 if you're not sure which combination of services is right for your car.
          </p>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
          Services &amp; Pricing FAQs
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
