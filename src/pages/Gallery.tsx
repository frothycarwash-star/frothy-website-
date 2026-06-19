import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import { useState } from 'react'
import { X, Camera, Play } from 'lucide-react'

const categories = ['All', 'Hand Wash', 'Full Detail', 'Ceramic Coating', 'Interior']

const photos = [
  { src: '/images/gallery-1.jpg', alt: 'Hand suds wash on a black Mercedes-Benz', category: 'Hand Wash' },
  { src: '/images/gallery-2.jpg', alt: 'White Corvette covered in foam, rear three-quarter view', category: 'Hand Wash' },
  { src: '/images/gallery-3.jpg', alt: 'White Corvette covered in foam, front view', category: 'Hand Wash' },
  { src: '/images/gallery-4.jpg', alt: 'Black BMW M2 after a full detail', category: 'Full Detail' },
  { src: '/images/gallery-5.jpg', alt: 'Lamborghini gold wheel and brake caliper close-up', category: 'Full Detail' },
  { src: '/images/gallery-6.jpg', alt: 'Before and after interior detail — seats and dashboard', category: 'Interior' },
  { src: '/images/gallery-7.jpg', alt: 'Lamborghini door panel with yellow stitching detail', category: 'Interior' },
  { src: '/images/gallery-8.jpg', alt: 'Green Lamborghini Urus parked at the carwash after a full detail', category: 'Full Detail' },
]

const videos = [
  { src: '/videos/gallery-1.mp4', poster: '/images/gallery-video-1-poster.jpg', title: 'Hand wash walkthrough' },
  { src: '/videos/gallery-2.mp4', poster: '/images/gallery-video-2-poster.jpg', title: 'Foam wash in action' },
  { src: '/videos/gallery-3.mp4', poster: '/images/gallery-video-3-poster.jpg', title: 'Behind the scenes at Frothy' },
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

function VideoTile({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [posterErrored, setPosterErrored] = useState(false)
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <video
        src={src}
        controls
        autoPlay
        className="w-full aspect-video rounded-2xl bg-frothy-navy"
        onError={() => setPlaying(false)}
      />
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-frothy-navy/10 group cursor-pointer"
    >
      {!posterErrored && (
        <img
          src={poster}
          alt={title}
          onError={() => setPosterErrored(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
      {posterErrored && (
        <div className="absolute inset-0 bg-gradient-to-br from-frothy-navy to-frothy-blue" />
      )}
      <div className="absolute inset-0 bg-frothy-navy/40 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-frothy-yellow flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-7 h-7 text-frothy-navy fill-frothy-navy" />
        </div>
      </div>
      <div className="absolute bottom-3 left-4 right-4 text-white text-sm font-semibold drop-shadow">
        {title}
      </div>
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
            Photo &amp; Video Gallery
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
        </div>
      </section>

      {/* Videos */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl text-frothy-navy leading-tight mb-4">
              Watch us in action.
            </h2>
            <p className="text-frothy-navy/60 text-lg max-w-xl mx-auto">
              Short clips of the process, from first rinse to final shine.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {videos.map((video, i) => (
              <VideoTile key={i} src={video.src} poster={video.poster} title={video.title} />
            ))}
          </div>
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
