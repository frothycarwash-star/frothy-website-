import { useState } from 'react'
import { MapPin, Clock, Phone, Navigation, Mail } from 'lucide-react'
import BookingModal from '../components/BookingModal'

export default function LocationCTA() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Info */}
          <div>
            <span className="inline-block bg-frothy-blue text-white text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Find Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] text-frothy-navy leading-tight mb-4">
              Right in the heart of Hollywood.
            </h2>
            <p className="text-frothy-navy/70 text-lg mb-8">
              Easy to get to from Hollywood, Hallandale Beach, Aventura, Dania Beach, and Pembroke Pines.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-frothy-foam rounded-xl p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-frothy-blue/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-frothy-blue" />
                </div>
                <div>
                  <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Address</p>
                  <p className="font-semibold text-frothy-navy">2223 Pembroke Rd</p>
                  <p className="text-frothy-navy/70 text-sm">Hollywood, FL 33020</p>
                </div>
              </div>

              <div className="bg-frothy-foam rounded-xl p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-frothy-blue/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-frothy-blue" />
                </div>
                <div>
                  <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Hours</p>
                  <p className="font-semibold text-frothy-navy">Open Every Day</p>
                  <p className="text-frothy-navy/70 text-sm">8:00 AM – 7:00 PM</p>
                </div>
              </div>

              <div className="bg-frothy-foam rounded-xl p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-frothy-blue/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-frothy-blue" />
                </div>
                <div>
                  <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:9545103073" className="font-semibold text-frothy-navy hover:text-frothy-blue transition-colors">
                    (954) 510-3073
                  </a>
                  <p className="text-frothy-navy/70 text-sm">Walk-ins welcome</p>
                </div>
              </div>

              <div className="bg-frothy-foam rounded-xl p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-frothy-blue/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-frothy-blue" />
                </div>
                <div>
                  <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:info@frothycarwash.com" className="font-semibold text-frothy-navy hover:text-frothy-blue transition-colors">
                    info@frothycarwash.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=2223+Pembroke+Rd+Hollywood+FL+33020"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-frothy-navy text-frothy-yellow font-bold text-sm px-6 py-3 rounded-xl hover:bg-frothy-navy-light transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-sm px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                <Phone className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right - Map */}
          <div className="rounded-2xl overflow-hidden shadow-card">
            <iframe
              src="https://www.google.com/maps?q=2223+Pembroke+Rd,+Hollywood,+FL+33020&output=embed"
              width="100%"
              height="420"
              className="border-0 block"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Frothy Carwash Lounge location"
            />
          </div>
        </div>
      </div>
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
