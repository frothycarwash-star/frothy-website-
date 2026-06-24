import { useState } from 'react'
import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { Check, ChevronDown, Phone, Star, Car, Truck } from 'lucide-react'
import BookingModal from '../components/BookingModal'
import RelatedLinks from '../components/RelatedLinks'
import ServicesSEOContent from '../sections/ServicesSEOContent'
import {
  interiorAddOns,
  exteriorAddOns,
  paintCorrectionServices,
  headlightGlassServices,
  specialtyServices,
  fleetLuxuryServices,
} from '../data/addOns'

type Vehicle = 'sedan' | 'suv'

const basicWashes = [
  {
    name: 'Exterior Wash',
    tagline: 'The quick clean refresh',
    sedanPrice: 25,
    suvPrice: 25,
    features: ['Hand wash exterior', 'Rinse & hand dry', 'Window cleaning', 'Tire & wheel cleaning', 'Door jamb wipe-down'],
    featured: false,
  },
  {
    name: 'Interior Vacuum',
    tagline: 'Inside freshened up',
    sedanPrice: 35,
    suvPrice: 40,
    features: ['Full interior vacuum', 'Floor & mat vacuuming', 'Seat vacuuming', 'Trunk vacuum'],
    featured: false,
  },
  {
    name: 'Inside & Out Wash',
    tagline: 'Full interior + exterior · ~35 min',
    sedanPrice: 40,
    suvPrice: 50,
    features: ['Hand wash exterior', 'Wheels & tire cleaning', 'Hand dry', 'Full interior vacuum', 'Dashboard & console wipe-down', 'Door panels cleaned', 'Interior & exterior windows', 'Floor mat cleaning'],
    featured: true,
    badge: 'Most Popular',
  },
]

const detailPackages = [
  {
    name: 'Signature Detail',
    tagline: 'Deep clean + UV protect + spray wax · ~1 hour',
    sedanPrice: 65,
    suvPrice: 75,
    features: ['Everything in Inside & Out', 'Spray wax exterior', 'UV paint protection', 'Tire dressing', 'Trim wipe-down', 'Air freshener'],
    featured: false,
  },
  {
    name: 'Executive Finish',
    tagline: 'Shampoo + leather + premium wax + trim restore',
    sedanPrice: 95,
    suvPrice: 105,
    features: ['Everything in Signature Detail', 'Seat & carpet shampoo', 'Leather cleaning & conditioning', 'Premium hand wax', 'Trim restoration', 'Engine bay wipe-down'],
    featured: true,
    badge: 'Best Value',
  },
  {
    name: 'Full Detail Package',
    tagline: 'Complete inside-out restoration',
    sedanPrice: 199,
    suvPrice: 249,
    features: ['Everything in Executive Finish', 'Clay bar decontamination', 'Iron decontamination', 'Full carpet extraction', 'Headliner cleaning', 'Paint sealant application'],
    featured: false,
  },
  {
    name: 'Showroom Detail',
    tagline: 'The ultimate treatment',
    sedanPrice: 299,
    suvPrice: 399,
    features: ['Everything in Full Detail', 'Paint correction (1-step polish)', 'Full interior steam clean', 'Ozone odor treatment', 'Wheel ceramic sealant', 'Glass ceramic coating', 'Certificate of completion'],
    featured: false,
  },
]


