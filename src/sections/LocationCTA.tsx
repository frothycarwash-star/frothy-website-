import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LocationCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-frothy-blue/10 border border-frothy-blue/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-frothy-blue rounded-full" />
              <span className="text-frothy-blue text-xs font-bold tracking-[0.15em] uppercase">
                Find Us
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-frothy-navy mb-6">
              Right in the heart of Hollywood.
            </h2>

            <p className="text-lg text-gray-600 mb-12">
              Easy to get to from Hollywood, Hallandale Beach, Aventura, Dania Beach, and Pembroke Pines.
            </p>

            {/* Info Boxes */}
            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-frothy-blue uppercase tracking-wider mb-1">Address</p>
                    <p className="text-frothy-navy font-semibold">2223 Pembroke Rd</p>
                    <p className="text-gray-600">Hollywood, FL 33020</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-frothy-blue uppercase tracking-wider mb-1">Hours</p>
                    <p className="text-frothy-navy font-semibold">Open Every Day</p>
                    <p className="text-gray-600">8:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-frothy-blue uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-frothy-navy font-semibold">(954) 510-3073</p>
                    <p className="text-gray-600">Walk-ins welcome</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-frothy-blue uppercase tracking-wider mb-1">Email</p>
                    <p className="text-frothy-navy font-semibold">info@frothycarwash.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.google.com/?q=26.011468,-80.131643"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-frothy-navy text-white font-bold rounded-lg hover:bg-frothy-navy/90 transition"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-frothy-blue text-frothy-navy font-bold rounded-lg hover:bg-frothy-blue/90 transition"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right - Map */}
          <div className="rounded-2xl overflow-hidden shadow-card h-96">
            <iframe
              src="https://maps.google.com/maps?q=26.011468,-80.131643&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Frothy Carwash Lounge Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
