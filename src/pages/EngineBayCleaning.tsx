import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function EngineBayCleaning() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Engine Bay Cleaning in Hollywood, FL | Professional Auto Detailing',
    description: 'Professional engine bay cleaning and detailing. Degreasing, pressure washing, and shine restoration for vehicle engines.',
    canonical: '/engine-bay-cleaning-hollywood-fl'
  })

  const faqs = [
    {
      q: `Is engine bay cleaning safe for my vehicle?`,
      a: `Yes, professional engine bay cleaning is completely safe when performed by trained technicians. We use low-pressure zones around electrical components and sensitive areas.`
    },
    {
      q: `How often should I get my engine bay cleaned?`,
      a: `We recommend engine bay cleaning every 12-18 months for regular drivers, or more frequently if you notice significant grease buildup.`
    },
    {
      q: `Will engine bay cleaning improve engine performance?`,
      a: `While cleaning will not improve performance, a clean engine runs cooler. Grime buildup can trap heat, so cleaning helps optimize operating conditions.`
    },
    {
      q: `How long does engine bay cleaning take?`,
      a: `Most engine bay cleanings take 1-2 hours depending on vehicle size and buildup severity. We provide accurate timeline based on your specific vehicle.`
    },
    {
      q: `Can you clean the engine detail parts like the air filter housing?`,
      a: `Yes, our detailed engine bay cleaning includes all accessible areas and components. We focus on safety around sensitive electrical and mechanical parts.`
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
          <h1 className="text-5xl font-bold mb-6">Engine Bay Cleaning in Hollywood, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Professional engine bay cleaning and detailing. Degreasing, pressure washing, and shine restoration for vehicle engines.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: "Engine Bay Cleaning in Hollywood, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Engine Bay Cleaning & Detailing</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">A clean engine bay is a sign of a well-maintained vehicle and significantly impacts your car overall appearance. Engine bay cleaning by Frothy Carwash Lounge in Hollywood, FL restores shine and cleanliness to one of your vehicle most visible areas. Our professional technicians use specialized degreasing solutions, safe pressure washing techniques, and protective shine treatments to transform a grimy engine bay.

Over time, engine bays accumulate grease, dirt, oil residue, and grime that not only looks unsightly but can potentially trap heat and reduce engine efficiency. Our comprehensive engine bay cleaning process removes all buildup while protecting sensitive engine components and electrical connections.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Engine Bay Cleaning Matters</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Engine bay cleanliness is often overlooked, but it is one of the most visible areas when someone opens your hood. A clean engine bay increases resale value, makes vehicle inspections look better, and demonstrates attentive maintenance. It also helps you spot potential issues more easily since they are visible against a clean surface. Professional engine bay cleaning is essential before selling your vehicle, preparing it for inspection, or maintaining peak presentation standards. Our Hollywood location serves customers who take pride in their vehicle complete appearance.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Engine Bay Cleaning Process</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Step 1: We carefully remove loose debris and larger contaminants from the engine bay. Step 2: A specialized degreaser is applied to all engine surfaces to break down accumulated grease and oil. Step 3: High-pressure washing is performed at safe distances and angles to avoid damaging sensitive components. Step 4: Engine bay components are dried thoroughly to prevent corrosion. Step 5: A protective shine treatment is applied to give your engine bay a like-new appearance while providing protection against future buildup. For heavily soiled engines, additional detailed scrubbing may be recommended.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Engine Bay Cleaning Pricing & Booking</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our engine bay cleaning service starts at $99 for standard vehicles and increases based on engine size and grime severity. This includes full degreasing, pressure washing, drying, and shine treatment. For heavily soiled engines or those requiring additional detailed work, we offer enhanced packages starting at $149. Most engine bay cleanings are completed within 1-2 hours. Schedule your appointment today.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Care for Your Engine Bay</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">At Frothy Carwash Lounge, we combine technical knowledge with attention to detail to safely clean even the most heavily soiled engine bays. Our technicians understand which areas are sensitive and which can handle more aggressive cleaning. We are committed to protecting your vehicle engine while delivering showroom-quality results. Whether you are preparing to sell, maintaining a prized vehicle, or simply want your engine bay to look pristine, our Hollywood team is here to help.</p>
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

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Engine Bay Cleaning" />
    </main>
  )
}