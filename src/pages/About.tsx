import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import { Handshake, Zap, Sun, TrendingUp, Phone, Star, MapPin, Clock } from 'lucide-react'
import RelatedLinks from '../components/RelatedLinks'
import AboutSEOContent from '../sections/AboutSEOContent'

const values = [
  {
    icon: Handshake,
    title: 'Approachable, Not Basic',
    desc: "We're a neighborhood spot. Everyone's welcome. No attitude, no pretense — just great work.",
  },
  {
    icon: Zap,
    title: 'Confident, Not Intimidating',
    desc: "We're proud of the work we do. And we back it up with results, every single car.",
  },
  {
    icon: Sun,
    title: 'Warm, Not Casual',
    desc: "Florida energy. Real hospitality. A place you'll actually enjoy spending time in.",
  },
  {
    icon: TrendingUp,
    title: 'Built to Grow',
    desc: "We're just getting started. Frothy is built to be a name you recognize nationwide.",
  },
]

const stats = [
  { num: '2,000+', label: 'Cars Detailed' },
  { num: '5.0', label: 'Google Rating' },
  { num: '7', label: 'Days a Week' },
  { num: '100%', label: 'Hand Washed' },
]

export default function About() {
  useSEO(PAGE_SEO.about)
  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/frothy-carwash-team-hollywood-fl.jpg" alt="The Frothy Carwash Lounge team in Hollywood, FL" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            Frothy Carwash Lounge.
          </h1>
          <p className="text-frothy-foam/70 text-lg">
            Where clean cars meet good company.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Story */}
            <div>
              <div className="bg-frothy-navy rounded-2xl p-8 noise-bg mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl text-frothy-yellow mb-6">
                  Built for a different kind of carwash.
                </h2>
                <div className="space-y-4 text-frothy-foam/80 text-[15px] leading-relaxed">
                  <p>
                    Frothy Carwash Lounge was built with one simple idea: a carwash shouldn&apos;t feel like a chore. It should feel like a stop worth making.
                  </p>
                  <p>
                    We looked at the market and saw the same thing everyone else did — outdated, impersonal, rushed. Machine tunnels that scratch your paint. A place to drop off your car and come back to it an hour later like nothing happened.
                  </p>
                  <p>
                    We wanted something better. A place where the wash is done entirely by hand, the coffee is actually good, and the wait is something you look forward to — not something you endure.
                  </p>
                  <p>
                    That&apos;s Frothy. Hand Wash. Coffee. Lounge. Hollywood&apos;s neighborhood carwash for people who care about their car and their time.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-card">
                    <p className="font-heading text-2xl text-frothy-navy mb-0.5">{stat.num}</p>
                    <p className="text-frothy-navy/70 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Team Image */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-card">
                <img
                  src="/images/frothy-carwash-team-hollywood-fl.jpg"
                  alt="The Frothy Carwash Lounge team in Hollywood, FL"
                  width={1400}
                  height={933}
                  loading="lazy"
                  className="w-full aspect-[3/2] object-cover"
                />
              </div>
            </div>

            {/* Right - Values + CTA */}
            <div>
              <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
                Our Values
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
                What we stand for.
              </h2>

              <div className="space-y-4 mb-10">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <div className="w-10 h-10 bg-frothy-navy rounded-xl flex items-center justify-center mb-3">
                      <value.icon className="w-5 h-5 text-frothy-yellow" />
                    </div>
                    <h3 className="font-body font-bold text-frothy-navy mb-1">{value.title}</h3>
                    <p className="text-frothy-navy/70 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>

              {/* Hand wash image */}
              <div className="rounded-2xl overflow-hidden shadow-card mb-8">
                <img
                  src="/images/hand-car-wash-service-hollywood-fl.jpg"
                  alt="Hand washing a car exterior at Frothy Carwash Lounge in Hollywood, FL"
                  width={1200}
                  height={1600}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>

              {/* Visit CTA */}
              <div className="bg-frothy-navy rounded-2xl p-6 noise-bg text-center">
                <p className="font-heading text-xl text-frothy-yellow mb-2">
                  &ldquo;Pull up, settle in, and enjoy the atmosphere.&rdquo;
                </p>
                <p className="text-frothy-foam/60 text-sm mb-4">
                  Come visit us at 2223 Pembroke Rd, Hollywood FL. Open 8AM–7PM, every day.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="tel:9545103073"
                    className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
                  >
                    <Phone className="w-4 h-4" />
                    Call (954) 510-3073
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-frothy-yellow/40 text-frothy-yellow font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-frothy-yellow/10 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </Link>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-xs">
                  <Clock className="w-5 h-5 text-frothy-blue" />
                  <div>
                    <p className="text-xs text-frothy-navy/70">Hours</p>
                    <p className="text-sm font-semibold text-frothy-navy">8AM – 7PM Daily</p>
                  </div>
                </div>
                <a
                  href="https://g.page/r/CR3lzL_ii6qJEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-xs hover:shadow-card transition-shadow group"
                >
                  <Star className="w-5 h-5 text-frothy-blue" />
                  <div>
                    <p className="text-xs text-frothy-navy/70">Google Rating</p>
                    <p className="text-sm font-semibold text-frothy-navy group-hover:text-frothy-blue transition-colors">5.0 / 5 · See Reviews →</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <RelatedLinks
            links={[
              { label: 'View All Services & Pricing', to: '/services' },
              { label: 'Ceramic Coating Packages', to: '/ceramic' },
              { label: 'Monthly Memberships', to: '/memberships' },
              { label: 'See Our Work', to: '/gallery' },
            ]}
          />
        </div>
      </div>

      <AboutSEOContent />
    </>
  )
}
