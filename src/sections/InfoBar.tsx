import { MapPin, Clock, Phone } from 'lucide-react'

export default function InfoBar() {
  return (
    <div className="bg-frothy-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-12 py-4">
          <div className="flex items-center gap-2.5 text-frothy-navy">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-semibold">2223 Pembroke Rd, Hollywood FL 33020</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-frothy-navy/20" />
          <div className="flex items-center gap-2.5 text-frothy-navy">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-semibold">Open Daily 8 AM – 7 PM</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-frothy-navy/20" />
          <a
            href="tel:9545103073"
            className="flex items-center gap-2.5 text-frothy-navy hover:scale-105 transition-transform"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-bold">(954) 510-3073</span>
          </a>
        </div>
      </div>
    </div>
  )
}
