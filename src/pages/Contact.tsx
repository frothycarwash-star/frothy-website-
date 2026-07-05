import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import BookingModal from '../components/BookingModal'

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-frothy-navy pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about our car wash or detailing services? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Info */}
          <div>
            <div className="space-y-8">
              {/* Address - Clickable */}
              <a
                href="https://maps.google.com/?q=2223+Pembroke+Road+Hollywood+FL+33020"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-frothy-navy-light p-8 rounded-xl hover:bg-frothy-navy-light/80 transition block"
              >
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                    <p className="text-gray-300 hover:text-frothy-blue transition">
                      2223 Pembroke Road<br />
                      Hollywood, FL 33020<br />
                      United States
                    </p>
                  </div>
                </div>
              </a>

              {/* Phone - Clickable with visible number */}
              <a
                href="tel:+19545103073"
                className="bg-frothy-navy-light p-8 rounded-xl hover:bg-frothy-navy-light/80 transition block"
              >
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                    <p className="text-frothy-blue hover:text-frothy-blue/80 transition font-semibold text-lg">
                      (954) 510-3073
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Tap to call • Walk-ins welcome</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@frothycarwash.com"
                className="bg-frothy-navy-light p-8 rounded-xl hover:bg-frothy-navy-light/80 transition block"
              >
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <p className="text-frothy-blue hover:text-frothy-blue/80 transition">
                      info@frothycarwash.com
                    </p>
                  </div>
                </div>
              </a>

              {/* Hours - Now showing actual times */}
              <div className="bg-frothy-navy-light p-8 rounded-xl">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
                    <p className="text-gray-300">
                      <span className="font-semibold text-frothy-blue">Open 7 Days a Week</span><br />
                      Monday - Sunday<br />
                      <span className="text-frothy-blue font-semibold">8:00 AM – 7:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full px-8 py-4 bg-frothy-blue text-frothy-navy font-bold rounded-lg hover:bg-frothy-blue/90 transition"
              >
                Book a Service
              </button>
            </div>
          </div>

          {/* Right Column - Map & Message */}
          <div>
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-card" style={{ height: '400px' }}>
                <iframe
                  title="Frothy Carwash Lounge Location Map"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  src="https://www.google.com/maps?q=2223+Pembroke+Road+Hollywood+FL+33020&output=embed"
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              {/* Message */}
              <div className="bg-frothy-navy-light p-8 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Quick Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-frothy-navy border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-frothy-blue"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-frothy-navy border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-frothy-blue"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-frothy-navy border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-frothy-blue resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-frothy-blue text-frothy-navy font-bold rounded-lg hover:bg-frothy-blue/90 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  )
}
