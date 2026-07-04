import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function CarWashSunnyIsles() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Professional Car Wash in Sunny Isles, FL | Premium Hand Car Detailing',
    description: 'Expert car washing and detailing in Sunny Isles. Professional auto care and protective coating services.',
    canonical: '/car-wash-sunny-isles-fl'
  })

  const faqs = [
    {
      q: `How does salt air damage my car more than inland vehicles?`,
      a: `Salt spray directly contacts your paint, causing rapid oxidation and corrosion. Sunny Isles vehicles need more frequent washing and stronger protection.`
    },
    {
      q: `Is ceramic coating worth it for my Sunny Isles car?`,
      a: `Absolutely. Ceramic coating provides superior salt-spray and UV protection, lasting 1-5 years. For Sunny Isles vehicles, it is one of the best protection investments.`
    },
    {
      q: `How often should I wash my Sunny Isles car?`,
      a: `We recommend at least weekly washing for Sunny Isles vehicles, more frequently if exposed to direct salt spray. Our memberships make regular washing convenient.`
    },
    {
      q: `Will undercarriage treatment help protect my Sunny Isles vehicle?`,
      a: `Yes, salt accumulates on undercarriage components and causes corrosion. Our undercarriage rinse service removes salt deposits.`
    },
    {
      q: `Which membership is best for Sunny Isles protection?`,
      a: `Platinum membership ($119.99/month) provides ideal protection with unlimited washes and premium treatments. Gold works for budget-conscious drivers.`
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
          <h1 className="text-5xl font-bold mb-6">Premium Hand Car Wash in Sunny Isles, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Expert car washing and detailing in Sunny Isles. Professional auto care and protective coating services.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Locations", path: "/areas-we-serve" }, { label: "Premium Hand Car Wash in Sunny Isles, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Car Wash in Sunny Isles, FL</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Sunny Isles residents deserve the finest car washing and detailing services to protect their vehicles in a beachside environment. Frothy Carwash Lounge serves the Sunny Isles community with premium hand-washing expertise and professional detailing that maintains your vehicle showroom appearance. Our team specializes in protecting luxury and standard vehicles from Sunny Isles unique coastal and tropical challenges.

Sunny Isles beachside location creates exceptional challenges for vehicle maintenance. Salt spray, intense UV exposure, and humidity can rapidly degrade paint and cause oxidation. Our professional car washing services protect your Sunny Isles vehicle with specialized products and techniques designed for coastal environments.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sunny Isles Coastal Environment & Vehicle Care</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">As a beachside community, Sunny Isles vehicles face more severe salt exposure than inland areas. Salt spray accelerates paint oxidation, corrodes undercarriage components, and degrades protective coatings. Combined with intense year-round UV and high humidity, Sunny Isles vehicles require more frequent professional care than standard environments. Our services are specifically designed to address these coastal challenges, protecting your vehicle finish and mechanical components. Sunny Isles residents who invest in regular professional car care preserve their vehicle appearance and value far better than those using only automatic car washes.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Sunny Isles Car Wash Service</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our premium service for Sunny Isles includes complete hand washing with coastal-specific soaps that neutralize salt residue, detailed wheel cleaning, undercarriage rinse to remove salt deposits, and protective shine treatment. Interior services include vacuuming, cleaning, window treatment, and odor elimination. We strongly recommend ceramic coating for Sunny Isles vehicles—it provides superior protection against salt spray and UV damage. Our technicians are experienced with the specific needs of coastal vehicles and provide guidance on maintenance frequency.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Platinum Protection for Sunny Isles Vehicles</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">For Sunny Isles drivers serious about vehicle protection, our Platinum membership ($119.99/month) is an ideal investment. It includes unlimited hand washes, monthly ceramic-enhanced detail service, priority scheduling, and access to our premium protective treatments. Platinum members receive personalized recommendations for their specific vehicles and enjoy maximum convenience. Many Sunny Isles luxury vehicle owners choose Platinum as essential vehicle maintenance that preserves their investment.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Sunny Isles Residents Choose Frothy Carwash Lounge</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Frothy Carwash Lounge brings expertise and premium products specifically chosen for coastal vehicle protection. Our Sunny Isles customers appreciate our commitment to excellence, convenient service, and expertise in combating salt air and UV damage. From quick refreshing washes to comprehensive detail services, we protect your Sunny Isles vehicle with professional-grade care. Experience the difference professional coastal car care makes today.</p>
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