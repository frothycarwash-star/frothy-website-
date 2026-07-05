import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Review {
  author: string
  rating: number
  text: string
  time: string
  relative_time: string
}

export default function GoogleReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Fetch from our API endpoint
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        if (response.ok) {
          const data = await response.json()
          if (data.reviews && Array.isArray(data.reviews)) {
            setReviews(data.reviews)
          }
        }
      } catch (error) {
        console.error('Error loading reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const moveSlide = (direction: 'left' | 'right') => {
    if (reviews.length === 0) return
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
          <div className="flex justify-center items-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-frothy-blue mx-auto mb-4" />
              <p className="text-gray-300">Loading reviews...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return (
      <section className="py-16 bg-frothy-navy-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            Customer Reviews
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Trusted by hundreds of happy customers. See what they say:
          </p>
          <div className="text-center">
            <a
              href="https://www.google.com/maps/place/Frothy+Carwash+Lounge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-frothy-blue text-frothy-navy font-bold rounded-lg hover:bg-frothy-blue/90 transition text-lg"
            >
              Read 223+ Google Reviews
              <Star className="w-5 h-5 fill-current" />
            </a>
          </div>
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
                  className={
                    i < currentReview.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
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
              <p className="text-sm text-gray-500">{currentReview.relative_time}</p>
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

        {/* Review Count */}
        <p className="text-center text-gray-400 mt-8">
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
