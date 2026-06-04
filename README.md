import { useState } from 'react'
import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { Check, ChevronDown, Phone, Star } from 'lucide-react'
import BookingModal from '../components/BookingModal'

const basicWashes = [
  {
    name: 'Exterior Wash',
    tagline: 'The quick clean refresh',
    price: '$25',
    priceNote: 'sedan & SUV/Truck',
    features: ['Hand wash exterior', 'Rinse & hand dry', 'Window cleaning', 'Tire & wheel cleaning', 'Door jamb wipe-down'],
    featured: false,
  },
  {
    name: 'Interior Vacuum',
    tagline: 'Inside freshened up',
    price: '$35',
    priceNote: 'sedan · $40 SUV/Truck',
    features: ['Full interior vacuum', 'Floor & mat vacuuming', 'Seat vacuuming', 'Trunk vacuum'],
    featured: false,
  },
  {
    name: 'Inside & Out Wash',
    tagline: 'Full interior + exterior · ~35 min',
    price: '$40',
    priceNote: 'sedan · $50 SUV/Truck',
    features: ['Hand wash exterior', 'Wheels & tire cleaning', 'Hand dry', 'Full interior vacuum', 'Dashboard & console wipe-down', 'Door panels cleaned', 'Interior & exterior windows', 'Floor mat cleaning'],
    featured: true,
    badge: 'Most Popular',
  },
]

const detailPackages = [
  {
    name: 'Signature Detail',
    tagline: 'Deep clean + UV protect + spray wax · ~1 hour',
    price: '$65',
    priceNote: 'sedan · $75 SUV/Truck',
    features: ['Everything in Inside & Out', 'Spray wax exterior', 'UV paint protection', 'Tire dressing', 'Trim wipe-down', 'Air freshener'],
    featured: false,
  },
  {
    name: 'Executive Finish',
    tagline: 'Shampoo + leather + premium wax + trim restore',
    price: '$95',
    priceNote: 'sedan · $105 SUV/Truck',
    features: ['Everything in Signature Detail', 'Seat & carpet shampoo', 'Leather cleaning & conditioning', 'Premium hand wax', 'Trim restoration', 'Engine bay wipe-down'],
    featured: true,
    badge: 'Best Value',
  },
  {
    name: 'Full Detail Package',
    tagline: 'Complete inside-out restoration',
    price: '$199',
    priceNote: 'sedan · $249 SUV/Truck',
    features: ['Everything in Executive Finish', 'Clay bar decontamination', 'Iron decontamination', 'Full carpet extraction', 'Headliner cleaning', 'Paint sealant application'],
    featured: false,
  },
  {
    name: 'Showroom Detail',
    tagline: 'The ultimate treatment',
    price: '$299',
    priceNote: 'sedan · $399 SUV/Truck',
    features: ['Everything in Full Detail', 'Paint correction (1-step polish)', 'Full interior steam clean', 'Ozone odor treatment', 'Wheel ceramic sealant', 'Glass ceramic coating', 'Certificate of completion'],
    featured: false,
  },
]

const interiorAddOns = [
  { name: 'Pet Hair Removal', price: '$15–$50' },
  { name: 'Seat Shampoo', price: '$40–$80' },
  { name: 'Carpet Shampoo', price: '$40–$80' },
  { name: 'Full Interior Extraction', price: '$99–$199' },
  { name: 'Leather Cleaning', price: '$40–$80' },
  { name: 'Leather Conditioning', price: '$30–$60' },
  { name: 'Plastic Trim Dressing', price: '$15' },
  { name: 'Odor Removal', price: '$30–$75' },
  { name: 'Ozone Treatment', price: '$50–$100' },
  { name: 'Child Seat Cleaning', price: '$20–$40' },
  { name: 'Headliner Cleaning', price: '$40–$80' },
  { name: 'Steam Cleaning', price: '$50–$150' },
  { name: 'Interior Sanitization', price: '$25–$50' },
  { name: 'Mold Remediation', price: '$100–$300' },
]

