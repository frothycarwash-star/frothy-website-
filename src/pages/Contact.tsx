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
              {/* Address */}
              <div className="bg-frothy-navy-light p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                    <p className="text-gray-300">
                      Hollywood, Florida<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-frothy-navy-light p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Phone className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                    <a href="tel:+1234567890" className="text-frothy-blue hover:text-frothy-blue/80">
                      Call us for service inquiries
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-frothy-navy-light p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Mail className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <a href="mailto:info@frothycarwash.com" className="text-frothy-blue hover:text-frothy-blue/80">
                      info@frothycarwash.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-frothy-navy-light p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="w-6 h-6 text-frothy-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
                    <p className="text-gray-300">
                      Open 7 Days a Week<br />
                      Check our website for hours
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
              <div className="rounded-2xl overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.4082123456!2d-80.12019!3d26.01125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sHollywood%2C%20Florida!2s26.0112%2C-80.1202!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Frothy Carwash Lounge in Hollywood, Florida"
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
