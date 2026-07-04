import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function SmokeOdorRemoval() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Smoke Odor Removal in Hollywood, FL | Interior Car Detailing',
    description: 'Professional smoke odor removal from car interiors. Advanced odor elimination for former smoker vehicles and smoke-damaged cars.',
    canonical: '/smoke-odor-removal-hollywood-fl'
  })

  const faqs = [
    {
      q: `How long does smoke odor removal take?`,
      a: `Smoke odor removal typically takes 3-4 hours for comprehensive treatment. Severe cases with HVAC treatment may take longer. We provide a timeline during consultation.`
    },
    {
      q: `Will one treatment eliminate all smoke odors?`,
      a: `Most vehicles show dramatic odor elimination after one treatment. Severely smoke-damaged vehicles may benefit from a second treatment or ozone therapy.`
    },
    {
      q: `Is ozone treatment necessary?`,
      a: `Ozone treatment is not always necessary but works exceptionally well for severe, long-term smoke damage. It is an optional add-on for maximum results.`
    },
    {
      q: `Can you remove smoke odor from the air conditioning system?`,
      a: `Yes, our process includes professional treatment of your vehicle HVAC system and air vents to eliminate smoke smell from recirculated air.`
    },
    {
      q: `Is smoke odor removal worth it before selling my car?`,
      a: `Absolutely. Smoke odor significantly impacts resale value and is a major turnoff for buyers. Professional removal typically costs far less than the value it adds.`
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
          <h1 className="text-5xl font-bold mb-6">Smoke Odor Removal in Hollywood, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Professional smoke odor removal from car interiors. Advanced odor elimination for former smoker vehicles and smoke-damaged cars.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: "Smoke Odor Removal in Hollywood, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Smoke Odor Elimination</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Smoke odors embedded in your vehicle interior are notoriously difficult to remove. Whether your car is a former smoker vehicle you purchased, or you need to eliminate lingering smoke damage, Frothy Carwash Lounge in Hollywood, FL offers specialized smoke odor removal services. Our professional technicians use advanced enzymatic treatments and deep-cleaning techniques that permanently eliminate smoke odors rather than masking them.

Smoke particles penetrate deep into upholstery, carpets, air vents, and ventilation systems, creating persistent odors that standard cleaning cannot address. Our comprehensive approach targets odor at its source, breaking down smoke residue at the molecular level and neutralizing it completely.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Smoke Odor Removal Is Important</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">A smoke-filled vehicle is unpleasant for passengers, reduces resale value, and is a dealbreaker for potential buyers. Smoke odors also attract new smoke smells more readily, creating a cycle of odor buildup. Professional smoke odor removal is essential if you are selling your vehicle, need to restore air quality for family members with respiratory sensitivities, or simply want to enjoy your car without unpleasant smells. Our Hollywood location serves customers throughout South Florida who are reclaiming their vehicles from smoke damage.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Smoke Odor Removal Process</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Step 1: We assess the extent of smoke odor saturation with detailed interior inspection. Step 2: High-powered vacuuming removes smoke particles from all surfaces and carpets. Step 3: Deep enzymatic cleaning is applied to all upholstery, carpets, and interior surfaces to break down smoke residue. Step 4: The vehicle HVAC system and air vents are professionally treated to eliminate smoke smell from recirculated air. Step 5: Odor neutralizers are applied to complete the elimination process. For severe cases, ozone treatment may be recommended as an additional step.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Smoke Odor Removal Pricing & Options</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our basic smoke odor removal service starts at $149 for sedans and SUVs, including deep cleaning and enzymatic treatment of all interior surfaces. For severe smoke damage, our premium service includes HVAC system treatment and ozone treatment, starting at $249. Most vehicles show dramatic odor improvement after one service. We guarantee satisfaction or we will retreat your vehicle at no charge.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Smoke Damage Restoration</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Frothy Carwash Lounge provides comprehensive smoke odor removal that goes beyond cosmetic cleaning. We are committed to returning your vehicle interior to a fresh, clean state. Whether you are restoring a purchased vehicle or reclaiming your own car, our Hollywood team has the expertise and equipment to eliminate smoke odors permanently. Schedule your smoke odor removal appointment today.</p>
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

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Smoke Odor Removal" />
    </main>
  )
}