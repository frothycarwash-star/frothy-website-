import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function HeadlightRestoration() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Headlight Restoration in Hollywood, FL | Professional Auto Detailing',
    description: 'Professional headlight restoration and polishing. Restore clarity and brightness to oxidized, hazy, or yellowed headlights.',
    canonical: '/headlight-restoration-hollywood-fl'
  })

  const faqs = [
    {
      q: `Will restored headlights get cloudy again?`,
      a: `Our protective clear coat treatment helps prevent future oxidation, but UV exposure will eventually cause some cloudiness over 2-3 years. Regular maintenance extends clarity.`
    },
    {
      q: `Is headlight restoration better than replacement?`,
      a: `Absolutely. Professional restoration costs a fraction of replacement and delivers excellent results. Restoration is the smart choice.`
    },
    {
      q: `How long does headlight restoration take?`,
      a: `Headlight restoration typically takes 1-2 hours for both headlights depending on oxidation severity.`
    },
    {
      q: `Does restoration work on all headlight types?`,
      a: `Yes, we can restore standard halogen, HID, and LED headlights. The restoration process works on all lens materials and designs.`
    },
    {
      q: `Will restoration improve my nighttime visibility?`,
      a: `Significantly. Cloudy headlights reduce light output by 50% or more. Restoration restores brightness, improving your visibility and safety.`
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
          <h1 className="text-5xl font-bold mb-6">Headlight Restoration in Hollywood, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Professional headlight restoration and polishing. Restore clarity and brightness to oxidized, hazy, or yellowed headlights.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: "Headlight Restoration in Hollywood, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Headlight Restoration & Polishing</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Cloudy, hazy, or yellowed headlights significantly impact your vehicle appearance and safety on the road. Over time, UV exposure oxidizes headlight lens coverings, reducing light output and creating a dull, aged appearance. Frothy Carwash Lounge in Hollywood, FL specializes in professional headlight restoration that brings back clarity, brightness, and that like-new appearance. Our advanced restoration process uses precision polishing and protective coatings to remove oxidation and prevent future cloudiness.

Restoring your headlights is one of the most dramatic improvements you can make to your vehicle appearance and safety. Restored headlights instantly make your car look newer, improve visibility and safety at night, and can significantly increase resale value.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Headlight Restoration Is Important</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Cloudy headlights reduce nighttime visibility and safety, making it harder for you to see the road and for other drivers to see you. A vehicle with hazy headlights looks older and less well-maintained, which impacts resale value. Professional headlight restoration addresses both safety and aesthetics, bringing back the clear appearance and light output of original factory headlights. Our Hollywood customers trust our expertise to restore their headlights to showroom quality without costly replacement.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Headlight Restoration Process</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Step 1: We assess the oxidation level and determine the appropriate restoration approach. Step 2: Progressive grit sanding and polishing gradually removes oxidation and cloudiness from the lens surface. Step 3: Advanced polishing compounds are applied to restore maximum clarity and brightness. Step 4: A protective clear coat is applied to prevent future oxidation and extend the life of your restored headlights. Step 5: Final detailing ensures your headlights shine brilliantly. The result is dramatic—most headlights appear 80-90% improved compared to original cloudy state.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Headlight Restoration Pricing & Warranty</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our headlight restoration service is priced per pair starting at $99 for standard sedans. SUVs and vehicles with larger headlight assemblies start at $129. All headlight restoration services include our protective clear coat treatment. Most headlights show dramatic improvement, with many returning to near-original clarity. We stand behind our work and provide guidance on maintaining your restored headlights long-term.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Frothy Carwash Lounge for Headlights</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Headlight restoration requires precision and expertise to avoid damage to lens coverings and surrounding trim. Our Hollywood technicians have extensive experience restoring all headlight types from simple single-piece units to complex HID and LED assemblies. We are committed to delivering results that exceed your expectations while protecting your vehicle integrity. Choose professional headlight restoration and see the dramatic difference clarity makes.</p>
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

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Headlight Restoration" />
    </main>
  )
}