import { Link } from 'react-router-dom'

export default function AboutSEOContent() {
  return (
    <div className="bg-frothy-cream pb-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-4">
          Hollywood, FL's neighborhood hand car wash
        </h2>
        <div className="text-frothy-navy/70 text-[15px] leading-relaxed space-y-4 mb-12">
          <p>
            Frothy Carwash Lounge opened at 2223 Pembroke Rd in Hollywood, FL with a straightforward goal: build the kind of car wash we'd actually want to visit ourselves. South Florida has plenty of automatic tunnel washes, but very few places that combine real hand-wash craftsmanship with a space worth spending time in. We set out to change that for Hollywood, and for drivers from <Link to="/car-wash-hallandale-beach-fl" className="text-frothy-blue font-semibold hover:underline">Hallandale Beach</Link>, <Link to="/car-wash-aventura-fl" className="text-frothy-blue font-semibold hover:underline">Aventura</Link>, <Link to="/car-wash-dania-beach-fl" className="text-frothy-blue font-semibold hover:underline">Dania Beach</Link>, and <Link to="/car-wash-pembroke-pines-fl" className="text-frothy-blue font-semibold hover:underline">Pembroke Pines</Link> who make the short drive in.
          </p>
          <p>
            Every car that comes through our doors is washed entirely by hand — no machines, no spinning brushes, no shortcuts. That commitment to hand washing is why we've built a loyal base of customers who trust us with everything from daily commuters to weekend exotics. We've now hand washed and detailed more than 2,000 vehicles, and our 5.0 Google rating reflects the same standard we hold ourselves to on every single car, every day.
          </p>
          <p>
            What sets Frothy apart isn't just the wash itself — it's the experience around it. Our indoor lounge has comfortable seating, specialty coffee, and free Wi-Fi, so the time your car spends being cared for feels like a break in your day rather than a wait to get through. We're open seven days a week from 8 AM to 7 PM, walk-ins are always welcome, and our team is happy to recommend the right <Link to="/services" className="text-frothy-blue font-semibold hover:underline">service or package</Link> for your car and your budget.
          </p>
          <p>
            As we've grown, we've added <Link to="/ceramic" className="text-frothy-blue font-semibold hover:underline">ceramic coating</Link> and monthly <Link to="/memberships" className="text-frothy-blue font-semibold hover:underline">membership plans</Link> to give Hollywood drivers more ways to protect their investment and keep their car looking its best year-round. Whatever brought you here — a quick wash, a full detail, or long-term paint protection — we built Frothy to make that experience better than anywhere else in Hollywood, FL.
          </p>
          <p>
            Our team is made up of people who genuinely care about doing the job right, not just getting through the line. That shows up in the small things: double-checking door jambs and wheel wells that automatic washes skip, taking the time to treat leather and trim properly instead of rushing through an interior, and being upfront if your car needs paint correction before a ceramic coating will actually hold. We'd rather tell you the truth about what your car needs than upsell you on something it doesn't.
          </p>
          <p>
            If you're searching for a car wash near Hollywood, FL that treats your vehicle — and your time — with real care, stop by and see the difference for yourself. No appointment is needed for a standard hand wash, and our team is always happy to answer questions about pricing, ceramic coating, or which membership plan fits how you actually drive.
          </p>
        </div>
      </div>
    </div>
  )
}
