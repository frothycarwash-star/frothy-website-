import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { Check, Phone, Star, Calendar, CreditCard, XCircle, HelpCircle, Car, Truck } from 'lucide-react'
import BookingModal from '../components/BookingModal'
import RelatedLinks from '../components/RelatedLinks'

type Vehicle = 'sedan' | 'suv'

const plans = [
  {
    name: 'Silver',
    color: 'border-slate-400',
    headerBg: 'bg-slate-700',
    accentColor: 'text-slate-300',
    badgeBg: 'bg-slate-600',
    badgeText: 'text-slate-200',
    sedanPrice: 119,
    suvPrice: 139,
    sedanLink: 'https://square.link/u/18XnOa8I',
    suvLink: 'https://square.link/u/ojjyVr7P',
    savings: 'Walk-in value ~$160 · Save ~$41',
    features: [
      '2× Inside & Out ($40 each · 35 min)',
      'Full interior + exterior hand wash',
      '2× Exterior Only (~$20 each)',
      'Hand wash, wheels, dry — no interior',
    ],
    bestFor: 'Customers who want a clean car every week but only need a full interior clean twice a month.',
  },
  {
    name: 'Gold',
    color: 'border-amber-400',
    headerBg: 'bg-amber-500',
    accentColor: 'text-amber-100',
    badgeBg: 'bg-amber-600',
    badgeText: 'text-amber-100',
    sedanPrice: 179,
    suvPrice: 199,
    sedanLink: 'https://square.link/u/TfrwVKKt',
    suvLink: 'https://square.link/u/HCgmJglV',
    savings: 'Walk-in value ~$285 · Save ~$106',
    popular: true,
    features: [
      '4× Inside & Out ($40 each · 35 min)',
      'Wax included on exterior each visit',
      '1× Signature Detail ($65 · 1 hour)',
      'Deep clean + UV protect + spray wax',
      'Priority scheduling — skip the queue',
    ],
    bestFor: 'Frequent drivers who want a complete weekly wash with wax protection plus a monthly deep clean.',
  },
  {
    name: 'Platinum',
    color: 'border-purple-400',
    headerBg: 'bg-purple-700',
    accentColor: 'text-purple-200',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-purple-100',
    sedanPrice: 229,
    suvPrice: 249,
    sedanLink: 'https://square.link/u/a3JZmF41',
    suvLink: 'https://square.link/u/uYVlji14',
    savings: 'Walk-in value ~$335 · Save ~$106',
    features: [
      '4× Inside & Out ($40 each · 35 min)',
      '1× Executive Finish ($95 · 1 hour)',
      'Shampoo + leather + premium wax + trim restore',
      'Top-tier service included',
      'VIP priority every visit — first in line',
    ],
    bestFor: 'Luxury car owners who want their vehicle maintained at the highest level every single month.',
  },
]

const rules = [
  { icon: Calendar, text: 'No rollovers — credits reset at end of each billing month' },
  { icon: CreditCard, text: 'Card on file required — auto-billed monthly through Square' },
  { icon: XCircle, text: 'Machine Polish not included — members get 10% off when booked separately' },
  { icon: HelpCircle, text: 'SUV/Truck pricing is a flat +$20/mo across all tiers — already reflected above' },
  { icon: Star, text: 'Launch offer — ask about $20 off your first month' },
  { icon: Check, text: 'Cancel anytime — no contracts, no hidden fees' },
]

