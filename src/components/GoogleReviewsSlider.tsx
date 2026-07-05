import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'

const sampleReviews = [
  {
    author: 'breynner yt',
    rating: 5,
    text: 'Absolutely the best car wash experience I\'ve had. The comfort area feels very VIP — they have massage chairs, a lounge area, and free beverages. The staff is attentive, professional, and the washing is thorough.',
    relative_time: 'a month ago'
  },
  {
    author: 'Serhiy Yuryk',
    rating: 5,
    text: 'Amazing service from start to finish. The staff was professional, fast, and paid attention to every detail. The facility is clean and modern with great amenities.',
    relative_time: 'a month ago'
  },
  {
    author: 'GanjaFb',
    rating: 5,
    text: 'Very amazing work! This is hands down the best Carwash I\'ve come across. The staff are highly knowledgeable and friendly.',
    relative_time: '3 months ago'
  },
  {
    author: 'David Rodriguez',
    rating: 5,
    text: 'Great work, chill and roomy waiting area and good prices. The massage chairs are a nice touch!',
    relative_time: '2 months ago'
  }
]

export default function GoogleReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const moveSlide = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev === 0 ? sampleReviews.length - 1 : prev - 1))
    } else {
      setCurrentIndex((prev) => (prev === sampleReviews.length - 1 ? 0 : prev + 1))
    }
  }

  const currentReview = sampleReviews[currentIndex]

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
          {currentIndex + 1} of {sampleReviews.length} reviews
        </p>

        {/* Google Link */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/Frothy+Carwash+Lounge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-frothy-blue text-frothy-navy font-bold rounded-lg hover:bg-frothy-blue/90 transition"
          >
            Read all 223 reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
