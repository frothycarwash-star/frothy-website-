import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Review {
  author: string
  rating: number
  text: string
  time: string
  authorUrl?: string
  profilePhotoUrl?: string
}

export default function GoogleReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://places.googleapis.com/v1/places/ChIJe_YX9kPxw4gRYzQB_l9WYDU?fields=reviews&key=AIzaSyCOjKzJHrE9eVb4ichqTJQRCO80FPowT4E`
        )
        
        if (!response.ok) throw new Error('Failed to fetch reviews')
        
        const data = await response.json()
        
        if (data.reviews && Array.isArray(data.reviews)) {
          const formattedReviews = data.reviews.map((review: any) => ({
            author: review.authorAttribution?.displayName || 'Anonymous',
            rating: review.rating || 5,
            text: review.text || '',
            time: review.publishTime || '',
            authorUrl: review.authorAttribution?.uri,
            profilePhotoUrl: review.authorAttribution?.photoUri
          }))
          
          setReviews(formattedReviews)
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError('Unable to load reviews at this moment')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const moveSlide = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
    } else {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-frothy-navy-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Customer Reviews
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-frothy-blue" />
          </div>
        </div>
      </section>
    )
  }

  if (error || reviews.length === 0) {
    return (
      <section className="py-16 bg-frothy-navy-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            Customer Reviews
          </h2>
          <p className="text-center text-gray-400">
            Check out our{' '}
            <a
              href="https://www.google.com/maps/place/Frothy+Carwash+Lounge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-frothy-blue hover:text-frothy-blue/80 underline"
            >
              223+ reviews on Google
            </a>
          </p>
        </div>
      </section>
    )
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="py-16 bg-frothy-navy-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Customer Reviews
          </h2>
          <p className="text-gray-300">
            See what our customers say about Frothy Carwash Lounge
          </p>
        </div>

        {/* Review Card */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < currentReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed italic">
              "{currentReview.text}"
            </blockquote>

            {/* Author */}
            <div className="border-t pt-4">
              <p className="font-bold text-frothy-navy mb-1">{currentReview.author}</p>
              <p className="text-sm text-gray-500">
                {new Date(currentReview.time).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => moveSlide('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-20 bg-frothy-blue text-frothy-navy p-2 rounded-full hover:bg-frothy-blue/80 transition"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => moveSlide('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-20 bg-frothy-blue text-frothy-navy p-2 rounded-full hover:bg-frothy-blue/80 transition"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.slice(0, Math.min(5, reviews.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition ${
                index === currentIndex % reviews.length ? 'bg-frothy-blue w-8' : 'bg-gray-500 w-2'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
          {reviews.length > 5 && (
            <span className="text-gray-400 text-sm self-center ml-2">
              +{reviews.length - 5} more
            </span>
          )}
        </div>

        {/* Review Count */}
        <p className="text-center text-gray-400 mt-6">
          {currentIndex + 1} of {reviews.length} reviews
        </p>

        {/* Google Link */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/Frothy+Carwash+Lounge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-frothy-blue text-frothy-navy font-bold rounded-lg hover:bg-frothy-blue/90 transition"
          >
            View all {reviews.length} reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
