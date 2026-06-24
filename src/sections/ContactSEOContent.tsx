import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'Where is Frothy Carwash Lounge located?',
    answer:
      "We're located at 2223 Pembroke Rd, Hollywood, FL 33020 — easy to reach from US-1, I-95, and Pembroke Road itself. We also regularly serve customers driving in from Hallandale Beach, Aventura, Dania Beach, and Pembroke Pines, most of whom are within a 10 to 20 minute drive.",
  },
  {
    question: 'What are your hours?',
    answer:
      'We are open seven days a week, 8:00 AM to 7:00 PM, including weekends and most holidays. Walk-ins are always welcome during business hours for hand washes — no appointment required.',
  },
  {
    question: 'Do I need to book an appointment?',
    answer:
      "Standard hand washes never require an appointment — just drive in. For full details, ceramic coating, or if you want to guarantee a specific time slot, we recommend calling ahead at (954) 510-3073 or booking online so we can set aside the right amount of time for your vehicle.",
  },
  {
    question: 'What is the best way to reach Frothy with a question?',
    answer:
      'Calling (954) 510-3073 is the fastest way to reach our team during business hours. You can also email info@frothycarwash.com or use the contact form on this page, and we typically respond within 30 minutes during business hours.',
  },
  {
    question: 'Is there parking and somewhere to wait?',
    answer:
      "Yes — there's on-site parking, and our indoor lounge has comfortable seating, free Wi-Fi, and specialty coffee while your car is being washed or detailed. Most hand washes take 15 to 35 minutes, and full details run from about an hour up to a full day for paint correction or ceramic coating, so you're welcome to wait in the lounge, run a quick errand nearby, or work remotely while we take care of your car.",
  },
]

export default function ContactSEOContent() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div className="bg-frothy-cream pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-4">
          Visiting Frothy Carwash Lounge in Hollywood, FL
        </h2>
        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            Frothy Carwash Lounge sits right on Pembroke Rd in Hollywood, FL, just minutes from US-1 and I-95 — easy to swing by whether you're running errands nearby or coming in specifically for a wash. We're open every day of the week, 8 AM to 7 PM, with no appointment needed for a standard hand wash or Inside &amp; Out package.
          </p>
          <p>
            If you're booking a <Link to="/ceramic" className="text-frothy-blue font-semibold hover:underline">ceramic coating</Link> appointment or a more involved <Link to="/services" className="text-frothy-blue font-semibold hover:underline">detail</Link>, we recommend calling ahead at <a href="tel:9545103073" className="text-frothy-blue font-semibold hover:underline">(954) 510-3073</a> so we can block out the right amount of time — these services take longer than a standard wash and scheduling ahead means no waiting. For everything else, just pull in.
          </p>
          <p>
            We're a regular stop for drivers throughout the area, including customers visiting from <Link to="/car-wash-hallandale-beach-fl" className="text-frothy-blue font-semibold hover:underline">Hallandale Beach</Link>, <Link to="/car-wash-aventura-fl" className="text-frothy-blue font-semibold hover:underline">Aventura</Link>, <Link to="/car-wash-dania-beach-fl" className="text-frothy-blue font-semibold hover:underline">Dania Beach</Link>, and <Link to="/car-wash-pembroke-pines-fl" className="text-frothy-blue font-semibold hover:underline">Pembroke Pines</Link>. Stop by, call, or send a message using the form on this page — whatever's easiest for you.
          </p>
          <p>
            Whether you're calling to ask about <Link to="/memberships" className="text-frothy-blue font-semibold hover:underline">membership pricing</Link>, want to schedule a <Link to="/ceramic" className="text-frothy-blue font-semibold hover:underline">ceramic coating</Link> appointment, or just want to confirm we have your size of vehicle covered, our team would rather talk it through with you than have you guess. The contact form on this page goes straight to our team and is a good option if you'd rather not call right away — just note your preferred service and we'll follow up with next steps and accurate pricing.
          </p>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-6">
          Contact &amp; Visit FAQs
        </h2>
        <div className="space-y-5 mb-4">
          {faqs.map((item) => (
            <div key={item.question} className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-heading text-lg text-frothy-navy mb-2">{item.question}</h3>
              <p className="text-frothy-navy/70 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