const exteriorAddOns = [
  { name: 'Hand Wax', price: '$40–$60' },
  { name: 'Spray Wax', price: '$15–$25' },
  { name: 'Clay Bar Treatment', price: '$50–$100' },
  { name: 'Iron Decontamination', price: '$50–$100' },
  { name: 'Tar Removal', price: '$25–$75' },
  { name: 'Bug Removal', price: '$15–$30' },
  { name: 'Water Spot Removal', price: '$50–$150' },
  { name: 'Tree Sap Removal', price: '$30–$100' },
  { name: 'Paint Decontamination', price: '$75–$150' },
  { name: 'Chrome Polishing', price: '$25–$75' },
  { name: 'Engine Bay Cleaning', price: '$40–$80' },
  { name: 'Wheel Deep Cleaning', price: '$25–$50' },
  { name: 'Tire Dressing', price: '$10–$20' },
  { name: 'Trim Restoration', price: '$50–$150' },
]

const paintCorrectionServices = [
  { name: 'One-Step Polish', price: '$150–$300' },
  { name: 'Two-Step Paint Correction', price: '$300–$700' },
  { name: 'Three-Step Paint Correction', price: '$700–$1,500' },
  { name: 'Swirl Mark Removal', price: '$200–$600' },
  { name: 'Light Scratch Removal', price: '$75–$300' },
  { name: 'Heavy Scratch Removal', price: 'Quote' },
  { name: 'Oxidation Removal', price: '$150–$500' },
  { name: 'Paint Enhancement', price: '$190–$300' },
]

const headlightGlassServices = [
  { name: 'Headlight Restoration', price: '$75–$150' },
  { name: 'Taillight Restoration', price: '$50–$100' },
  { name: 'Windshield Water Repellent', price: '$25–$50' },
  { name: 'Glass Polishing', price: '$75–$200' },
  { name: 'Water Spot Glass Correction', price: '$50–$150' },
]

const specialtyServices = [
  { name: 'Convertible Top Cleaning', price: '$50–$150' },
  { name: 'Convertible Top Protection', price: '$50–$150' },
  { name: 'Vinyl Wrap Maintenance', price: '$75–$150' },
  { name: 'PPF Maintenance', price: '$75–$150' },
  { name: 'Decal Removal', price: '$50–$200' },
  { name: 'Sticker Removal', price: '$20–$100' },
  { name: 'Overspray Removal', price: '$100–$500' },
  { name: 'Smoke Removal', price: '$150–$400' },
  { name: 'Flood Cleanup', price: 'Quote' },
  { name: 'Biohazard Cleanup', price: 'Quote' },
]

const fleetLuxuryServices = [
  { name: 'Fleet Wash', price: 'Custom' },
  { name: 'Dealer Prep', price: 'Custom' },
  { name: 'Rental Car Turnaround', price: 'Custom' },
  { name: 'Corporate Vehicle Maintenance', price: 'Custom' },
  { name: 'Concierge Pick-Up & Delivery', price: '$25–$75' },
  { name: 'VIP Same-Day Service', price: '+$25 Premium' },
  { name: 'Airport Vehicle Detailing', price: '$100–$300' },
  { name: 'Boat Wash (20–25 ft)', price: '$8–$15/ft' },
  { name: 'RV Wash', price: '$10–$20/ft' },
  { name: 'Motorcycle Detail', price: '$100–$250' },
]

