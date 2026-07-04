import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function CarWashDavie() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Professional Car Wash in Davie, FL | Premium Vehicle Detailing',
    description: 'Expert car washing and detailing services in Davie, FL. Hand wash, interior cleaning, and protective coatings.',
    canonical: '/car-wash-davie-fl'
  })

  const faqs = [
    {
      q: `How does humidity affect my car finish in Davie?`,
      a: `High humidity promotes water spotting, mineral deposits, and mold growth on vehicles. Regular professional washing and protective coatings help prevent issues.`
    },
    {
      q: `What protection do I need for my Davie vehicle?`,
      a: `We recommend regular washing every 1-2 weeks, plus wax or ceramic coating treatment. These protective layers shield your paint from salt air, UV, and humidity.`
    },
    {
      q: `Is the Gold membership sufficient for Davie weather?`,
      a: `For most Davie drivers, Gold membership ($79.99/month) provides ideal protection with unlimited washes and monthly wax treatment.`
    },
    {
      q: `Do you offer interior protection for Davie humidity?`,
      a: `Yes, we offer interior protection treatments that help resist mold, mildew, and moisture damage—important for Davie humid climate.`
    },
    {
      q: `How can I prevent water spotting on my Davie vehicle?`,
      a: `Our spot-free water rinse system and protective coatings significantly reduce water spotting. Regular washing maintains the best appearance.`
    }
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script type="application/ld+json">{`${JSON.stringify(faqSchema)}`}</script>

      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Premium Hand Car Wash in Davie, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Expert car washing and detailing services in Davie, FL. Hand wash, interior cleaning, and protective coatings.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setBookingOpen(true)} className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300">
              Book Now
            </button>
            <a href="tel:+19545103073" className="bg-white/20 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30">
              <Phone className="w-4 h-4 inline mr-2" /> Call (954) 510-3073
            </a>
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-700" />

      <div className="bg-white py-4 px-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Locations", path: "/areas-we-serve" }, { label: "Premium Hand Car Wash in Davie, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Car Wash in Davie, FL</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Davie residents deserve professional car care that protects their vehicles from South Florida challenging climate. Frothy Carwash Lounge provides premium hand washing and detailing services conveniently located near Davie. Our expert technicians combine hand-washing precision with superior products to deliver results that keep your Davie-area vehicle looking pristine.

Davie proximity to Fort Lauderdale, combined with its tropical climate, means vehicles face intense UV exposure, salt air from the Atlantic, and high humidity. These environmental factors make professional, regular car washing essential for preserving your vehicle appearance and protecting your investment from premature aging.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Davie Vehicle Owners Choose Professional Car Washing</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Davie climate and location create specific challenges for vehicle maintenance. Salt-laden air, intense sun exposure, and high humidity accelerate paint oxidation, cause water spotting, and degrade protective coatings. Professional car washing addresses these challenges directly, removing contaminants before they damage your paint. Our Davie customers appreciate our convenient location and commitment to protecting their vehicles from South Florida harsh conditions. Whether you own a luxury vehicle requiring careful handling or a daily driver needing protection, we have the expertise to serve you.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Davie Car Wash Service</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our premium hand wash service includes complete exterior washing with pH-balanced, eco-friendly soaps that protect clear coat, detailed wheel cleaning, undercarriage rinse, and spot-free water final rinse. Interior services include thorough vacuuming, interior surface cleaning, window treatment, and optional air freshening. We also offer ceramic coating applications, wax treatments, and interior protection services specifically designed to combat Davie environmental challenges. Each service is performed with meticulous attention to detail.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Davie Membership Options</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our Silver membership ($39.99/month) provides two full washes and two exterior touch-ups monthly—perfect for basic Davie vehicle maintenance. Gold membership ($79.99/month) offers unlimited washes, monthly wax treatment, and monthly detail service. Platinum membership ($119.99/month) includes all benefits plus ceramic-enhanced protection and priority scheduling. For Davie residents washing frequently, memberships provide exceptional value while ensuring your vehicle receives consistent professional care.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Davie Drivers Trust Frothy Carwash Lounge</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our Davie-area customers appreciate our commitment to quality, convenient location, and expertise in protecting vehicles from South Florida climate. We use only premium products selected for their effectiveness in tropical environments. Our team stays current with latest detailing techniques and protective coating technology. From quick washes to comprehensive detail services, we are committed to keeping your Davie vehicle looking showroom-fresh. Visit us today.</p>
        </section>

        <section className="mb-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-gray-300 rounded-lg p-4">
                <summary className="font-bold cursor-pointer text-gray-900 hover:text-blue-600">{faq.q}</summary>
                <p className="mt-3 text-gray-700 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Book Your Appointment?</h2>
          <button onClick={() => setBookingOpen(true)} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 inline-flex items-center gap-2">
            Book Now <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Related Services & Links</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/services" className="text-blue-600 hover:text-blue-700 font-semibold">View All Services</a>
            <a href="/memberships" className="text-blue-600 hover:text-blue-700 font-semibold">Monthly Memberships</a>
            <a href="/ceramic" className="text-blue-600 hover:text-blue-700 font-semibold">Ceramic Coating</a>
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact Us</a>
            <a href="/gallery" className="text-blue-600 hover:text-blue-700 font-semibold">View Gallery</a>
            <a href="/areas-we-serve" className="text-blue-600 hover:text-blue-700 font-semibold">Service Areas</a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Car Wash" />
    </main>
  )
}