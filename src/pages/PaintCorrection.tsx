import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function PaintCorrection() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Paint Correction in Hollywood, FL | Remove Swirl Marks | Frothy',
    description: 'Professional paint correction in Hollywood, FL. Remove swirl marks, scratches, and water spots. Expert detailing with ceramic coating prep.',
    canonical: '/paint-correction-hollywood-fl'
  })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Will paint correction remove all scratches?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Paint correction removes light to moderate scratches and swirl marks. Deep scratches that go through the clear coat may need touch-up paint.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does paint correction take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'One-stage correction takes 4-6 hours. Two-stage correction takes 8-12 hours. We typically complete it in one day.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I get paint correction with ceramic coating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — in fact, we recommend it. Paint correction prepares your surface perfectly for ceramic coating to bond directly to clean, flawless paint.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does paint correction cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pricing starts at $150 for one-stage correction. Two-stage correction ranges from $250-$400 depending on vehicle size and damage severity. Call for a free quote.'
        }
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Paint Correction in Hollywood, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Remove swirl marks, scratches, and water spots. Professional paint correction that prepares your car for ceramic coating or a flawless shine.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setBookingOpen(true)} className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300">
              Book Paint Correction
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: "Paint Correction" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Paint Correction?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Paint correction is a professional multi-stage process that removes light scratches, swirl marks, and surface contaminants from your car's clear coat. Unlike polishing, which is temporary, paint correction actually levels the surface by removing microscopic layers of damaged paint, restoring clarity and depth.</p>
          <p className="text-gray-700 leading-relaxed">Automatic car washes, improper washing techniques, and environmental damage all leave swirl marks — fine lines that catch light and dull your shine. Our paint correction service removes these marks and restores the professional finish your paint deserves.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">When Do You Need Paint Correction?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Paint correction is ideal if your car has light to moderate swirl marks, scratches, or water spots from car washes. It's also the recommended prep step before ceramic coating — a properly corrected surface lets the coating bond directly to smooth, flawless paint.</p>
          <p className="text-gray-700 leading-relaxed">We inspect your paint under detail lights to assess the damage and recommend the right service: one-stage correction for light damage or two-stage for heavier swirl marks and scratches.</p>
        </section>

        <section className="mb-12 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Paint Correction + Ceramic Coating</h2>
          <p className="text-gray-700 leading-relaxed">The best results come from combining paint correction with ceramic coating. We correct your paint to remove existing damage, then apply ceramic coating to prevent future damage for 3-5 years. This combination restores your car's finish to showroom condition and protects it long-term.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Will paint correction remove all scratches?', a: 'Paint correction removes light to moderate scratches and swirl marks. Deep scratches that go through the clear coat may need touch-up paint.' },
              { q: 'How long does paint correction take?', a: 'One-stage correction takes 4-6 hours. Two-stage correction takes 8-12 hours. We typically complete it in one day.' },
              { q: 'Can I get paint correction with ceramic coating?', a: 'Yes — in fact, we recommend it. Paint correction prepares your surface perfectly for ceramic coating.' },
              { q: 'How much does paint correction cost?', a: 'Pricing starts at $150 for one-stage. Two-stage ranges $250-$400 depending on vehicle size. Call for a free quote.' }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-4 rounded border border-gray-200 hover:border-blue-400">
                <summary className="font-bold text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="text-gray-700 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Restore Your Paint?</h2>
          <p className="text-lg text-blue-100 mb-8">Get your car looking showroom-fresh with professional paint correction in Hollywood, FL.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setBookingOpen(true)} className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 inline-flex items-center gap-2">
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+19545103073" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Related Services</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="/ceramic" className="text-blue-600 hover:text-blue-700 font-semibold">Ceramic Coating Packages</a>
            <a href="/car-detailing-hollywood-fl" className="text-blue-600 hover:text-blue-700 font-semibold">Full Detail Service</a>
            <a href="/memberships" className="text-blue-600 hover:text-blue-700 font-semibold">Monthly Memberships</a>
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Book an Appointment</a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Paint Correction" />
    </main>
  )
}
