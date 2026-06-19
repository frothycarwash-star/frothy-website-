import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Shield, Sun, Droplets } from 'lucide-react'

const benefits = [
  {
    icon: Droplets,
    title: 'Repels water & dirt',
    desc: 'Hydrophobic surface means less washing, more shine.',
  },
  {
    icon: Sun,
    title: 'Blocks UV damage',
    desc: 'Prevents oxidation and paint fading in Florida\'s sun.',
  },
  {
    icon: Shield,
    title: 'Resists scratches',
    desc: 'Harder surface protects against light abrasions.',
  },
]

export default function CeramicCTA() {
  return (
    <section className="section-padding bg-frothy-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Paint Protection
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] text-frothy-navy leading-tight mb-4">
              Protect your investment.
            </h2>
            <p className="text-frothy-navy/70 text-lg leading-relaxed mb-8 max-w-md">
              Ceramic coating creates a permanent bond with your paint. Repels water, blocks UV, and keeps your car looking showroom-fresh for years.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-frothy-navy/10 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-frothy-navy" />
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-sm text-frothy-navy mb-0.5">
                      {benefit.title}
                    </h4>
                    <p className="text-frothy-navy/60 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/ceramic"
                className="inline-flex items-center gap-2 bg-frothy-navy text-frothy-yellow font-bold text-base px-7 py-3.5 rounded-xl hover:bg-frothy-navy-dark transition-colors"
              >
                Explore Ceramic Coating
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:9545103073"
                className="inline-flex items-center gap-2 bg-frothy-blue text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-frothy-blue/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call to Book
              </a>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-frothy-lg">
              <img
                src="/images/ceramic-coating.jpg"
                alt="Ceramic coating water beading effect"
                width={1400}
                height={933}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
            {/* Floating price tag */}
            <div className="absolute -bottom-4 -left-4 bg-frothy-navy text-frothy-yellow rounded-xl px-5 py-3 shadow-lg">
              <p className="text-xs text-frothy-foam/60">Starting at</p>
              <p className="font-heading text-2xl">$149</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
