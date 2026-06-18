import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { Check, Phone, Star, Calendar, CreditCard, XCircle, HelpCircle } from 'lucide-react'
import BookingModal from '../components/BookingModal'

const plans = [
  {
    name: 'Silver',
    color: 'border-slate-400',
    headerBg: 'bg-slate-700',
    accentColor: 'text-slate-300',
    badgeBg: 'bg-slate-600',
    badgeText: 'text-slate-200',
    price: '$119',
    period: 'per month · sedan',
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
    price: '$179',
    period: 'per month · sedan',
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
    price: '$229',
    period: 'per month · sedan',
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
  { icon: CreditCard, text: 'Card on file required — auto-billed on same date each month' },
  { icon: XCircle, text: 'Machine Polish not included — members get 10% off when booked separately' },
  { icon: HelpCircle, text: 'SUV surcharge at counter — Inside & Out +$10 · Signature +$10 · Executive +$15' },
  { icon: Star, text: 'Launch offer — ask about $20 off your first month' },
  { icon: Check, text: 'Cancel anytime — no contracts, no hidden fees' },
]

export default function Memberships() {
  useSEO(PAGE_SEO.memberships)
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-car.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Monthly Plans
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            Membership Plans.
          </h1>
          <p className="text-frothy-foam/70 text-lg max-w-xl">
            Regular customers save the most. Pick a plan and keep your car clean on your schedule — all month long.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pricing Note */}
          <div className="bg-frothy-navy text-frothy-blue text-xs sm:text-sm font-semibold px-5 py-3 rounded-full inline-flex items-center gap-2 mb-10 mx-auto justify-center w-full sm:w-auto">
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            All prices sedan-based · SUV/Truck: +$10 Inside & Out · +$10 Signature Detail · +$15 Executive Finish
          </div>

          {/* Plans Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
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
                  <p className="font-heading text-5xl font-bold text-white mb-1">{plan.price}</p>
                  <p className="text-white/60 text-sm mb-3">{plan.period}</p>
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

                  <button
                    onClick={() => setBookingOpen(true)}
                    className={`w-full font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] ${
                      plan.popular
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-frothy-navy text-frothy-yellow hover:bg-frothy-navy-light'
                    }`}
                  >
                    Sign Up — Call Us
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div className="bg-frothy-navy rounded-2xl p-8 noise-bg mb-10">
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
            <a
              href="tel:9545103073"
              className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-5 h-5" />
              Call to Sign Up — (954) 510-3073
            </a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService="Membership Sign-Up" />
    </>
  )
}
