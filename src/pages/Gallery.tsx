import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { X, Camera } from 'lucide-react'
import RelatedLinks from '../components/RelatedLinks'
import GallerySEOContent from '../sections/GallerySEOContent'

const categories = ['All', 'Hand Wash', 'Full Detail', 'Interior', 'Fleet & Luxury', 'Our Lounge']

const photos = [
  { src: '/images/hand-suds-wash-on-a-black-mercedes-benz.webp', alt: 'Hand suds wash on a black Mercedes-Benz', category: 'Hand Wash' },
  { src: '/images/white-corvette-covered-in-foam-rear-three-quarter.webp', alt: 'White Corvette covered in foam, rear three-quarter view', category: 'Hand Wash' },
  { src: '/images/white-corvette-covered-in-foam-front-view.webp', alt: 'White Corvette covered in foam, front view', category: 'Hand Wash' },
  { src: '/images/black-bmw-m2-after-a-full-detail.webp', alt: 'Black BMW M2 after a full detail', category: 'Full Detail' },
  { src: '/images/lamborghini-gold-wheel-and-brake-caliper-close-up.webp', alt: 'Lamborghini gold wheel and brake caliper close-up', category: 'Full Detail' },
  { src: '/images/before-and-after-interior-detail-seats-and-dashboard.webp', alt: 'Before and after interior detail — seats and dashboard', category: 'Interior' },
  { src: '/images/lamborghini-door-panel-with-yellow-stitching-detail.webp', alt: 'Lamborghini door panel with yellow stitching detail', category: 'Interior' },
  { src: '/images/green-lamborghini-urus-parked-at-the-carwash-after.webp', alt: 'Green Lamborghini Urus parked at the carwash after a full detail', category: 'Full Detail' },
  { src: '/images/white-mclaren-570s-with-door-open-during-a.webp', alt: 'White McLaren 570S with door open during a full detail', category: 'Fleet & Luxury' },
  { src: '/images/red-porsche-macan-after-a-hand-wash-glossy.webp', alt: 'Red Porsche Macan after a hand wash, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/blue-maserati-levante-after-a-full-detail.webp', alt: 'Blue Maserati Levante after a full detail', category: 'Fleet & Luxury' },
  { src: '/images/clean-tan-leather-truck-interior-after-a-detail.webp', alt: 'Clean tan leather truck interior after a detail', category: 'Interior' },
  { src: '/images/heavily-soiled-cloth-seat-before-an-interior-deep.webp', alt: 'Heavily soiled cloth seat before an interior deep clean', category: 'Interior' },
  { src: '/images/rear-bench-seat-after-a-full-interior-detail.webp', alt: 'Rear bench seat after a full interior detail', category: 'Interior' },
  { src: '/images/red-lexus-nx-rear-view-after-a-hand.webp', alt: 'Red Lexus NX rear view after a hand wash', category: 'Hand Wash' },
  { src: '/images/clean-detailed-engine-bay-close-up.webp', alt: 'Clean detailed engine bay close-up', category: 'Full Detail' },
  { src: '/images/white-corvette-covered-in-foam-rear-close-up.webp', alt: 'White Corvette covered in foam, rear close-up', category: 'Hand Wash' },
  { src: '/images/white-corvette-hood-covered-in-foam-suds.webp', alt: 'White Corvette hood covered in foam suds', category: 'Hand Wash' },
  { src: '/images/black-bmw-m2-getting-hand-washed-by-our.webp', alt: 'Black BMW M2 getting hand washed by our team', category: 'Full Detail' },
  { src: '/images/lamborghini-gold-wheel-and-brake-caliper-close-up-2.webp', alt: 'Lamborghini gold wheel and brake caliper close-up', category: 'Fleet & Luxury' },
  { src: '/images/lamborghini-urus-steering-wheel-and-digital-dash.webp', alt: 'Lamborghini Urus steering wheel and digital dash', category: 'Fleet & Luxury' },
  { src: '/images/dark-green-lamborghini-urus-after-a-full-detail.webp', alt: 'Dark green Lamborghini Urus after a full detail', category: 'Fleet & Luxury' },
  { src: '/images/classic-mercedes-convertible-getting-hand-washed.webp', alt: 'Classic Mercedes convertible getting hand washed', category: 'Hand Wash' },
  { src: '/images/black-bmw-x7-covered-in-foam-with-our.webp', alt: 'Black BMW X7 covered in foam with our team washing', category: 'Hand Wash' },
  { src: '/images/black-bmw-7-series-rear-view-after-a.webp', alt: 'Black BMW 7 Series rear view after a full detail', category: 'Full Detail' },
  { src: '/images/suv-covered-in-foam-with-our-team-hand.webp', alt: 'SUV covered in foam with our team hand washing', category: 'Hand Wash' },
  { src: '/images/white-mercedes-amg-g63-covered-in-foam-during.webp', alt: 'White Mercedes-AMG G63 covered in foam during a hand wash', category: 'Hand Wash' },
  { src: '/images/black-bentley-continental-gt-after-a-full-detail.webp', alt: 'Black Bentley Continental GT after a full detail', category: 'Fleet & Luxury' },
  { src: '/images/clean-tan-door-panel-close-up-after-an.webp', alt: 'Clean tan door panel close-up after an interior detail', category: 'Interior' },
  { src: '/images/black-bmw-m5-front-three-quarter-view-glossy.webp', alt: 'Black BMW M5 front three-quarter view, glossy finish', category: 'Full Detail' },
  { src: '/images/frothy-carwash-lounge-front-desk-and-snack-counter.webp', alt: 'Frothy Carwash Lounge front desk and snack counter', category: 'Our Lounge' },
  { src: '/images/massage-chairs-in-the-frothy-carwash-lounge.webp', alt: 'Massage chairs in the Frothy Carwash Lounge', category: 'Our Lounge' },
  { src: '/images/frothy-carwash-lounge-seating-and-waiting-area.webp', alt: 'Frothy Carwash Lounge seating and waiting area', category: 'Our Lounge' },
  { src: '/images/red-jeep-gladiator-side-view-clean-exterior.webp', alt: 'Red Jeep Gladiator side view, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/red-jeep-wrangler-front-end-clean-exterior.webp', alt: 'Red Jeep Wrangler front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-front-view-glossy-finish.webp', alt: 'White Porsche 911 front view, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-rear-three-quarter-view.webp', alt: 'White Porsche 911 rear three-quarter view', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-convertible-rear-view.webp', alt: 'White Porsche 911 convertible rear view', category: 'Fleet & Luxury' },
  { src: '/images/mercedes-amg-g63-front-end-clean-exterior.webp', alt: 'Mercedes-AMG G63 front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/black-mercedes-amg-g-wagon-front-end.webp', alt: 'Black Mercedes-AMG G-Wagon front end', category: 'Fleet & Luxury' },
  { src: '/images/black-corvette-low-front-angle-glossy-finish.webp', alt: 'Black Corvette low front angle, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/black-corvette-front-three-quarter-view.webp', alt: 'Black Corvette front three-quarter view', category: 'Fleet & Luxury' },
  { src: '/images/black-corvette-roof-and-rear-angle.webp', alt: 'Black Corvette roof and rear angle', category: 'Fleet & Luxury' },
  { src: '/images/black-corvette-rear-quarter-view.webp', alt: 'Black Corvette rear quarter view', category: 'Fleet & Luxury' },
  { src: '/images/black-corvette-rear-quarter-alternate-angle.webp', alt: 'Black Corvette rear quarter, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-front-view-alternate-angle.webp', alt: 'White Porsche 911 front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/black-maserati-covered-in-foam-during-a-hand.webp', alt: 'Black Maserati covered in foam during a hand wash', category: 'Hand Wash' },
  { src: '/images/black-maserati-front-end-clean-exterior.webp', alt: 'Black Maserati front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/black-mercedes-amg-gt-front-end.webp', alt: 'Black Mercedes-AMG GT front end', category: 'Fleet & Luxury' },
  { src: '/images/black-sedan-parked-at-the-frothy-entrance.webp', alt: 'Black sedan parked at the Frothy entrance', category: 'Fleet & Luxury' },
  { src: '/images/tan-leather-interior-and-dashboard-close-up.webp', alt: 'Tan leather interior and dashboard close-up', category: 'Interior' },
  { src: '/images/white-hatchback-after-a-full-detail.webp', alt: 'White hatchback after a full detail', category: 'Full Detail' },
  { src: '/images/white-cadillac-suv-front-end-clean-exterior.webp', alt: 'White Cadillac SUV front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/white-cadillac-escalade-front-end.webp', alt: 'White Cadillac Escalade front end', category: 'Fleet & Luxury' },
  { src: '/images/white-cadillac-suv-front-view-alternate-angle.webp', alt: 'White Cadillac SUV front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/black-suv-rear-view-clean-exterior.webp', alt: 'Black SUV rear view, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-front-view-alternate-angle-2.webp', alt: 'White Porsche 911 front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/black-suv-and-white-truck-parked-at-frothy.webp', alt: 'Black SUV and white truck parked at Frothy', category: 'Fleet & Luxury' },
  { src: '/images/black-bmw-x5-side-view-glossy-finish.webp', alt: 'Black BMW X5 side view, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/black-bmw-x5-front-view.webp', alt: 'Black BMW X5 front view', category: 'Fleet & Luxury' },
  { src: '/images/black-bmw-x5-front-grille-close-up.webp', alt: 'Black BMW X5 front grille close-up', category: 'Fleet & Luxury' },
  { src: '/images/white-mercedes-amg-g63-side-view.webp', alt: 'White Mercedes-AMG G63 side view', category: 'Fleet & Luxury' },
  { src: '/images/white-mercedes-amg-g63-front-view.webp', alt: 'White Mercedes-AMG G63 front view', category: 'Fleet & Luxury' },
  { src: '/images/white-mercedes-amg-g63-front-view-alternate-angle.webp', alt: 'White Mercedes-AMG G63 front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/white-mercedes-amg-g63-side-view-alternate-angle.webp', alt: 'White Mercedes-AMG G63 side view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/white-mercedes-amg-g63-front-view-close-up.webp', alt: 'White Mercedes-AMG G63 front view, close-up', category: 'Fleet & Luxury' },
  { src: '/images/cadillac-steering-wheel-and-leather-seats.webp', alt: 'Cadillac steering wheel and leather seats', category: 'Interior' },
  { src: '/images/white-porsche-911-convertible-side-view.webp', alt: 'White Porsche 911 convertible side view', category: 'Fleet & Luxury' },
  { src: '/images/cadillac-escalade-interior-alternate-angle.webp', alt: 'Cadillac Escalade interior, alternate angle', category: 'Interior' },
  { src: '/images/cadillac-interior-steering-wheel-close-up.webp', alt: 'Cadillac interior steering wheel close-up', category: 'Interior' },
  { src: '/images/cadillac-escalade-leather-seats-close-up.webp', alt: 'Cadillac Escalade leather seats close-up', category: 'Interior' },
  { src: '/images/porsche-wheel-and-brake-caliper-close-up.webp', alt: 'Porsche wheel and brake caliper close-up', category: 'Full Detail' },
  { src: '/images/white-porsche-911-front-view-close-up.webp', alt: 'White Porsche 911 front view, close-up', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-front-view-alternate-close-up.webp', alt: 'White Porsche 911 front view, alternate close-up', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-convertible-front-view.webp', alt: 'White Porsche 911 convertible front view', category: 'Fleet & Luxury' },
  { src: '/images/white-porsche-911-convertible-front-alternate-angle.webp', alt: 'White Porsche 911 convertible front, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/red-jeep-gladiator-front-end.webp', alt: 'Red Jeep Gladiator front end', category: 'Fleet & Luxury' },
  { src: '/images/boat-and-black-car-parked-at-frothy-carwash.webp', alt: 'Boat and black car parked at Frothy Carwash', category: 'Fleet & Luxury' },
]

function PhotoTile({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [errored, setErrored] = useState(false)

  return (
    <button
      onClick={onClick}
      className="relative aspect-square rounded-xl overflow-hidden bg-frothy-navy/10 group cursor-pointer"
    >
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-frothy-navy to-frothy-blue text-frothy-yellow/60">
          <Camera className="w-8 h-8" />
          <span className="text-xs font-medium px-2 text-center">Photo coming soon</span>
        </div>
      )}
      <div className="absolute inset-0 bg-frothy-navy/0 group-hover:bg-frothy-navy/10 transition-colors" />
    </button>
  )
}

export default function Gallery() {
  useSEO(PAGE_SEO.gallery)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory)

  return (
    <div className="pt-16 lg:pt-[72px]">
      {/* Header */}
      <section className="bg-frothy-navy py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-frothy-yellow text-frothy-navy text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Our Work
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-white leading-tight mb-4">
            Photo Gallery
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            A look at the hand washes, details, and ceramic coatings we deliver every day in Hollywood, FL.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-frothy-foam py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-frothy-navy text-frothy-yellow'
                    : 'bg-white text-frothy-navy/70 hover:bg-frothy-navy/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((photo, i) => (
              <PhotoTile key={i} src={photo.src} alt={photo.alt} onClick={() => setLightbox(photo.src)} />
            ))}
          </div>

          <RelatedLinks
            links={[
              { label: 'View All Services & Pricing', to: '/services' },
              { label: 'Ceramic Coating Packages', to: '/ceramic' },
              { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
              { label: 'Book Now', to: '/contact' },
            ]}
          />
        </div>
      </section>

      <GallerySEOContent />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-frothy-navy/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl object-contain" />
        </div>
      )}
    </div>
  )
}
