import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Ceramic', href: '/ceramic' },
  { label: 'Memberships', href: '/memberships' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-frothy-navy/95 backdrop-blur-lg shadow-lg'
            : 'bg-frothy-navy'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-frothy-yellow font-body font-bold text-lg tracking-wide group-hover:scale-105 transition-transform">
                FROTHY
              </span>
              <span className="hidden sm:inline text-frothy-yellow/60 text-xs tracking-[0.15em] uppercase font-medium">
                Carwash Lounge
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-frothy-yellow ${
                    location.pathname === link.href
                      ? 'text-frothy-yellow'
                      : 'text-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:9545103073"
                className="inline-flex items-center gap-2 bg-frothy-yellow text-frothy-navy font-bold text-sm px-5 py-2.5 rounded-lg hover:scale-105 hover:shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-frothy-yellow"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-frothy-navy transition-all duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-medium transition-colors hover:text-frothy-yellow ${
                location.pathname === link.href
                  ? 'text-frothy-yellow'
                  : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:9545103073"
            className="mt-4 inline-flex items-center gap-3 bg-frothy-blue text-white font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform"
          >
            <Phone className="w-5 h-5" />
            (954) 510-3073
          </a>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-frothy-navy border-t-2 border-frothy-yellow">
        <a
          href="tel:9545103073"
          className="flex items-center justify-center gap-2 bg-frothy-blue text-white font-bold text-base py-3.5 m-3 rounded-lg hover:bg-frothy-blue/90 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call to Book — (954) 510-3073
        </a>
      </div>
    </>
  )
}
