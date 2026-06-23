import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'How much does a hand car wash cost in Hollywood, FL?',
    answer:
      "Our hand wash packages start at $25 for an exterior-only wash, with our popular Inside & Out package at $40 and our Signature Detail at $65. Ceramic coating packages range from $149 to $899 depending on the tier and length of protection. You can see full current pricing on our Services page.",
  },
  {
    question: 'Do I need an appointment, or can I walk in?',
    answer:
      'Walk-ins are always welcome at Frothy Carwash Lounge, 7 days a week from 8 AM to 7 PM. If you want to guarantee a specific time slot — especially for a full detail or ceramic coating — booking ahead online or by phone is recommended, but it is never required for a standard hand wash.',
  },
  {
    question: 'How long does a hand wash or full detail take?',
    answer:
      'A standard exterior hand wash typically takes 15 to 20 minutes. Our Inside & Out package runs about 35 minutes, and a full Signature Detail takes roughly an hour. Ceramic coating appointments take longer — generally a few hours to a full day depending on the package — so we recommend booking those in advance.',
  },
  {
    question: 'Is hand washing actually better than an automatic tunnel wash?',
    answer:
      "Yes. Automatic tunnel washes use the same brushes and cloth strips on every car that passes through, which picks up grit and can cause fine scratches over time. Hand washing with fresh microfiber towels and car-safe soap is gentler on paint and gets into tight spots — mirrors, door jambs, wheel wells — that a machine simply can't reach.",
  },
  {
    question: 'What areas does Frothy Carwash Lounge serve?',
    answer:
      'We&rsquo;re based in Hollywood, FL and regularly serve customers from Hallandale Beach, Aventura, Dania Beach, and Pembroke Pines. Most of our customers from these areas are within a 10 to 20 minute drive. See our location pages for directions from each city.',
  },
  {
    question: 'Do you offer memberships or recurring wash plans?',
    answer:
      'Yes — we offer Silver, Gold, and Platinum monthly memberships starting at $119/mo, each including a set number of hand washes or details per month plus member-only perks like priority scheduling. Memberships are popular with daily commuters and anyone who wants their car looking great without thinking about it every week.',
  },
]

export default function HomeSEOContent() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace('&rsquo;', "'"),
      },
    })),
  }

  return (
    <section className="section-padding bg-frothy-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Hand Car Wash in Hollywood, FL
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl text-frothy-navy leading-tight mb-6">
          Hollywood&apos;s premium hand car wash, detailing &amp; lounge
        </h2>

        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            Frothy Carwash Lounge is a hand car wash, detailing studio, and coffee lounge located at 2223 Pembroke Rd in Hollywood, FL. Unlike the automatic tunnel washes scattered along Federal Highway and I-95, every vehicle that comes through our doors is washed entirely by hand — no machines, no brushes, no shortcuts. We built Frothy because Hollywood drivers deserve better than sitting in a hot car while a machine sprays it down. Here, you hand over the keys, grab a coffee, and relax in an actual lounge while our team takes care of the rest.
          </p>
          <p>
            Our core hand wash service starts at $25 and includes a full exterior wash, wheel cleaning, and hand dry — done carefully enough that even owners of newer cars and weekend exotics trust us with their paint. For drivers who want more, our Inside &amp; Out package ($40) adds a full interior clean, and our Signature Detail ($65) goes further with a deep clean, UV protection, and spray wax for a showroom-fresh finish that lasts.
          </p>
          <p>
            Ceramic coating is where Frothy really sets itself apart from a typical Hollywood, FL car wash. Our ceramic coating packages — ranging from $149 to $899 depending on the protection tier — create a hydrophobic, UV-resistant barrier that keeps South Florida&apos;s sun, salt air, and rain spots from damaging your clear coat. It&apos;s a popular upgrade for anyone who parks outdoors regularly or wants their car to hold its value and shine for years rather than months.
          </p>
          <p>
            What makes Frothy different from other car washes near Hollywood isn&apos;t just the hand wash — it&apos;s the experience around it. Our indoor lounge has comfortable seating, free Wi-Fi, and specialty coffee, so the 15 to 60 minutes your car is being washed feels like a break in your day instead of a chore. We&apos;re not a chain, and we&apos;re not trying to move cars through as fast as possible. We&apos;re a neighborhood spot that wants you to come back — and most of our customers do, which is why our monthly memberships (Silver, Gold, and Platinum, starting at $119/mo) have become one of the most popular ways people wash their car in Hollywood.
          </p>
          <p>
            While we&apos;re based in Hollywood, FL, we regularly serve drivers from <Link to="/car-wash-hallandale-beach-fl" className="text-frothy-blue font-semibold hover:underline">Hallandale Beach</Link>, <Link to="/car-wash-aventura-fl" className="text-frothy-blue font-semibold hover:underline">Aventura</Link>, <Link to="/car-wash-dania-beach-fl" className="text-frothy-blue font-semibold hover:underline">Dania Beach</Link>, and <Link to="/car-wash-pembroke-pines-fl" className="text-frothy-blue font-semibold hover:underline">Pembroke Pines</Link> — most of whom are within a 10 to 20 minute drive. Whether you need a quick <Link to="/hand-car-wash-hollywood-fl" className="text-frothy-blue font-semibold hover:underline">hand wash</Link>, a full <Link to="/car-detailing-hollywood-fl" className="text-frothy-blue font-semibold hover:underline">detail</Link>, or <Link to="/ceramic-coating-hollywood-fl" className="text-frothy-blue font-semibold hover:underline">ceramic coating</Link>, Frothy is open seven days a week from 8 AM to 7 PM, and walk-ins are always welcome.
          </p>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="bg-white rounded-xl shadow-card p-5">
              <h3 className="text-frothy-navy font-bold text-base mb-2">{item.question}</h3>
              <p
                className="text-frothy-navy/70 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
