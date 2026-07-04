import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import BreadcrumbNav from '../components/BreadcrumbNav'
import BookingModal from '../components/BookingModal'
import { Phone, ArrowRight } from 'lucide-react'

export default function PetHairRemoval() {
  const [bookingOpen, setBookingOpen] = useState(false)
  
  useSEO({
    title: 'Pet Hair Removal in Hollywood, FL | Car Interior Cleaning',
    description: 'Professional pet hair removal from car interiors in Hollywood. Specialized extraction, sanitization, and odor treatment for pet owners.',
    canonical: '/pet-hair-removal-hollywood-fl'
  })

  const faqs = [
    {
      q: `How long does pet hair removal take?`,
      a: `Most pet hair removal services take 2-3 hours depending on vehicle size and severity. We provide an estimate when you book.`
    },
    {
      q: `Will the service remove all pet odors?`,
      a: `Our enzyme-based treatments eliminate most pet odors at their source. For severe cases, we recommend pairing pet hair removal with our odor elimination service.`
    },
    {
      q: `Is the service safe for leather upholstery?`,
      a: `Yes, our technicians are trained to work safely on all interior materials including leather. We use specialized equipment and pH-balanced products for each surface.`
    },
    {
      q: `Can pet hair removal help with allergies?`,
      a: `Absolutely. Pet hair removal extracts pet dander and allergens that accumulate in your vehicle. Many customers report improved air quality and fewer allergy symptoms.`
    },
    {
      q: `How often should I get pet hair removal?`,
      a: `For active pet owners, we recommend every 3-6 months, or sooner if you notice significant accumulation. Regular maintenance prevents odor buildup.`
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
          <h1 className="text-5xl font-bold mb-6">Pet Hair Removal in Hollywood, FL</h1>
          <p className="text-xl text-blue-100 mb-8">Professional pet hair removal from car interiors in Hollywood. Specialized extraction, sanitization, and odor treatment for pet owners.</p>
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
          <BreadcrumbNav items={[{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: "Pet Hair Removal in Hollywood, FL" }]} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Pet Hair Removal Service</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">At Frothy Carwash Lounge in Hollywood, FL, we understand how challenging it can be to remove pet hair from your vehicle interior. Whether you own dogs, cats, or multiple pets, pet hair can accumulate in seats, carpets, and crevices, creating odors and health concerns. Our specialized pet hair removal service combines professional-grade extraction equipment with meticulous hand detailing to eliminate every trace of pet hair and associated odors.

Our technicians are trained in pet-specific cleaning protocols that go beyond standard vacuuming. We use high-powered extraction systems designed specifically to lift embedded pet hair from deep within fabrics, along with enzyme-based treatments that neutralize pet odors at their source. This comprehensive approach ensures your vehicle interior is not just clean-looking, but truly sanitized and fresh.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Pet Hair Removal Matters</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Pet hair in your car interior is not just aesthetic—it impacts your vehicle value, air quality, and cleanliness. Pet hair traps dander, allergens, and bacteria that accumulate over time. For allergy sufferers or those selling their vehicle, thorough pet hair removal is essential. Regular pet hair removal also prevents permanent odor settling into upholstery and helps maintain resale value. Our Hollywood location serves pet-owning families who want their vehicles to be safe, clean spaces for passengers.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Pet Hair Removal Process</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Step 1: We assess your vehicle interior, identifying all areas with pet hair accumulation. Step 2: High-powered extraction equipment removes surface and embedded pet hair from seats, carpets, and floor mats. Step 3: Enzyme-based odor neutralizers are applied to all interior surfaces to eliminate pet-related smells at the source. Step 4: A final hand-detail pass ensures no pet hair remains in crevices or hard-to-reach areas. Step 5: Optional upholstery protection can be applied to help repel future pet hair and spills. The entire process typically takes 2-3 hours depending on severity.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pet Hair Removal Pricing & Booking</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Our pet hair removal service starts at $129 for standard sedans and increases based on vehicle size and pet hair severity. This includes extraction, sanitization, odor treatment, and hand detailing. We offer flexible scheduling to accommodate Hollywood residents, and most vehicles are completed within one appointment. For severe cases with multiple pets, we may recommend a thorough detail package for optimal results.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Frothy Carwash Lounge</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">Located in Hollywood, FL, Frothy Carwash Lounge has been serving pet-owning families for years. Our technicians use only pet-safe products and professional equipment that outperforms home cleaning methods. We are committed to returning your vehicle to pristine condition while protecting your vehicle surfaces and your family health. Book your pet hair removal appointment today and enjoy a fresh, clean car interior.</p>
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

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Pet Hair Removal" />
    </main>
  )
}