import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

const SITE_NAME = 'Frothy Carwash Lounge'
const DEFAULT_OG_IMAGE = '/images/hero-car.jpg'
const BASE_URL = 'https://frothycarwash.com'

export function useSEO({ title, description, canonical, ogImage, noindex }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title

    // Helper to set/create a meta tag
    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrValue] = attr.split('=')
        el.setAttribute(attrName, attrValue.replace(/"/g, ''))
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    // Standard meta
    setMeta('meta[name="description"]', 'name=description', description)

    // OG tags
    setMeta('meta[property="og:title"]', 'property=og:title', title)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:type"]', 'property=og:type', 'website')
    setMeta('meta[property="og:image"]', 'property=og:image', `${BASE_URL}${ogImage ?? DEFAULT_OG_IMAGE}`)
    setMeta('meta[property="og:site_name"]', 'property=og:site_name', SITE_NAME)

    // Twitter card
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', `${BASE_URL}${ogImage ?? DEFAULT_OG_IMAGE}`)

    // Canonical
    if (canonical) {
      setLink('canonical', `${BASE_URL}${canonical}`)
    }

    // Robots (noindex for utility pages like 404)
    setMeta('meta[name="robots"]', 'name=robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [title, description, canonical, ogImage, noindex])
}

// Per-page SEO configs
export const PAGE_SEO = {
  home: {
    title: 'Frothy Carwash Lounge | Hand Car Wash in Hollywood, FL',
    description: 'Premium hand car wash, detailing & lounge in Hollywood, FL. No machines — just expert hands. Open 7 days, 8AM–7PM. Walk-ins welcome. Call (954) 510-3073.',
    canonical: '/',
  },
  services: {
    title: 'Car Wash & Detailing Services | Frothy Hollywood FL',
    description: 'Hand washes from $25, full details from $65, and showroom packages up to $299. Every service done by hand. Sedan & SUV pricing. Hollywood, FL.',
    canonical: '/services',
  },
  ceramic: {
    title: 'Ceramic Coating Hollywood FL | Frothy Carwash Lounge',
    description: 'Professional ceramic coating in Hollywood, FL. 1-year, 3-year, and 5-year packages from $149. UV protection, hydrophobic finish, and enhanced gloss. Call for a free quote.',
    canonical: '/ceramic',
  },
  memberships: {
    title: 'Car Wash Memberships | Frothy Hollywood FL',
    description: 'Monthly car wash memberships starting at $119/mo. Silver, Gold, and Platinum plans with hand washes, details, and priority scheduling. Hollywood, FL.',
    canonical: '/memberships',
  },
  about: {
    title: 'About Us | Frothy Carwash Lounge | Hollywood, FL',
    description: "Hollywood's premium hand car wash and lounge. Built for people who care about their car and their time. Coffee, great work, and a place worth lingering in.",
    canonical: '/about',
  },
  contact: {
    title: 'Contact & Book | Frothy Carwash Lounge | Hollywood, FL',
    description: 'Book a hand wash or detailing appointment at Frothy Carwash Lounge. Call (954) 510-3073 or stop by at 2223 Pembroke Rd, Hollywood FL. Open 7 days.',
    canonical: '/contact',
  },
  gallery: {
    title: 'Photo & Video Gallery | Frothy Carwash Lounge | Hollywood, FL',
    description: 'See our work — hand washes, full details, and ceramic coatings in Hollywood, FL. Browse photos and videos from the Frothy Carwash Lounge.',
    canonical: '/gallery',
  },
}