function ServiceCard({ service, vehicle, onBook }: { service: typeof basicWashes[0]; vehicle: Vehicle; onBook: () => void }) {
  const price = vehicle === 'sedan' ? service.sedanPrice : service.suvPrice
  return (
    <div className={`h-full flex flex-col rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow ${
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
            ${price}
          </span>
          <span className={`text-sm ml-2 ${service.featured ? 'text-white/60' : 'text-frothy-foam/60'}`}>
            {vehicle === 'sedan' ? 'sedan' : 'SUV/Truck'}
          </span>
        </div>
      </div>
      <div className="bg-white p-6 flex flex-col flex-1">
        <ul className="space-y-2.5 mb-6 flex-1">
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

function AddOnTable({ title, items, onBook }: { title: string; items: { name: string; price: string }[]; onBook: (name: string, price: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-frothy-foam/50 transition-colors"
      >
        <h3 className="font-body font-bold text-frothy-navy">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-frothy-navy/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="border-t border-frothy-foam pt-3 space-y-2">
            {items.map((item, i) => (
              <button
                key={item.name}
                onClick={() => onBook(item.name, item.price)}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-left hover:bg-frothy-blue/10 transition-colors ${i % 2 === 0 ? 'bg-frothy-foam/50' : ''}`}
              >
                <span className="text-sm font-medium text-frothy-navy">{item.name}</span>
                <span className="text-sm font-bold text-frothy-blue">{item.price}</span>
              </button>
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
  const [vehicle, setVehicle] = useState<Vehicle>('sedan')

  const openBooking = (serviceName: string, price: string) => {
    setBookingService(`${serviceName} (${price})`)
    setBookingOpen(true)
  }

  const openServiceBooking = (service: { name: string; sedanPrice: number; suvPrice: number }) => {
    const price = vehicle === 'sedan' ? service.sedanPrice : service.suvPrice
    openBooking(`${service.name} (${vehicle === 'sedan' ? 'Sedan' : 'SUV/Truck'})`, `$${price}`)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-frothy-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hand-car-wash-service-hollywood-fl.jpg" alt="Hand washing a car exterior at Frothy Carwash Lounge in Hollywood, FL" className="w-full h-full object-cover" />
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
            Select your vehicle type below for accurate pricing on washes & detail packages.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-frothy-yellow to-frothy-blue" />

      <div className="bg-frothy-cream section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Vehicle Toggle */}
          <div className="flex flex-col items-center mb-10">
            <p className="text-frothy-navy/70 text-sm font-semibold mb-3">Select your vehicle type to see accurate pricing</p>
            <div className="inline-flex bg-white rounded-xl shadow-card p-1.5 gap-1">
              <button
                onClick={() => setVehicle('sedan')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  vehicle === 'sedan' ? 'bg-frothy-navy text-frothy-yellow' : 'text-frothy-navy/70 hover:text-frothy-navy'
                }`}
              >
                <Car className="w-4 h-4" />
                Sedan / Car
              </button>
              <button
                onClick={() => setVehicle('suv')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  vehicle === 'suv' ? 'bg-frothy-navy text-frothy-yellow' : 'text-frothy-navy/70 hover:text-frothy-navy'
                }`}
              >
                <Truck className="w-4 h-4" />
                SUV / Truck
              </button>
            </div>
          </div>

          {/* Basic Washes */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Basic Wash Services
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Start with the essentials.</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {basicWashes.map((service) => (
                <ServiceCard key={service.name} service={service} vehicle={vehicle} onBook={() => openServiceBooking(service)} />
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
                <ServiceCard key={service.name} service={service} vehicle={vehicle} onBook={() => openServiceBooking(service)} />
              ))}
            </div>
          </div>

          {/* Add-Ons */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Add-Ons
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-3">Customize your clean.</h2>
            <p className="text-frothy-navy/70 text-sm mb-6">
              Tap any add-on to request it, or{' '}
              <a
                href="https://square.site/book/L52E1Y2E4PK6M/frothy-carwash-lounge-hollywood-fl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-frothy-blue font-semibold underline"
              >
                book online
              </a>{' '}
              to pick exact options (vehicle size, severity, quantity) and see live pricing.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <AddOnTable title="Interior Add-Ons" items={interiorAddOns} onBook={openBooking} />
              <AddOnTable title="Exterior Add-Ons" items={exteriorAddOns} onBook={openBooking} />
            </div>
          </div>

          {/* Paint Correction */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Paint Correction
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Restore the finish.</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <AddOnTable title="Paint Correction Services" items={paintCorrectionServices} onBook={openBooking} />
              <AddOnTable title="Headlights & Glass" items={headlightGlassServices} onBook={openBooking} />
            </div>
          </div>

          {/* Specialty + Fleet */}
          <div className="mb-14">
            <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
              Specialty & Fleet
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-frothy-navy mb-8">Beyond the everyday.</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <AddOnTable title="Specialty Services" items={specialtyServices} onBook={openBooking} />
              <AddOnTable title="Fleet & Luxury" items={fleetLuxuryServices} onBook={openBooking} />
            </div>
          </div>

          <RelatedLinks
            links={[
              { label: 'Ceramic Coating Packages', to: '/ceramic' },
              { label: 'Monthly Memberships', to: '/memberships' },
              { label: 'Hand Car Wash in Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
              { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
            ]}
          />

          {/* CTA */}
          <div className="bg-frothy-navy rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
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

      <ServicesSEOContent />

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedService={bookingService} />
    </>
  )
}
