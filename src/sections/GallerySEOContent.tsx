import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'Are these photos from real customer vehicles?',
    answer:
      "Yes — every photo in our gallery is from an actual hand wash, detail, or ceramic coating job completed at Frothy Carwash Lounge in Hollywood, FL. We don't use stock photos; this is what your car will actually look like after a visit.",
  },
  {
    question: 'What types of vehicles do you work on?',
    answer:
      "Everything from daily-driver sedans and SUVs to luxury and exotic cars — our gallery includes everything from family vehicles to Porsches, Lamborghinis, and Bentleys. The hand wash and detailing process is tailored to the vehicle, but every car gets the same careful attention to detail.",
  },
  {
    question: 'Can I see before-and-after results for interior detailing?',
    answer:
      'Yes — filter the gallery by "Interior" to see real before-and-after results from our interior detailing services, including deep-cleaned upholstery, leather conditioning, and stain removal on heavily soiled seats.',
  },
  {
    question: 'Do you take photos of every car you service?',
    answer:
      "We photograph many of our jobs, especially full details, ceramic coatings, and notable before-and-afters, but not every single hand wash. If you'd like photos of your own car after a service, just let our team know when you check in and we're happy to snap a few for you.",
  },
  {
    question: 'Where can I leave a review or see more recent work?',
    answer:
      "You can leave a Google review directly from our homepage, and we regularly post recent jobs to our social channels in between gallery updates. If you've had work done at Frothy, we'd genuinely appreciate a review — it helps other Hollywood, FL drivers find us.",
  },
]

export default function GallerySEOContent() {
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
          Real results from Hollywood, FL hand washes &amp; details
        </h2>
        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            This gallery is a running record of the work we do every day at Frothy Carwash Lounge — hand washes, full interior and exterior details, ceramic coatings, and the lounge itself. Browse by category to see exactly what each service looks like before you book, whether you're curious about our hand wash process, want to see interior detailing transformations, or want a look at the fleet and luxury vehicles we regularly care for.
          </p>
          <p>
            Every photo here was taken on-site at our Hollywood, FL location at 2223 Pembroke Rd. We update the gallery regularly as new jobs come through, so it reflects the current quality and range of vehicles we service — from everyday commuter cars to Lamborghinis, Porsches, and Bentleys. If you don't see your exact make or model, rest assured the same hand-wash process and attention to detail applies to every vehicle that comes through our doors, regardless of size or price point.
          </p>
          <p>
            If you're trying to decide between a quick hand wash and a full detail, browsing by category here is a good way to see exactly what each level of service includes before you book. The "Hand Wash" category shows our exterior process from start to finish, "Full Detail" shows the deeper interior and exterior work, and "Fleet & Luxury" highlights the care we put into higher-end vehicles. When you're ready, you can head to our <Link to="/services" className="text-frothy-blue font-semibold hover:underline">services and pricing page</Link> to book the package that matches what you saw here.
          </p>
          <p>
            The "Our Lounge" category gives you a look at the space itself — the seating, the coffee bar, and the overall feel of the place — so you know what to expect while your car is being taken care of. Many first-time visitors tell us the lounge is what convinced them to try us over a closer automatic wash, and the gallery is the easiest way to see why before you ever pull in. New photos get added regularly, so check back if you want to see our latest work.
          </p>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
          Gallery FAQs
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