function ServiceCard({ service, onBook }: { service: typeof basicWashes[0]; onBook: () => void }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow ${
      service.featured ? 'ring-2 ring-frothy-blue' : ''
    }`}>
      <div className={`px-6 py-5 ${service.featured ? 'bg-frothy-blue' : 'bg-frothy-navy'}`}>
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`font-heading text-xl ${service.featured ? 'text-white' : 'text-frothy-yellow'}`}>
            {service.name}
          </h3>
          {service.badge && (
            <span className="bg-frothy-yellow text-frothy-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {service.badge}
            </span>
          )}
        </div>
        <p className={`text-sm ${service.featured ? 'text-white/70' : 'text-frothy-foam/60'}`}>
          {service.tagline}
        </p>
        <div className="mt-3">
          <span className={`font-heading text-3xl font-bold ${service.featured ? 'text-white' : 'text-frothy-yellow'}`}>
            {service.price}
          </span>
          <span className={`text-sm ml-2 ${service.featured ? 'text-white/60' : 'text-frothy-foam/50'}`}>
            {service.priceNote}
          </span>
        </div>
      </div>
      <div className="bg-white p-6">
        <ul className="space-y-2.5 mb-6">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-frothy-navy/80">
              <Check className="w-4 h-4 text-frothy-blue flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onBook}
          className={`w-full font-bold py-3 rounded-xl transition-all hover:scale-[1.02] ${
            service.featured
              ? 'bg-frothy-blue text-white hover:bg-frothy-blue/90'
              : 'bg-frothy-navy text-frothy-yellow hover:bg-frothy-navy-light'
          }`}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

function AddOnTable({ title, items }: { title: string; items: { name: string; price: string }[] }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-frothy-foam/50 transition-colors"
      >
        <h3 className="font-body font-bold text-frothy-navy">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-frothy-navy/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="border-t border-frothy-foam pt-3 space-y-2">
            {items.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-center justify-between py-2 px-3 rounded-lg ${i % 2 === 0 ? 'bg-frothy-foam/50' : ''}`}
              >
                <span className="text-sm font-medium text-frothy-navy">{item.name}</span>
                <span className="text-sm font-bold text-frothy-blue">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Services() {
  useSEO(PAGE_SEO.services)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingService, setBookingService] = useState('Inside & Out Wash ($40)')

  const openBooking = (serviceName: string, price: string) => {
    setBookingService(`${serviceName} (${price})`)
    setBookingOpen(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hand-wash.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-frothy-blue/20 text-frothy-blue text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Services & Pricing
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-frothy-yellow leading-[1.1] mb-4">
            Every wash, done by hand.
          </h1>
          <p className="text-frothy-foam/70 text-lg max-w-xl mb-4">
            No machines. No tunnels. Just skilled hands and genuine care for your car.
          </p>
          <p className="text-frothy-blue text-sm font-semibold flex items-center gap-2">
            <Star className="w-4 h-4" />
            All prices shown for sedan · SUV/Truck pricing noted where different.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Basic Washes */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Basic Wash Services
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Start with the essentials.</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {basicWashes.map((service) => (
                <ServiceCard key={service.name} service={service} onBook={() => openBooking(service.name, service.price)} />
              ))}
            </div>
          </div>

          {/* Detail Packages */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Detail Packages
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Go deeper.</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {detailPackages.map((service) => (
                <ServiceCard key={service.name} service={service} onBook={() => openBooking(service.name, service.price)} />
              ))}
            </div>
          </div>

          {/* Add-Ons */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Add-Ons
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Customize your clean.</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <AddOnTable title="Interior Add-Ons" items={interiorAddOns} />
              <AddOnTable title="Exterior Add-Ons" items={exteriorAddOns} />
            </div>
          </div>

          {/* Paint Correction */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Paint Correction
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Restore the finish.</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <AddOnTable title="Paint Correction Services" items={paintCorrectionServices} />
              <AddOnTable title="Headlights & Glass" items={headlightGlassServices} />
            </div>
          </div>

          {/* Specialty + Fleet */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Specialty & Fleet
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Beyond the everyday.</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <AddOnTable title="Specialty Services" items={specialtyServices} />
              <AddOnTable title="Fleet & Luxury" items={fleetLuxuryServices} />
            </div>
          </div>

          {/* CTA */}
          <div className="bg-frothy-navy rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl text-frothy-yellow mb-1">Not sure which service?</h3>
              <p className="text-frothy-foam/60 text-sm">Call us — we'll recommend the right package for your car and budget.</p>
            </div>
            <a
              href="tel:9545103073"
              className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold px-6 py-3.5 rounded-xl hover:scale-105 transition-transform whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Call (954) 510-3073
            </a>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService={bookingService} />
    </>
  )
}
