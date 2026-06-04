import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Star, Shield, Clock, Award } from 'lucide-react'
import BookingModal from '../components/BookingModal'

export default function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-car.jpg"
            alt="Premium hand car wash"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-frothy-navy via-frothy-navy/85 to-frothy-navy/40" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-frothy-navy to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-frothy-blue/20 border border-frothy-blue/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-frothy-blue rounded-full animate-pulse" />
                <span className="text-frothy-blue text-xs font-bold tracking-[0.15em] uppercase">
                  Hollywood, FL &middot; Open 7 Days
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-frothy-foam leading-[1.1] mb-6">
                Where clean cars meet{' '}
                <span className="text-frothy-yellow">good company.</span>
              </h1>

              {/* Subhead */}
              <p className="text-frothy-foam/70 text-lg leading-relaxed mb-8 max-w-md">
                Hand car wash, specialty coffee, and a lounge worth lingering in. 
                Pull up, settle in, and enjoy the atmosphere.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-base px-7 py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Book Now
                </button>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border-2 border-frothy-yellow/40 text-frothy-yellow font-bold text-base px-7 py-4 rounded-xl hover:bg-frothy-yellow/10 hover:border-frothy-yellow/60 transition-all"
                >
                  See Pricing
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Rating */}
              <a
                href="https://g.page/r/CR3lzL_ii6qJEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-frothy-yellow text-frothy-yellow" />
                  ))}
                </div>
                <span className="text-frothy-foam/50 text-sm group-hover:text-frothy-yellow/70 transition-colors">
                  5.0 · Trusted by Hollywood locals
                </span>
              </a>
            </div>

            {/* Right Column - Stats Card */}
            <div className="hidden lg:block">
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-2xl p-8 max-w-sm ml-auto">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl text-frothy-yellow mb-1">
                    Full Steam Ahead&trade;
                  </h3>
                  <p className="text-frothy-foam/50 text-sm">
                    Hand Wash &middot; Coffee &middot; Lounge
                  </p>
                  <p className="text-frothy-yellow text-sm font-medium mt-2">
                    Exterior Wash from $25 &middot; Details from $65
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="w-5 h-5 text-frothy-yellow mx-auto mb-2" />
                    <div className="font-heading text-xl text-frothy-yellow">100%</div>
                    <div className="text-frothy-foam/40 text-[10px] uppercase tracking-wider mt-0.5">
                      Hand Wash
                    </div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-frothy-yellow mx-auto mb-2" />
                    <div className="font-heading text-xl text-frothy-yellow">7</div>
                    <div className="text-frothy-foam/40 text-[10px] uppercase tracking-wider mt-0.5">
                      Days/Week
                    </div>
                  </div>
                  <div className="text-center">
                    <Award className="w-5 h-5 text-frothy-yellow mx-auto mb-2" />
                    <div className="font-heading text-xl text-frothy-yellow">3</div>
                    <div className="text-frothy-foam/40 text-[10px] uppercase tracking-wider mt-0.5">
                      Ceramic Tiers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
