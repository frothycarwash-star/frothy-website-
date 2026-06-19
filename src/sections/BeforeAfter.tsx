import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

const comparisons = [
  {
    id: 1,
    label: 'Exterior Detail',
    desc: 'From road-worn to showroom shine',
    before: '/images/before-dirty.jpg',
    after: '/images/after-clean.jpg',
  },
  {
    id: 2,
    label: 'Interior Deep Clean',
    desc: 'Complete interior restoration',
    before: '/images/interior-detail.jpg',
    after: '/images/interior-detail.jpg',
  },
]

function ComparisonSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.min(100, Math.max(0, x)))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect())
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())
  }

  return (
    <div
      className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-card"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image (full) */}
      <img
        src={after}
        alt={`${label} after`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* Before Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt={`${label} before`}
          className="absolute top-0 left-0 h-full w-full max-w-none object-cover"
          style={{ width: `${100 / (sliderPos / 100 || 1)}%` }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-frothy-navy/80 backdrop-blur text-frothy-yellow text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-frothy-blue/80 backdrop-blur text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
        After
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <MoveHorizontal className="w-5 h-5 text-frothy-navy" />
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-frothy-navy text-frothy-yellow text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full mb-4">
            Results
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] text-frothy-navy leading-tight mb-4">
            See the difference.
          </h2>
          <p className="text-frothy-navy/60 text-lg max-w-xl mx-auto">
            Drag to compare. Every car gets the same meticulous attention to detail.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {comparisons.map((comp, i) => (
            <button
              key={comp.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === i
                  ? 'bg-frothy-navy text-frothy-yellow'
                  : 'bg-frothy-foam text-frothy-navy/60 hover:bg-frothy-foam/80'
              }`}
            >
              {comp.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="max-w-3xl mx-auto">
          <ComparisonSlider
            before={comparisons[activeTab].before}
            after={comparisons[activeTab].after}
            label={comparisons[activeTab].label}
          />
          <p className="text-center text-frothy-navy/50 text-sm mt-4">
            {comparisons[activeTab].desc}
          </p>
        </div>
      </div>
    </section>
  )
}
