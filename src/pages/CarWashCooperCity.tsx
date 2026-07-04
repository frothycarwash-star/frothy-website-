import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function CarWashCooperCity() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Professional Car Wash in Cooper City, FL | Hand Car Detailing Service',
    description: 'Premium hand car wash and detailing in Cooper City. Professional auto care for South Florida vehicles.',
    canonical: '/car-wash-cooper-city-fl'
  })

  const faqs = [
    {
      q: `How often should Cooper City residents wash their cars?`,
      a: `We recommend weekly or bi-weekly washing in Cooper City due to salt air and UV exposure. Our memberships make regular washing convenient.`
    },
    {
      q: `What is ceramic coating and should I get it in Cooper City?`,
      a: `Ceramic coating provides durable paint protection lasting 1-5 years. It is highly recommended for Cooper City vehicles due to salt air and UV exposure.`
    },
    {
      q: `Is Gold membership sufficient protection for my Cooper City car?`,
      a: `For most Cooper City drivers, Gold membership ($79.99/month) provides excellent protection with unlimited washes and monthly wax treatment.`
    },
    {
      q: `Do you offer quick wash options for busy Cooper City drivers?`,
      a: `Yes, we offer express wash options for drivers with limited time, plus flexible scheduling to accommodate your Cooper City lifestyle.`
    },
    {
      q: `How does interior humidity protection work?`,
      a: `Our interior protection treatments resist moisture and mold growth, important in Cooper City humid climate. They are included in detail services.`
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
          <h1 className="text-5xl font-bold mb-6">Premium Hand Car Wash in Cooper City, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Premium hand car wash and detailing in Cooper City. Professional auto care for South Florida vehicles.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Locations", path: "/areas-we-serve" }, { label: "Premium Hand Car Wash in Cooper City, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Car Wash in Cooper City, FL</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Cooper City residents can trust Frothy Carwash Lounge for professional car washing and detailing services that protect their vehicles from South Florida climate challenges. Our facility is conveniently located to serve Cooper City and surrounding communities with premium hand-washing expertise and superior protective products. We understand Cooper City unique environmental factors and provide targeted car care that keeps vehicles looking exceptional.

Cooper City tropical location brings intense UV exposure, salt air, and high humidity that accelerate paint aging and oxidation. Our professional car washing services remove contaminants daily and apply protective treatments that preserve your vehicle finish for years to come.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cooper City Drivers Need Professional Car Care</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Cooper City location in Broward County and proximity to coastal areas means vehicles face salt-laden air and intense UV exposure year-round. Additionally, humid conditions promote algae, mineral deposits, and water spotting on vehicle surfaces. Professional car washing is the most effective way to combat these environmental challenges. Our Cooper City customers appreciate our expertise, convenient location near their community, and commitment to using only premium products that protect paint and clear coats effectively.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Cooper City Car Wash Services</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our premium hand wash includes complete exterior washing with pH-balanced soaps that protect your vehicle clear coat, detailed wheel cleaning, undercarriage rinse, and spot-free water treatment. Interior services include vacuuming, interior cleaning, window treatment, and optional odor elimination. We also offer ceramic coating, wax protection, and interior conditioning—all specifically chosen for Cooper City climate. Each service represents our commitment to delivering showroom-quality results while protecting your investment.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Membership Plans for Cooper City Residents</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our Silver membership ($39.99/month) offers two full washes and two touch-ups monthly. Gold membership ($79.99/month) provides unlimited washes, monthly wax, and monthly detail service—ideal for most Cooper City drivers. Platinum membership ($119.99/month) adds premium finishes, ceramic-enhanced protection, and priority scheduling. Cooper City residents choosing memberships save significantly compared to single washes while ensuring consistent professional maintenance that maximizes vehicle value.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cooper City Chooses Frothy Carwash Lounge</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Frothy Carwash Lounge combines expert hand-washing technique with premium products selected specifically for South Florida challenging climate. Our Cooper City team is dedicated to protecting your vehicle while delivering exceptional results. Whether you need routine maintenance or comprehensive detail services, we are committed to excellence. Visit us today.</p>
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