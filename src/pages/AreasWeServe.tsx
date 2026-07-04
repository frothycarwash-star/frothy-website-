import { useSEO } from '../hooks/useSEO'
import { MapPin, Clock, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AreasWeServe() {
    useSEO({
          title: 'Service Areas | Car Wash & Detailing in South Florida',
          description: 'Frothy Carwash serves Hollywood, Hallandale Beach, Aventura, Dania Beach, Pembroke Pines, and surrounding areas. Premium hand car wash and detailing in South Florida.',
          canonical: '/areas-we-serve',
    })

  const areas = [
    { name: 'Hollywood, FL', path: '/hand-car-wash-hollywood-fl', description: 'Our flagship location in Hollywood with premium lounge amenities' },
    { name: 'Hallandale Beach, FL', path: '/car-wash-hallandale-beach-fl', description: 'Hand car wash and detailing near Hallandale Beach' },
    { name: 'Aventura, FL', path: '/car-wash-aventura-fl', description: 'Premium detailing services in Aventura' },
    { name: 'Dania Beach, FL', path: '/car-wash-dania-beach-fl', description: 'Professional car washing in Dania Beach' },
    { name: 'Pembroke Pines, FL', path: '/car-wash-pembroke-pines-fl', description: 'Hand wash and ceramic coating in Pembroke Pines' },
    { name: 'Fort Lauderdale, FL', path: '/car-wash-fort-lauderdale-fl', description: 'Car detailing near Fort Lauderdale' },
    { name: 'Davie, FL', path: '/car-wash-davie-fl', description: 'Interior and exterior detailing in Davie' },
    { name: 'Cooper City, FL', path: '/car-wash-cooper-city-fl', description: 'Ceramic coating and paint protection in Cooper City' },
    { name: 'Sunny Isles, FL', path: '/car-wash-sunny-isles-fl', description: 'Premium hand car wash near Sunny Isles' },
    { name: 'North Miami Beach, FL', path: '/car-wash-north-miami-beach-fl', description: 'Professional detailing in North Miami Beach' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Areas We Serve</h1>
          <p className="text-xl text-blue-100">Premium hand car wash and detailing throughout South Florida</p>
        </div>
      </section>
    
      {/* Service Areas Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.path}
              to={area.path}
              className="group block p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <MapPin className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-2">{area.name}</h3>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </Link>
          ))}
        </div>
      </section>
    
      {/* Contact CTA */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Our Area?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 mb-2">Call us for questions</p>
              <a href="tel:+19545103073" className="text-blue-600 font-bold text-lg">(954) 510-3073</a>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 mb-2">Open 7 days a week</p>
              <p className="font-bold">8:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