export default function Memberships() {
  useSEO(PAGE_SEO.memberships)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [vehicle, setVehicle] = useState<Vehicle>('sedan')

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-car.jpg" alt="Clean car after a Frothy Carwash Lounge membership wash" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Monthly Plans
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            Membership Plans.
          </h1>
          <p className="text-frothy-foam/70 text-lg max-w-xl">
            Regular customers save the most. Pick a plan, sign up online, and keep your car clean on your schedule — all month long.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vehicle Toggle */}
          <div className="flex flex-col items-center mb-10">
            <p className="text-frothy-navy/60 text-sm font-semibold mb-3">Select your vehicle type to see accurate pricing</p>
            <div className="inline-flex bg-white rounded-xl shadow-card p-1.5 gap-1">
              <button
                onClick={() => setVehicle('sedan')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  vehicle === 'sedan' ? 'bg-frothy-navy text-frothy-yellow' : 'text-frothy-navy/50 hover:text-frothy-navy'
                }`}
              >
                <Car className="w-4 h-4" />
                Sedan / Car
              </button>
              <button
                onClick={() => setVehicle('suv')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  vehicle === 'suv' ? 'bg-frothy-navy text-frothy-yellow' : 'text-frothy-navy/50 hover:text-frothy-navy'
                }`}
              >
                <Truck className="w-4 h-4" />
                SUV / Truck
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => {
              const price = vehicle === 'sedan' ? plan.sedanPrice : plan.suvPrice
              const signupLink = vehicle === 'sedan' ? plan.sedanLink : plan.suvLink
              return (
                <div
                  key={plan.name}
                  className={`h-full flex flex-col rounded-2xl overflow-hidden shadow-card ${plan.popular ? 'ring-2 ring-amber-400 lg:scale-105 lg:-my-4' : ''}`}
                >
                  {/* Header */}
                  <div className={`${plan.headerBg} px-6 py-6 text-center`}>
                    {plan.popular && (
                      <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                        Most Popular
                      </span>
                    )}
                    <p className={`text-xs font-bold tracking-[0.15em] uppercase mb-2 ${plan.accentColor}`}>
                      {plan.name}
                    </p>
                    <h3 className={`font-heading text-2xl ${plan.accentColor} mb-1`}>
                      {plan.name} Plan
                    </h3>
                    <p className="font-heading text-5xl font-bold text-white mb-1">${price}</p>
                    <p className="text-white/60 text-sm mb-3">per month · {vehicle === 'sedan' ? 'sedan' : 'SUV/truck'}</p>
                    <span className={`inline-block ${plan.badgeBg} ${plan.badgeText} text-[11px] font-bold px-3 py-1.5 rounded-full`}>
                      {plan.savings}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="bg-white p-6 flex flex-col flex-1">
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-frothy-navy/80">
                          <Check className="w-4 h-4 text-frothy-blue flex-shrink-0 mt-0.5" />
                          <span className={feature.includes('Wax included') || feature.includes('Top-tier') ? 'font-semibold text-frothy-blue' : ''}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-frothy-foam pt-4 mb-5">
                      <p className="text-xs text-frothy-navy/50">
                        <span className="font-semibold text-frothy-navy/70">Best for:</span> {plan.bestFor}
                      </p>
                    </div>

                    <a
                      href={signupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full text-center font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] ${
                        plan.popular
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-frothy-navy text-frothy-yellow hover:bg-frothy-navy-light'
                      }`}
                    >
                      Sign Up Online — ${price}/mo
                    </a>
                    <p className="text-center text-xs text-frothy-navy/40 mt-2">Secure checkout via Square · cancel anytime</p>
                  </div>
                </div>
              )
            })}
          </div>

          <RelatedLinks
            links={[
              { label: 'View All Services & Pricing', to: '/services' },
              { label: 'Ceramic Coating Packages', to: '/ceramic' },
              { label: 'Hand Car Wash in Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
              { label: 'See Our Work', to: '/gallery' },
            ]}
          />

          {/* Rules */}
          <div className="bg-frothy-navy rounded-2xl p-8 noise-bg mb-10 mt-10">
            <h3 className="font-heading text-xl text-frothy-yellow mb-6">How Memberships Work</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rules.map((rule) => (
                <div key={rule.text} className="flex items-start gap-3">
                  <rule.icon className="w-5 h-5 text-frothy-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-frothy-foam/70 text-sm">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-frothy-navy/60 text-sm mb-4">Prefer to sign up in person or have questions first?</p>
            <a
              href="tel:9545103073"
              className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-5 h-5" />
              Call Us — (954) 510-3073
            </a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Membership Sign-Up" />
    </>
  )
}
