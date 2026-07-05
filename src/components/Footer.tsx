import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Instagram, Music } from 'lucide-react'

const serviceLinks = [
  { label: 'Hand Wash', to: '/services' },
  { label: 'Full Detail', to: '/services' },
  { label: 'Ceramic Coating', to: '/ceramic' },
  { label: 'Memberships', to: '/memberships' },
  { label: 'Book Now', to: '/contact', external: false },
]

const seoLinks = [
  { label: 'Hand Car Wash Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
  { label: 'Car Detailing Hollywood, FL', to: '/car-detailing-hollywood-fl' },
  { label: 'Ceramic Coating Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
]

const areaLinks = [
  { label: 'Hollywood, FL', to: '/' },
  { label: 'Hallandale Beach, FL', to: '/car-wash-hallandale-beach-fl' },
  { label: 'Aventura, FL', to: '/car-wash-aventura-fl' },
  { label: 'Dania Beach, FL', to: '/car-wash-dania-beach-fl' },
  { label: 'Pembroke Pines, FL', to: '/car-wash-pembroke-pines-fl' },
]

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/frothycarwashlounge/',
    icon: Instagram,
    label: '@frothycarwashlounge'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@frothy.carwash',
    icon: Music,
    label: '@frothy.carwash'
  }
]

export default function Footer() {
  return (
    <footer className="bg-frothy-navy text-frothy-foam">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-4">
              <span className="text-frothy-yellow font-body font-bold text-2xl tracking-wide">
                FROTHY
              </span>
              <span className="block text-frothy-yellow/50 text-xs tracking-[0.2em] uppercase mt-1">
                Carwash Lounge
              </span>
            </Link>
            <p className="text-frothy-foam/60 text-sm italic mb-6 max-w-xs">
              Full Steam Ahead™
            </p>
            <p className="text-frothy-foam/60 text-sm leading-relaxed mb-6 max-w-sm">
              Where clean cars meet good company. Hollywood&apos;s premium hand car wash and lounge experience.
            </p>
            <div className="space-y-3 mb-8">
              <a
                href="tel:9545103073"
                className="flex items-center gap-2 text-frothy-blue font-semibold text-base hover:text-frothy-yellow transition-colors"
              >
                <Phone className="w-4 h-4" />
                (954) 510-3073
              </a>
              <a
                href="https://maps.google.com/?q=2223+Pembroke+Rd+Hollywood+FL+33020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-frothy-foam/60 text-sm hover:text-frothy-yellow transition-colors"
              >
                <MapPin className="w-4 h-4" />
                2223 Pembroke Rd, Hollywood FL 33020
              </a>
              <a
                href="mailto:info@frothycarwash.com"
                className="flex items-center gap-2 text-frothy-foam/60 text-sm hover:text-frothy-yellow transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@frothycarwash.com
              </a>
            </div>

            {/* Social Media Links */}
            <h4 className="text-frothy-yellow text-xs font-bold tracking-[0.15em] uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.08] hover:bg-frothy-blue hover:text-frothy-navy transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-frothy-yellow text-xs font-bold tracking-[0.15em] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3 mb-8">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-frothy-foam/60 text-sm hover:text-frothy-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-frothy-yellow text-xs font-bold tracking-[0.15em] uppercase mb-5">
              Nearby Areas
            </h4>
            <ul className="space-y-3 mb-8">
              {areaLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-frothy-foam/60 text-sm hover:text-frothy-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-frothy-yellow text-xs font-bold tracking-[0.15em] uppercase mb-5">
              Popular Searches
            </h4>
            <ul className="space-y-3">
              {seoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-frothy-foam/60 text-sm hover:text-frothy-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours Column */}
          <div className="lg:col-span-4">
            <h4 className="text-frothy-yellow text-xs font-bold tracking-[0.15em] uppercase mb-5">
              Hours
            </h4>
            <ul className="space-y-2.5 mb-6">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                (day) => (
                  <li key={day} className="flex items-center justify-between text-sm">
                    <span className="text-frothy-foam/60">{day}</span>
                    <span className="text-frothy-foam/80 font-medium flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-frothy-blue" />
                      8AM – 7PM
                    </span>
                  </li>
                )
              )}
            </ul>
            <div className="bg-white/[0.04] rounded-lg px-4 py-3 border border-white/[0.06]">
              <p className="text-frothy-yellow text-sm font-semibold">
                Open 7 days · Walk-ins welcome
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-frothy-foam/60 text-xs">
            &copy; {new Date().getFullYear()} Frothy Carwash Lounge · Hollywood, FL
          </p>
          <p className="text-frothy-foam/60 text-xs">
            Hand Wash · Coffee · Lounge
          </p>
        </div>
      </div>
    </footer>
  )
}
