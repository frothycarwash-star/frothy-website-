import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    text: "Best hand car wash I've been to in South Florida. The lounge is a vibe — got my coffee, sat down, and my car came out spotless. Will definitely be back.",
    author: 'Carlos M.',
    location: 'Hollywood, FL',
    service: 'Inside & Out',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    text: "Took my Porsche here for the ceramic coating. The team was professional and the result is incredible. Worth every penny. Paint looks better than the day I bought it.",
    author: 'Jessica R.',
    location: 'Aventura, FL',
    service: 'Ceramic Coating',
    rating: 5,
    date: '1 month ago',
  },
  {
    text: "Finally a car wash that feels like it was designed for people who care. The monthly membership pays for itself. Love this place.",
    author: 'Marcus T.',
    location: 'Hallandale Beach, FL',
    service: 'Gold Membership',
    rating: 5,
    date: '3 weeks ago',
  },
]

export default function Reviews() {
  return (
    <section className="section-padding bg-frothy-navy noise-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block bg-frothy-yellow/20 text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Reviews
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] text-frothy-yellow leading-tight">
            Hollywood loves Frothy.
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 lg:p-7 hover:bg-white/[0.08] transition-colors"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-white/60 text-xs ml-2">{review.date}</span>
              </div>

              {/* Quote */}
              <Quote className="w-6 h-6 text-frothy-blue/40 mb-2" />
              <p className="text-frothy-foam/80 text-[15px] leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div>
                  <p className="text-frothy-foam font-semibold text-sm">{review.author}</p>
                  <p className="text-frothy-foam/60 text-xs">{review.location}</p>
                </div>
                <span className="text-frothy-blue text-xs font-medium bg-frothy-blue/10 px-2.5 py-1 rounded-lg">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Badge + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://g.page/r/CR3lzL_ii6qJEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-3 hover:bg-white/[0.10] hover:border-white/[0.15] transition-colors group"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-frothy-foam font-semibold text-sm">5.0</span>
            <span className="text-frothy-foam/60 text-xs">on Google</span>
            <span className="text-frothy-blue text-xs font-bold group-hover:underline ml-1">View →</span>
          </a>
          <a
            href="https://g.page/r/CR3lzL_ii6qJEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-frothy-yellow/30 text-frothy-yellow font-bold text-sm px-5 py-3 rounded-xl hover:bg-frothy-yellow/10 hover:border-frothy-yellow/50 transition-colors"
          >
            ⭐ Leave Us a Review
          </a>
        </div>
      </div>
    </section>
  )
}
