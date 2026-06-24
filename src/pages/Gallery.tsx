import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { X, Camera } from 'lucide-react'
import RelatedLinks from '../components/RelatedLinks'

const categories = ['All', 'Hand Wash', 'Full Detail', 'Interior', 'Fleet & Luxury', 'Our Lounge']

const photos = [
  { src: '/images/gallery-1.jpg', alt: 'Hand suds wash on a black Mercedes-Benz', category: 'Hand Wash' },
  { src: '/images/gallery-2.jpg', alt: 'White Corvette covered in foam, rear three-quarter view', category: 'Hand Wash' },
  { src: '/images/gallery-3.jpg', alt: 'White Corvette covered in foam, front view', category: 'Hand Wash' },
  { src: '/images/gallery-4.jpg', alt: 'Black BMW M2 after a full detail', category: 'Full Detail' },
  { src: '/images/gallery-5.jpg', alt: 'Lamborghini gold wheel and brake caliper close-up', category: 'Full Detail' },
  { src: '/images/gallery-6.jpg', alt: 'Before and after interior detail — seats and dashboard', category: 'Interior' },
  { src: '/images/gallery-7.jpg', alt: 'Lamborghini door panel with yellow stitching detail', category: 'Interior' },
  { src: '/images/gallery-8.jpg', alt: 'Green Lamborghini Urus parked at the carwash after a full detail', category: 'Full Detail' },
  { src: '/images/gallery-10.jpg', alt: 'White McLaren 570S with door open during a full detail', category: 'Fleet & Luxury' },
  { src: '/images/gallery-14.jpg', alt: 'Red Porsche Macan after a hand wash, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/gallery-15.jpg', alt: 'Blue Maserati Levante after a full detail', category: 'Fleet & Luxury' },
  { src: '/images/gallery-11.jpg', alt: 'Clean tan leather truck interior after a detail', category: 'Interior' },
  { src: '/images/gallery-12.jpg', alt: 'Heavily soiled cloth seat before an interior deep clean', category: 'Interior' },
  { src: '/images/gallery-13.jpg', alt: 'Rear bench seat after a full interior detail', category: 'Interior' },
  { src: '/images/gallery-20.jpg', alt: 'Red Lexus NX rear view after a hand wash', category: 'Hand Wash' },
  { src: '/images/gallery-21.jpg', alt: 'Clean detailed engine bay close-up', category: 'Full Detail' },
  { src: '/images/gallery-22.jpg', alt: 'White Corvette covered in foam, rear close-up', category: 'Hand Wash' },
  { src: '/images/gallery-23.jpg', alt: 'White Corvette hood covered in foam suds', category: 'Hand Wash' },
  { src: '/images/gallery-24.jpg', alt: 'Black BMW M2 getting hand washed by our team', category: 'Full Detail' },
  { src: '/images/gallery-25.jpg', alt: 'Lamborghini gold wheel and brake caliper close-up', category: 'Fleet & Luxury' },
  { src: '/images/gallery-26.jpg', alt: 'Lamborghini Urus steering wheel and digital dash', category: 'Fleet & Luxury' },
  { src: '/images/gallery-27.jpg', alt: 'Dark green Lamborghini Urus after a full detail', category: 'Fleet & Luxury' },
  { src: '/images/gallery-28.jpg', alt: 'Classic Mercedes convertible getting hand washed', category: 'Hand Wash' },
  { src: '/images/gallery-29.jpg', alt: 'Black BMW X7 covered in foam with our team washing', category: 'Hand Wash' },
  { src: '/images/gallery-30.jpg', alt: 'Black BMW 7 Series rear view after a full detail', category: 'Full Detail' },
  { src: '/images/gallery-31.jpg', alt: 'SUV covered in foam with our team hand washing', category: 'Hand Wash' },
  { src: '/images/gallery-32.jpg', alt: 'White Mercedes-AMG G63 covered in foam during a hand wash', category: 'Hand Wash' },
  { src: '/images/gallery-33.jpg', alt: 'Black Bentley Continental GT after a full detail', category: 'Fleet & Luxury' },
  { src: '/images/gallery-34.jpg', alt: 'Clean tan door panel close-up after an interior detail', category: 'Interior' },
  { src: '/images/gallery-35.jpg', alt: 'Black BMW M5 front three-quarter view, glossy finish', category: 'Full Detail' },
  { src: '/images/gallery-9.jpg', alt: 'Frothy Carwash Lounge front desk and snack counter', category: 'Our Lounge' },
  { src: '/images/gallery-18.jpg', alt: 'Massage chairs in the Frothy Carwash Lounge', category: 'Our Lounge' },
  { src: '/images/gallery-19.jpg', alt: 'Frothy Carwash Lounge seating and waiting area', category: 'Our Lounge' },
  { src: '/images/gallery-36.jpg', alt: 'Red Jeep Gladiator side view, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/gallery-37.jpg', alt: 'Red Jeep Wrangler front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/gallery-38.jpg', alt: 'White Porsche 911 front view, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/gallery-39.jpg', alt: 'White Porsche 911 rear three-quarter view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-40.jpg', alt: 'White Porsche 911 convertible rear view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-41.jpg', alt: 'Mercedes-AMG G63 front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/gallery-42.jpg', alt: 'Black Mercedes-AMG G-Wagon front end', category: 'Fleet & Luxury' },
  { src: '/images/gallery-43.jpg', alt: 'Black Corvette low front angle, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/gallery-44.jpg', alt: 'Black Corvette front three-quarter view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-45.jpg', alt: 'Black Corvette roof and rear angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-46.jpg', alt: 'Black Corvette rear quarter view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-47.jpg', alt: 'Black Corvette rear quarter, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-48.jpg', alt: 'White Porsche 911 front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-49.jpg', alt: 'Black Maserati covered in foam during a hand wash', category: 'Hand Wash' },
  { src: '/images/gallery-50.jpg', alt: 'Black Maserati front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/gallery-51.jpg', alt: 'Black Mercedes-AMG GT front end', category: 'Fleet & Luxury' },
  { src: '/images/gallery-52.jpg', alt: 'Black sedan parked at the Frothy entrance', category: 'Fleet & Luxury' },
  { src: '/images/gallery-53.jpg', alt: 'Tan leather interior and dashboard close-up', category: 'Interior' },
  { src: '/images/gallery-54.jpg', alt: 'White hatchback after a full detail', category: 'Full Detail' },
  { src: '/images/gallery-55.jpg', alt: 'White Cadillac SUV front end, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/gallery-56.jpg', alt: 'White Cadillac Escalade front end', category: 'Fleet & Luxury' },
  { src: '/images/gallery-57.jpg', alt: 'White Cadillac SUV front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-58.jpg', alt: 'Black SUV rear view, clean exterior', category: 'Fleet & Luxury' },
  { src: '/images/gallery-59.jpg', alt: 'White Porsche 911 front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-60.jpg', alt: 'Black SUV and white truck parked at Frothy', category: 'Fleet & Luxury' },
  { src: '/images/gallery-61.jpg', alt: 'Black BMW X5 side view, glossy finish', category: 'Fleet & Luxury' },
  { src: '/images/gallery-62.jpg', alt: 'Black BMW X5 front view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-63.jpg', alt: 'Black BMW X5 front grille close-up', category: 'Fleet & Luxury' },
  { src: '/images/gallery-64.jpg', alt: 'White Mercedes-AMG G63 side view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-65.jpg', alt: 'White Mercedes-AMG G63 front view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-66.jpg', alt: 'White Mercedes-AMG G63 front view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-67.jpg', alt: 'White Mercedes-AMG G63 side view, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-68.jpg', alt: 'White Mercedes-AMG G63 front view, close-up', category: 'Fleet & Luxury' },
  { src: '/images/gallery-69.jpg', alt: 'Cadillac steering wheel and leather seats', category: 'Interior' },
  { src: '/images/gallery-70.jpg', alt: 'White Porsche 911 convertible side view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-71.jpg', alt: 'Cadillac Escalade interior, alternate angle', category: 'Interior' },
  { src: '/images/gallery-72.jpg', alt: 'Cadillac interior steering wheel close-up', category: 'Interior' },
  { src: '/images/gallery-73.jpg', alt: 'Cadillac Escalade leather seats close-up', category: 'Interior' },
  { src: '/images/gallery-74.jpg', alt: 'Porsche wheel and brake caliper close-up', category: 'Full Detail' },
  { src: '/images/gallery-75.jpg', alt: 'White Porsche 911 front view, close-up', category: 'Fleet & Luxury' },
  { src: '/images/gallery-76.jpg', alt: 'White Porsche 911 front view, alternate close-up', category: 'Fleet & Luxury' },
  { src: '/images/gallery-77.jpg', alt: 'White Porsche 911 convertible front view', category: 'Fleet & Luxury' },
  { src: '/images/gallery-78.jpg', alt: 'White Porsche 911 convertible front, alternate angle', category: 'Fleet & Luxury' },
  { src: '/images/gallery-79.jpg', alt: 'Red Jeep Gladiator front end', category: 'Fleet & Luxury' },
  { src: '/images/gallery-80.jpg', alt: 'Boat and black car parked at Frothy Carwash', category: 'Fleet & Luxury' },
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
                    : 'bg-white text-frothy-navy/60 hover:bg-frothy-navy/5'
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
