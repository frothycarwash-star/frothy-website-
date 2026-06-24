import { Link } from 'react-router-dom'
import { Droplets, Sparkles, Shield, RefreshCw, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Droplets,
    title: 'Hand Wash',
    desc: 'Exterior wash done entirely by hand. No machines, no damage.',
    price: 'From $25',
    color: 'bg-frothy-blue/10 text-frothy-blue',
  },
  {
    icon: Sparkles,
    title: 'Full Detail',
    desc: 'Interior + exterior treatment. Your car, restored to showroom condition.',
    price: 'From $65',
    color: 'bg-frothy-yellow/20 text-frothy-navy',
  },
  {
    icon: Shield,
    title: 'Ceramic Coating',
    desc: 'Long-term paint protection. Three tiers from $149 to $899.',
    price: 'From $149',
    color: 'bg-frothy-navy/10 text-frothy-navy',
  },
  {
    icon: RefreshCw,
    title: 'Memberships',
    desc: 'Monthly plans for regulars who love a clean car on their schedule.',
    price: 'From $119/mo',
    color: 'bg-frothy-blue/10 text-frothy-blue',
  },
]

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-frothy-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block bg-frothy-blue text-white text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] text-frothy-navy leading-tight mb-4">
            Everything your car needs.
          </h2>
          <p className="text-frothy-navy/70 text-lg max-w-xl">
            From a quick exterior refresh to a full detailing treatment — we&apos;ve got you covered.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to="/services"
              className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-body font-bold text-lg text-frothy-navy mb-2">
                {service.title}
              </h3>
              <p className="text-frothy-navy/70 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <span className="text-frothy-blue font-bold text-sm">{service.price}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-frothy-navy text-frothy-yellow font-bold text-base px-7 py-3.5 rounded-xl hover:bg-frothy-navy-light transition-colors"
          >
            See All Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
