import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | Frothy Carwash Lounge',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  })

  return (
    <div className="pt-16 lg:pt-[72px] min-h-[70vh] flex items-center justify-center bg-frothy-foam">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <span className="inline-block bg-frothy-yellow text-frothy-navy text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
          404
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-frothy-navy leading-tight mb-4">
          We couldn't find that page.
        </h1>
        <p className="text-frothy-navy/60 text-lg mb-8">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-block bg-frothy-navy text-frothy-yellow font-semibold px-6 py-3 rounded-xl hover:bg-frothy-navy/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
