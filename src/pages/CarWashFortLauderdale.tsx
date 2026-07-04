import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function CarWashFortLauderdale() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Professional Car Wash in Fort Lauderdale, FL | Hand Car Washing Service',
    description: 'Premium hand car wash in Fort Lauderdale. Professional car detailing and cleaning for luxury and standard vehicles.',
    canonical: '/car-wash-fort-lauderdale-fl'
  })

  const faqs = [
    {
      q: `How does salt air affect my car paint?`,
      a: `Salt air accelerates oxidation and corrosion, especially on metal and clear coat. Regular professional washing and protective coatings are essential for Fort Lauderdale vehicles.`
    },
    {
      q: `How often should I wash my car in Fort Lauderdale?`,
      a: `Due to salt air and UV exposure, we recommend weekly or bi-weekly washing for Fort Lauderdale vehicles. Our memberships make regular washing affordable.`
    },
    {
      q: `What membership is best for Fort Lauderdale drivers?`,
      a: `Our Gold membership ($79.99/month) is ideal for most Fort Lauderdale drivers, providing unlimited washes plus monthly wax for comprehensive salt and UV protection.`
    },
    {
      q: `Do you service vehicles from surrounding areas like Davie and Dania Beach?`,
      a: `Absolutely! We serve Davie, Dania Beach, and the entire Broward County area. Our location is convenient for Fort Lauderdale-area residents.`
    },
    {
      q: `Can you apply protective coatings for salt air protection?`,
      a: `Yes, we offer ceramic coating and wax treatments specifically designed to protect against salt air and UV. These coatings are recommended for Fort Lauderdale vehicles.`
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
          <h1 className="text-5xl font-bold mb-6">Premium Hand Car Wash in Fort Lauderdale, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Premium hand car wash in Fort Lauderdale. Professional car detailing and cleaning for luxury and standard vehicles.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Locations", path: "/areas-we-serve" }, { label: "Premium Hand Car Wash in Fort Lauderdale, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Car Wash in Fort Lauderdale, FL</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Frothy Carwash Lounge brings premium hand car washing and detailing services to Fort Lauderdale residents. Located just minutes from downtown Fort Lauderdale, our facility serves the community discerning drivers who demand professional car care. Our hand-washing approach, combined with superior products and meticulous attention to detail, delivers results that automated car washes cannot match.

Fort Lauderdale tropical climate, salt air exposure, and intense sun create unique challenges for vehicle paint and interiors. Our specialized services address these environmental factors while maintaining your vehicle beauty and protecting your investment.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Fort Lauderdale Needs Professional Car Washing</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Fort Lauderdale proximity to the ocean exposes vehicles to salt air that accelerates paint oxidation and corrosion. UV intensity is intense year-round, fading paint and degrading protective coatings. Humidity promotes water spotting and mineral deposits. These environmental challenges make professional car washing essential for Fort Lauderdale vehicle owners. Our location serves the surrounding communities of Davie, Dania Beach, and Broward County, providing professional car care that protects vehicles from South Florida harsh conditions.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Fort Lauderdale Car Wash Service</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our premium hand wash service includes complete exterior washing with pH-balanced soaps that protect your vehicle clear coat, detailed wheel cleaning, and a final rinse with spot-free water. Interior vacuuming, window cleaning, and dashboard treatment are included in our full-service packages. We offer flexible membership options for Fort Lauderdale residents who wash regularly, with Silver, Gold, and Platinum tiers to suit your needs. Our team understands the specific needs of vehicles in our service area and provides protective treatments to combat salt air and UV exposure.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Membership Options in Fort Lauderdale</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our Silver membership ($39.99/month) includes two full washes and two exterior touch-ups monthly—perfect for maintaining your Fort Lauderdale vehicle. Gold membership ($79.99/month) offers unlimited full washes plus monthly wax treatment and monthly detail. Platinum membership ($119.99/month) includes all Gold benefits plus premium finishing and priority scheduling. Each membership tier is designed to keep your Fort Lauderdale vehicle protected from salt air and UV while maintaining showroom appearance.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Frothy Carwash Lounge in Fort Lauderdale</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Frothy Carwash Lounge combines expert technique with premium products specifically chosen for South Florida climate. Our Fort Lauderdale team is passionate about car care and committed to protecting your vehicle finish. Whether you need a single wash or ongoing membership protection, we deliver results that rival luxury dealership detailing. Visit us today and discover why Fort Lauderdale drivers choose Frothy Carwash Lounge.</p>
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