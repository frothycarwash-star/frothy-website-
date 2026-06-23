import { useSEO } from '../hooks/useSEO'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, MapPin } from 'lucide-react'
import BookingModal from '../components/BookingModal'
import type { LocationPageData } from '../data/locationPages'

export default function LocationPage({ data }: { data: LocationPageData }) {
  useSEO({
    title: data.title,
    description: data.description,
    canonical: data.slug,
  })
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-15">
          <img src={data.heroImage} alt={data.h1} className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            {data.badge}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            {data.h1}
          </h1>
          <p className="text-frothy-foam/70 text-lg max-w-2xl mb-4">{data.intro}</p>
          <div className="inline-flex items-center gap-2 text-frothy-foam/80 text-sm font-semibold bg-white/10 px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4 text-frothy-yellow" />
            {data.distanceLabel}
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-frothy-navy/70 text-[15px] leading-relaxed mb-10 bg-white rounded-xl shadow-card p-5">
            {data.distanceText}
          </p>

          {data.sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-frothy-navy/70 text-[15px] leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Internal links */}
          <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8 my-10">
            <h3 className="font-heading text-xl text-frothy-navy mb-4">Explore More</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {data.internalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-frothy-blue text-sm font-semibold hover:text-frothy-navy transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-frothy-navy rounded-2xl p-8 lg:p-10 text-center noise-bg">
            <h3 className="font-heading text-2xl text-frothy-yellow mb-6">{data.ctaHeading}</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-base px-8 py-4 rounded-xl hover:scale-105 transition-transform"
              >
                Book Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:9545103073"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-frothy-foam font-bold text-base px-8 py-4 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                (954) 510-3073
              </a>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
