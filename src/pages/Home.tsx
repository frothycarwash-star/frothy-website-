import { useSEO } from '../hooks/useSEO'
import { Phone, Clock, MapPin, Sparkles, Shield, Coffee, Armchair, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'Do you use automated car washes or hand washing?',
    answer: 'We exclusively hand wash every vehicle. No automated brushes or machines touch your car. Our trained team provides careful, personalized care.'
  },
  {
    question: 'How often should I get my car detailed?',
    answer: 'We recommend a full detail every 6-12 months, depending on your vehicle\'s exposure to elements. Regular washes every 1-2 weeks maintain protection.'
  },
  {
    question: 'Is ceramic coating worth it?',
    answer: 'Yes. Ceramic coating provides 2-5 years of protection, reduces water spots, enhances shine, and makes maintenance easier. It\'s a smart investment.'
  },
  {
    question: 'Do you offer memberships for regular customers?',
    answer: 'Absolutely. Our Silver, Gold, and Platinum membership plans offer savings of 20-40% with unlimited monthly washes and exclusive member benefits.'
  },
  {
    question: 'Can I book same-day service?',
    answer: 'Yes, we accept walk-ins 7 days a week. You can also call (954) 510-3073 to book an appointment. Check our memberships for the best value.'
  }
]

const trustSignals = [
  { icon: Sparkles, title: 'Hand Wash Only', desc: 'No machine brushes. Just pure hand care.' },
  { icon: Shield, title: 'Safe for All Paint', desc: 'Gentle techniques protect your finish.' },
  { icon: Coffee, title: 'Premium Lounge', desc: 'Free espresso & coffee while you wait.' },
  { icon: Armchair, title: 'Massage Chairs', desc: 'Relax in comfort while we care for your car.' }
]

const services = [
  { name: 'Hand Car Wash', path: '/hand-car-wash-hollywood-fl', color: 'from-blue-50 to-blue-100', icon: '🚗' },
  { name: 'Ceramic Coating', path: '/ceramic-coating-hollywood-fl', color: 'from-purple-50 to-purple-100', icon: '✨' },
  { name: 'Car Detailing', path: '/car-detailing-hollywood-fl', color: 'from-amber-50 to-amber-100', icon: '🎯' },
  { name: 'Memberships', path: '/memberships', color: 'from-green-50 to-green-100', icon: '⭐' }
]

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Frothy Carwash Lounge',
  image: 'https://frothycarwash.com/images/hand-car-wash-hollywood-fl.webp',
  description: 'Premium hand car wash, ceramic coating & detailing in Hollywood, FL',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6500 Stirling Road',
    addressLocality: 'Hollywood',
    addressRegion: 'FL',
    postalCode: '33024',
    addressCountry: 'US'
  },
  telephone: '+19545103073',
  url: 'https://frothycarwash.com',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '19:00'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '340'
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Frothy Carwash Lounge',
  url: 'https://frothycarwash.com',
  logo: 'https://frothycarwash.com/logo.png',
  sameAs: [
    'https://www.facebook.com/frothycarwash',
    'https://www.instagram.com/frothycarwash'
  ]
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://frothycarwash.com',
  name: 'Frothy Carwash Lounge',
  description: 'Premium hand car wash in Hollywood, FL'
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

export default function Home() {
  useSEO({
    title: 'Premium Hand Car Wash in Hollywood, FL | Frothy Carwash Lounge',
    description: 'Premium hand car wash, ceramic coating & detailing in Hollywood, FL. No machine brushes. Free lounge with espresso, massage chairs & AC. Serving South Florida.',
    canonical: '/',
  })

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900" style={{
        backgroundImage: `linear-gradient(135deg, rgba(10, 30, 60, 0.75) 0%, rgba(25, 50, 100, 0.65) 100%), url('/images/white-mercedes-amg-g63-front-view.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/70 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 w-full py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/60 rounded-full px-4 py-2 mb-6 text-blue-300 text-sm font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                HOLLYWOOD, FL - OPEN 7 DAYS
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                Hand Car Wash,<br />
                Auto Detailing &<br />
                <span className="text-yellow-300">Ceramic Coating</span> in<br />
                <span className="text-yellow-300">Hollywood, FL</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-lg font-light">
                Where clean cars meet good company. Specialty coffee and a lounge worth lingering in — pull up, settle in, and enjoy the atmosphere while we take care of your car.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="tel:+19545103073" className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-all hover:shadow-lg transform hover:scale-105">
                  <Phone className="w-5 h-5" /> Book Now
                </a>
                <Link to="/memberships" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                  See Pricing <span>→</span>
                </Link>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
                <span className="text-white font-bold text-lg">5.0</span>
                <span className="text-gray-200">Trusted by Hollywood locals</span>
              </div>
            </div>

            {/* Right Card - Full Steam Ahead */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/80 backdrop-blur-md border border-gray-600/40 rounded-2xl p-10 text-white shadow-2xl">
                <h3 className="text-3xl font-bold text-yellow-300 mb-2">Full Steam Ahead™</h3>
                <p className="text-gray-300 text-base mb-8 font-light">Hand Wash • Coffee • Lounge</p>

                {/* Pricing */}
                <div className="mb-10 pb-10 border-b border-gray-600/50">
                  <p className="text-yellow-300 font-bold text-lg mb-2">Exterior Wash from <span className="text-3xl">$25</span></p>
                  <p className="text-yellow-300 font-bold text-lg">Details from <span className="text-3xl">$65</span></p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-3">100%</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Hand Wash</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-3">7</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Days/Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-3">3</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Ceramic Tiers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Facts Section */}
      <section className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">6500 Stirling Road</p>
              <p className="font-bold text-gray-900">Hollywood, FL 33024</p>
            </div>
            <div>
              <Phone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Call anytime</p>
              <p className="font-bold text-gray-900">(954) 510-3073</p>
            </div>
            <div>
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Open 7 days</p>
              <p className="font-bold text-gray-900">8:00 AM - 7:00 PM</p>
            </div>
            <div>
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Walk-ins</p>
              <p className="font-bold text-gray-900">Welcome every day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Frothy */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Frothy Carwash?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals.map((signal) => {
              const Icon = signal.icon
              return (
                <div key={signal.title} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{signal.title}</h3>
                  <p className="text-sm text-gray-700">{signal.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className={`bg-gradient-to-br ${service.color} p-8 rounded-lg text-center hover:shadow-lg transition-all transform hover:-translate-y-1`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">We Serve All of South Florida</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">From Hollywood to North Miami Beach, we bring premium hand car wash to your neighborhood.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-2">
              <p className="text-gray-700">• Hollywood & Hallandale Beach</p>
              <p className="text-gray-700">• Aventura & Dania Beach</p>
              <p className="text-gray-700">• Pembroke Pines & Fort Lauderdale</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">• Davie & Cooper City</p>
              <p className="text-gray-700">• Sunny Isles & North Miami Beach</p>
              <p className="text-gray-700">• And surrounding areas</p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/areas-we-serve" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white p-6 rounded-lg border border-blue-100 hover:border-blue-300 cursor-pointer group">
                <summary className="font-bold text-gray-900 group-hover:text-blue-600 flex items-center justify-between">
                  {faq.question}
                  <span className="text-blue-600 ml-4">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for the Frothy Experience?</h2>
          <p className="text-lg text-blue-100 mb-8">Visit us today or check out our membership plans for the best savings.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+19545103073" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              Call Us Now
            </a>
            <Link to="/memberships" className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              View Memberships
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
