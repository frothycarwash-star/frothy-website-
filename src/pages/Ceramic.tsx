import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { Check, Phone, ArrowRight, Droplets, Sun, Shield, Sparkles } from 'lucide-react'
import BookingModal from '../components/BookingModal'
import RelatedLinks from '../components/RelatedLinks'
import CeramicSEOContent from '../sections/CeramicSEOContent'

const tiers = [
  {
    tier: 'Entry Level · Spray Protection',
    name: 'Ceramic Spray Sealant',
    price: '$149',
    features: ['Spray-applied ceramic sealant', 'Hydrophobic water beading', 'UV ray protection', 'Enhanced gloss finish', 'Paint prep included', 'Great for daily drivers'],
    featured: false,
    span: true,
  },
  {
    tier: '1-Year Protection',
    name: 'Ceramic Coating — 1 Year',
    price: '$299–$499',
    features: ['1-year ceramic bond coating', 'Hydrophobic formula', 'UV + oxidation protection', 'Chemical resistance', 'Paint decontamination prep', 'Full exterior coat'],
    featured: false,
    span: false,
  },
  {
    tier: '3-Year Protection · Most Popular',
    name: 'Ceramic Coating — 3 Year',
    price: '$399–$699',
    features: ['3-year professional ceramic coating', 'Advanced hydrophobic formula', 'Chemical & swirl resistance', 'UV + oxidation protection', 'Two-stage paint prep', 'Full exterior coat', 'Glass ceramic coating +$100–$250', 'Wheel ceramic coating +$150–$300'],
    featured: true,
    badge: 'Best Value',
    span: false,
  },
  {
    tier: '5-Year Protection · Ultimate Package',
    name: 'Ceramic Coating — 5 Year',
    price: '$899–$1,499',
    features: ['5-year professional-grade ceramic coating', 'Full paint decontamination', 'Multi-stage paint correction prep', 'Full exterior + trim coating', 'Wheel ceramic coating included', 'Glass ceramic coating included', 'Interior ceramic protection +$100–$300', 'Certificate of protection'],
    featured: false,
    span: true,
  },
]

const benefits = [
  { icon: Droplets, title: 'Repels Water & Dirt', desc: 'Hydrophobic surface means water beads up and rolls off, taking dirt with it.' },
  { icon: Sun, title: 'Blocks UV Damage', desc: 'Prevents oxidation and paint fading — essential in Florida\'s intense sun.' },
  { icon: Shield, title: 'Chemical Resistance', desc: 'Protects against bird droppings, tree sap, and road salt.' },
  { icon: Sparkles, title: 'Enhanced Gloss', desc: 'Gives your paint a deeper, richer shine that lasts for years.' },
]

export default function Ceramic() {
  useSEO(PAGE_SEO.ceramic)
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/ceramic-coating-hollywood-fl.webp" alt="Ceramic coating applied to car paint, water beading on the surface" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Paint Protection
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            Ceramic Coating.
          </h1>
          <p className="text-frothy-foam/70 text-lg max-w-xl">
            A permanent bond with your paint. Repels water, blocks UV, resists scratches, and keeps your car looking like day one — for years.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tiers */}
          <div className="mb-6">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Choose Your Level
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-2">
              Three tiers of protection.
            </h2>
            <p className="text-frothy-navy/70 text-lg max-w-xl">
              Whether you drive daily or park it on weekends, we have a ceramic package built for your car and your budget.
            </p>
          </div>

          {/* Top Tier (full width) */}
          {tiers.filter(t => t.span).map((tier) => (
            <div key={tier.name} className="mb-6 rounded-2xl overflow-hidden shadow-card">
              <div className="bg-gradient-to-r from-frothy-navy to-frothy-navy-dark px-6 py-5 border-2 border-frothy-yellow/30">
                <p className="text-frothy-blue text-xs font-bold tracking-[0.15em] uppercase mb-2">{tier.tier}</p>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-heading text-2xl text-frothy-yellow">{tier.name}</h3>
                  {tier.badge && (
                    <span className="bg-frothy-yellow text-frothy-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <p className="font-heading text-4xl text-white font-bold">{tier.price}</p>
              </div>
              <div className="bg-white p-6">
                <ul className={`grid sm:grid-cols-2 gap-2.5 mb-6 ${tier.span ? 'lg:grid-cols-3' : ''}`}>
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-frothy-navy/80">
                      <Check className="w-4 h-4 text-frothy-blue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-frothy-navy text-frothy-yellow font-bold py-3.5 rounded-xl hover:bg-frothy-navy-light transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}

          {/* Middle Tiers (2-col) */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {tiers.filter(t => !t.span).map((tier) => (
              <div key={tier.name} className={`h-full flex flex-col rounded-2xl overflow-hidden shadow-card ${tier.featured ? 'ring-2 ring-frothy-blue' : ''}`}>
                <div className={`px-6 py-5 ${tier.featured ? 'bg-frothy-blue' : 'bg-frothy-navy'}`}>
                  <p className={`text-xs font-bold tracking-[0.15em] uppercase mb-2 ${tier.featured ? 'text-white/70' : 'text-frothy-blue'}`}>
                    {tier.tier}
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-heading text-xl ${tier.featured ? 'text-white' : 'text-frothy-yellow'}`}>
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span className="bg-frothy-yellow text-frothy-navy text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className={`font-heading text-3xl font-bold ${tier.featured ? 'text-white' : 'text-white'}`}>
                    {tier.price}
                  </p>
                </div>
                <div className="bg-white p-6 flex flex-col flex-1">
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-frothy-navy/80">
                        <Check className="w-4 h-4 text-frothy-blue flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className={`w-full font-bold py-3 rounded-xl transition-colors ${
                      tier.featured
                        ? 'bg-frothy-blue text-white hover:bg-frothy-blue/90'
                        : 'bg-frothy-navy text-frothy-yellow hover:bg-frothy-navy-light'
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* What is Ceramic */}
          <div className="bg-frothy-navy rounded-2xl p-8 lg:p-10 mt-14 noise-bg">
            <h3 className="font-heading text-2xl text-frothy-yellow mb-6">What is ceramic coating?</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <p className="text-frothy-foam/75 text-[15px] leading-relaxed">
                Ceramic coating is a liquid polymer applied to the exterior of your vehicle. It chemically bonds with your factory paint, creating a layer of protection that doesn&apos;t wash away or break down. Unlike traditional wax, it&apos;s semi-permanent — lasting from 1 to 5+ years depending on the tier.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 bg-frothy-blue/20 rounded-lg flex items-center justify-center">
                      <b.icon className="w-4.5 h-4.5 text-frothy-blue" />
                    </div>
                    <div>
                      <h4 className="text-frothy-yellow text-sm font-bold mb-0.5">{b.title}</h4>
                      <p className="text-frothy-foam/60 text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <RelatedLinks
            links={[
              { label: 'Ceramic Coating in Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
              { label: 'View All Services & Pricing', to: '/services' },
              { label: 'Monthly Memberships', to: '/memberships' },
              { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
            ]}
          />

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href="tel:9545103073"
              className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-base px-8 py-4 rounded-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4" />
              Call for a Free Quote — (954) 510-3073
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <CeramicSEOContent />

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Ceramic Coating" />
    </>
  )
}
