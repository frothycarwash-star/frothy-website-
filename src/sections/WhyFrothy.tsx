import { useState } from 'react'
import { Hand, Coffee, Heart, TrendingUp, Phone, CheckCircle, ShieldCheck, Award, Users } from 'lucide-react'
import BookingModal from '../components/BookingModal'

const reasons = [
  {
    num: '01',
    icon: Hand,
    title: '100% Hand Washed, Every Time',
    desc: 'No machines. No brushes scratching your paint. Every car gets careful hands and real attention to detail.',
  },
  {
    num: '02',
    icon: Coffee,
    title: "Coffee Lounge That's Actually Good",
    desc: 'Grab a latte, cappuccino, or something cold. Your car gets the foam — you get the coffee. Everyone wins.',
  },
  {
    num: '03',
    icon: Heart,
    title: 'A Neighborhood Spot, Not a Chain',
    desc: 'We know our regulars. We care about the work. And we\'re building something worth coming back to.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Built to Grow With You',
    desc: 'From your first wash to ceramic coating to a monthly membership — we scale with your needs.',
  },
]

const trustSignals = [
  { icon: ShieldCheck, label: 'Fully Insured' },
  { icon: Award, label: '5-Star Rated' },
  { icon: Users, label: '2,000+ Happy Customers' },
  { icon: CheckCircle, label: 'Satisfaction Guaranteed' },
]

export default function WhyFrothy() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <section className="section-padding bg-frothy-foam">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Reasons */}
          <div>
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Why Frothy
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] text-frothy-navy leading-tight mb-6">
              Not just a carwash.<br />
              A place you&apos;ll actually enjoy.
            </h2>
            <p className="text-frothy-navy/60 text-lg mb-10 max-w-md">
              We built Frothy to be different. A place where the wait feels like part of the experience — not something to survive.
            </p>

            <div className="space-y-6">
              {reasons.map((reason) => (
                <div key={reason.num} className="flex gap-5 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-frothy-navy rounded-2xl flex items-center justify-center group-hover:bg-frothy-blue transition-colors">
                      <reason.icon className="w-6 h-6 text-frothy-yellow" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-frothy-blue text-xs font-bold">{reason.num}</span>
                      <h3 className="font-body font-bold text-base text-frothy-navy">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-frothy-navy/60 text-sm leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual + CTA */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img
                src="/images/lounge-interior.jpg"
                alt="Frothy Carwash Lounge interior"
                width={1400}
                height={1050}
                loading="lazy"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-frothy-navy/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-frothy-blue text-xs font-bold tracking-[0.15em] uppercase">
                  Wash · Sip · Connect
                </span>
                <h3 className="font-heading text-2xl text-frothy-yellow mt-2 mb-2">
                  A place built for the modern driver.
                </h3>
                <p className="text-frothy-foam/70 text-sm">
                  Come in, hand over the keys, and step into a space where the wash feels elevated and the wait actually feels good.
                </p>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {trustSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-xs"
                >
                  <signal.icon className="w-5 h-5 text-frothy-blue flex-shrink-0" />
                  <span className="text-sm font-semibold text-frothy-navy">{signal.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-frothy-yellow text-frothy-navy font-bold py-4 rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
