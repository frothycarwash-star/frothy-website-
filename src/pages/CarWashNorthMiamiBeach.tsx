import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function CarWashNorthMiamiBeach() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Professional Car Wash in North Miami Beach, FL | Expert Auto Detailing',
    description: 'Premium hand car wash and detailing in North Miami Beach. Professional auto care and ceramic coating services.',
    canonical: '/car-wash-north-miami-beach-fl'
  })

  const faqs = [
    {
      q: `What is the best protection for North Miami Beach salt spray?`,
      a: `Ceramic coating provides superior salt-spray protection, lasting 1-5 years. It is the most effective protection available and highly recommended.`
    },
    {
      q: `How often should North Miami Beach vehicles be washed?`,
      a: `Due to salt spray exposure, we recommend at least weekly washing, more frequently if your vehicle is parked near the beach.`
    },
    {
      q: `Does undercarriage protection help beachside vehicles?`,
      a: `Yes, salt corrodes undercarriage components. Our undercarriage rinse service removes salt deposits and helps prevent mechanical corrosion.`
    },
    {
      q: `Is Gold or Platinum membership better for North Miami Beach?`,
      a: `Platinum ($119.99/month) provides ideal beachside protection. Gold ($79.99/month) works for less-exposed vehicles.`
    },
    {
      q: `Can I prevent salt damage if I park near the beach?`,
      a: `Professional washing combined with ceramic coating or wax treatment provides excellent protection. Regular maintenance is essential.`
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
          <h1 className="text-5xl font-bold mb-6">Premium Hand Car Wash in North Miami Beach, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Premium hand car wash and detailing in North Miami Beach. Professional auto care and ceramic coating services.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Locations", path: "/areas-we-serve" }, { label: "Premium Hand Car Wash in North Miami Beach, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Car Wash in North Miami Beach, FL</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">North Miami Beach drivers can trust Frothy Carwash Lounge for expert car washing and detailing that protects their vehicles from the beachside environment unique challenges. Our hand-washing approach, combined with premium protective products, delivers results that automated car washes cannot match. We serve North Miami Beach residents and surrounding communities with professional expertise and commitment to vehicle protection.

North Miami Beach proximity to the Atlantic Ocean exposes vehicles to salt-laden air, intense UV radiation, and high humidity. These environmental factors make professional car washing not just a luxury, but essential maintenance for preserving your vehicle finish, mechanical components, and resale value.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">North Miami Beach Environmental Challenges & Solutions</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Located on Miami Beach northern shores, North Miami Beach vehicles face some of South Florida most severe environmental challenges. Salt spray from the Atlantic accelerates paint oxidation and undercarriage corrosion. UV intensity is intense year-round, fading paint and degrading protective coatings. Humidity promotes water spotting, mineral deposits, and algae growth. Professional car washing directly addresses these challenges by removing contaminants and applying protective treatments. Our North Miami Beach customers appreciate our expertise in coastal vehicle protection and convenient location serving their beachside community.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our North Miami Beach Car Wash Service</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our premium service includes complete hand washing with salt-neutralizing soaps, detailed wheel cleaning, thorough undercarriage rinse, and protective shine application. Interior services include vacuuming, cleaning, window treatment, and odor elimination. We strongly recommend ceramic coating for North Miami Beach vehicles due to intense salt and UV exposure—it provides superior, long-lasting protection. Our technicians assess your vehicle specific exposure and recommend personalized care schedules. Each service reflects our commitment to protecting North Miami Beach vehicles from coastal damage.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Beachside Protection: Membership & Ceramic Options</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our Gold membership ($79.99/month) provides unlimited washes and monthly wax treatment—good protection for North Miami Beach. Platinum membership ($119.99/month) adds premium detailing and ceramic-enhanced treatments for maximum coastal protection. Ceramic coating applications ($249-399) provide 1-5 years of superior protection against salt spray and UV. For North Miami Beach residents with exposed vehicles like convertibles or vehicles parked near the beach, ceramic coating is one of the best investments.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why North Miami Beach Drivers Trust Frothy Carwash Lounge</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Frothy Carwash Lounge combines professional expertise with premium products specifically selected for coastal protection. Our North Miami Beach team understands the specific challenges you face and provides targeted solutions. We are committed to preserving your vehicle finish and value while delivering exceptional results. Whether you need routine washing or comprehensive coastal protection services, we are here to serve North Miami Beach drivers. Visit us today.</p>
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