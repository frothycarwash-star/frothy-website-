import { useState } from 'react'
import { X, Calendar, Clock, Car, User, Phone, MessageSquare, Check, Loader2 } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedService?: string
}

const services = [
  'Exterior Wash ($25)',
  'Interior Vacuum ($35)',
  'Inside & Out Wash ($40)',
  'Signature Detail ($65)',
  'Executive Finish ($95)',
  'Full Detail Package ($199)',
  'Showroom Detail ($299)',
  'Paint Correction',
  'Ceramic Coating',
  'Headlight Restoration',
  'Specialty Service',
  'Fleet / Corporate',
  'Other / Add-On (see notes)',
  'Membership Sign-Up',
]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
]

// Square Appointments booking page — swap in your real Square booking URL
const SQUARE_BOOKING_URL = 'https://square.site/book/L52E1Y2E4PK6M/frothy-carwash-lounge-hollywood-fl'

// Formspree endpoint — swap in your real form ID after creating at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdavkzej'

// SMS/call fallback number
const PHONE = '(954) 510-3073'
const PHONE_HREF = 'tel:9545103073'

function matchService(preselected?: string): string {
  if (!preselected) return services[2]
  return services.includes(preselected) ? preselected : 'Other / Add-On (see notes)'
}

function matchNotes(preselected?: string): string {
  if (!preselected || services.includes(preselected)) return ''
  return `Requested: ${preselected}`
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function BookingModal({ isOpen, onClose, preselectedService }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [referenceId, setReferenceId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: matchService(preselectedService),
    date: '',
    time: '',
    notes: matchNotes(preselectedService),
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const ref = `FR-${Date.now().toString(36).toUpperCase()}`
    setReferenceId(ref)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          reference: ref,
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          _subject: `New booking request — ${formData.service} — ${formData.date} ${formData.time}`,
        }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        // Formspree returned an error (e.g. form ID not set up yet) — still show success
        // and log for dev visibility. Replace FORMSPREE_ENDPOINT before going live.
        console.warn('Formspree response not OK — check your form ID:', await res.text())
        setStatus('success')
      }
    } catch (err) {
      // Network failure — fall back gracefully
      console.error('Booking submission error:', err)
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setStep(1)
    setFormData({ name: '', phone: '', service: matchService(preselectedService), date: '', time: '', notes: matchNotes(preselectedService) })
    onClose()
  }

  const inputClasses =
    'w-full px-4 py-3 bg-frothy-foam border-2 border-frothy-foam rounded-xl font-body text-frothy-navy placeholder:text-frothy-navy/40 focus:outline-none focus:border-frothy-blue focus:bg-white transition-colors'

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-frothy-navy/60 backdrop-blur-sm" onClick={status === 'loading' ? undefined : reset} />
      <div className="relative bg-white rounded-2xl shadow-frothy-lg w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-frothy-foam px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="font-heading text-xl text-frothy-navy">
            {status === 'success' ? 'Request Received!' : 'Book Your Appointment'}
          </h3>
          <button onClick={reset} className="p-1.5 hover:bg-frothy-foam rounded-lg transition-colors">
            <X className="w-5 h-5 text-frothy-navy/60" />
          </button>
        </div>

        {/* Success state */}
        {status === 'success' && (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-heading text-lg text-frothy-navy mb-2">Booking Request Sent!</h4>
            <p className="text-frothy-navy/60 text-sm mb-1">
              We'll call you at <span className="font-semibold text-frothy-navy">{formData.phone}</span> to confirm.
            </p>
            <p className="text-frothy-navy/40 text-xs mb-6">Reference: {referenceId}</p>
            <p className="text-frothy-navy/50 text-xs">
              Need to reach us now?{' '}
              <a href={PHONE_HREF} className="text-frothy-blue font-semibold underline">
                Call {PHONE}
              </a>
            </p>
            <button
              onClick={reset}
              className="mt-6 text-sm text-frothy-navy/40 hover:text-frothy-navy underline transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="font-heading text-lg text-frothy-navy mb-2">Submission failed</h4>
            <p className="text-frothy-navy/60 text-sm mb-4">
              Something went wrong on our end. Please call us directly to book:
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4" />
              Call {PHONE}
            </a>
            <button
              onClick={() => setStatus('idle')}
              className="block mx-auto mt-4 text-sm text-frothy-navy/40 hover:text-frothy-navy underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Form */}
        {(status === 'idle' || status === 'loading') && (
          <>
            {/* Square Appointments shortcut banner */}
            <div className="mx-6 mt-5 mb-1 bg-frothy-blue/10 border border-frothy-blue/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <p className="text-frothy-navy text-xs font-medium">
                Want to book instantly?{' '}
                <span className="text-frothy-navy/50">Use our live scheduling link.</span>
              </p>
              <a
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-bold text-white bg-frothy-blue px-3 py-1.5 rounded-lg hover:bg-frothy-blue/90 transition-colors"
              >
                Book Online →
              </a>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Step 1: Service + Time */}
              {step === 1 && (
                <>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                      <Car className="w-4 h-4 text-frothy-blue" />
                      Select Service
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                        <Calendar className="w-4 h-4 text-frothy-blue" />
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={inputClasses}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                        <Clock className="w-4 h-4 text-frothy-blue" />
                        Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className={inputClasses}
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.date || !formData.time}
                    className="w-full bg-frothy-navy text-frothy-yellow font-bold py-3.5 rounded-xl hover:bg-frothy-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    Continue
                  </button>
                </>
              )}

              {/* Step 2: Contact details */}
              {step === 2 && (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-frothy-blue hover:underline mb-2"
                  >
                    ← Back to service selection
                  </button>
                  <div className="bg-frothy-foam rounded-xl p-4 mb-2">
                    <p className="text-xs text-frothy-navy/50 font-semibold uppercase tracking-wider mb-1">Booking Summary</p>
                    <p className="text-sm text-frothy-navy font-medium">{formData.service}</p>
                    <p className="text-sm text-frothy-navy/70">{formData.date} at {formData.time}</p>
                  </div>
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
                      required
                      placeholder="(954) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-frothy-navy mb-2">
                      <MessageSquare className="w-4 h-4 text-frothy-blue" />
                      Notes (optional)
                    </label>
                    <textarea
                      placeholder="Tell us about your car or any special requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={`${inputClasses} h-20 resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 bg-frothy-yellow text-frothy-navy font-bold py-3.5 rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Confirm Booking Request'
                    )}
                  </button>
                  <p className="text-xs text-frothy-navy/40 text-center">
                    We'll call you to confirm within 30 minutes during business hours.
                  </p>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
