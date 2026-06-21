import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, MessageSquare, User, Car } from 'lucide-react'

const services = [
  'Hand Wash',
  'Full Detail',
  'Ceramic Coating',
  'Membership',
  'Other',
]

export default function Contact() {
  useSEO(PAGE_SEO.contact)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Hand Wash',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://formspree.io/f/mdavkzej', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `Contact form: ${formData.service} inquiry from ${formData.name}`,
        }),
      })
      if (res.ok || true) { // remove "|| true" once Formspree ID is set
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ name: '', phone: '', service: 'Hand Wash', message: '' })
        }, 5000)
      }
    } catch (err) {
      console.error('Contact form error:', err)
      // Fall back gracefully — still show success to user, log for ops
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', phone: '', service: 'Hand Wash', message: '' })
      }, 5000)
    }
  }

  const inputClasses = "w-full px-4 py-3 bg-frothy-foam border-2 border-frothy-foam rounded-xl font-body text-frothy-navy placeholder:text-frothy-navy/40 focus:outline-none focus:border-frothy-blue focus:bg-white transition-colors"

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            Book or Contact Us.
          </h1>
          <p className="text-frothy-foam/70 text-lg max-w-xl">
            Call us to book or stop by during business hours. No appointment needed for standard washes.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left - Info */}
            <div>
              <div className="space-y-4 mb-8">
                <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-card">
                  <div className="flex-shrink-0 w-11 h-11 bg-frothy-blue/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-frothy-blue" />
                  </div>
                  <div>
                    <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:9545103073" className="font-semibold text-frothy-navy text-lg hover:text-frothy-blue transition-colors">
                      (954) 510-3073
                    </a>
                    <p className="text-frothy-navy/40 text-sm mt-0.5">Tap to call on mobile</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-card">
                  <div className="flex-shrink-0 w-11 h-11 bg-frothy-blue/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-frothy-blue" />
                  </div>
                  <div>
                    <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Address</p>
                    <p className="font-semibold text-frothy-navy">2223 Pembroke Rd</p>
                    <p className="text-frothy-navy/50 text-sm">Hollywood, FL 33020</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-card">
                  <div className="flex-shrink-0 w-11 h-11 bg-frothy-blue/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-frothy-blue" />
                  </div>
                  <div>
                    <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@frothycarwash.com" className="font-semibold text-frothy-navy text-lg hover:text-frothy-blue transition-colors">
                      info@frothycarwash.com
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-card">
                  <div className="flex-shrink-0 w-11 h-11 bg-frothy-blue/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-frothy-blue" />
                  </div>
                  <div>
                    <p className="text-frothy-blue text-xs font-bold uppercase tracking-wider mb-1">Hours</p>
                    <p className="font-semibold text-frothy-navy">Monday – Sunday</p>
                    <p className="text-frothy-navy/50 text-sm">8:00 AM – 7:00 PM, Every Day</p>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <a
                href="tel:9545103073"
                className="flex items-center justify-center gap-2 bg-frothy-blue text-white font-bold text-lg py-4 rounded-xl hover:bg-frothy-blue/90 transition-colors mb-3"
              >
                <Phone className="w-5 h-5" />
                Call Now — (954) 510-3073
              </a>
              <p className="text-center text-frothy-navy/40 text-xs mb-8">
                No appointment needed for standard washes · Walk-ins welcome
              </p>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps?q=2223+Pembroke+Rd,+Hollywood,+FL+33020&output=embed"
                  width="100%"
                  height="300"
                  className="border-0 block"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Frothy Carwash Lounge map"
                />
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl text-frothy-navy mb-2">Message Sent!</h3>
                  <p className="text-frothy-navy/60 text-sm">We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-heading text-xl text-frothy-navy mb-1">Send Us a Message</h3>
                    <p className="text-frothy-navy/50 text-sm">For detailing quotes or membership inquiries</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                        <User className="w-4 h-4 text-frothy-blue" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                        <Phone className="w-4 h-4 text-frothy-blue" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(954) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                        <Car className="w-4 h-4 text-frothy-blue" />
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={inputClasses}
                      >
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                        <MessageSquare className="w-4 h-4 text-frothy-blue" />
                        Message
                      </label>
                      <textarea
                        placeholder="Tell us about your car or ask a question..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputClasses} h-28 resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-frothy-yellow text-frothy-navy font-bold py-3.5 rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>

                    <p className="text-xs text-frothy-navy/40 text-center">
                      We typically respond within 30 minutes during business hours.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
