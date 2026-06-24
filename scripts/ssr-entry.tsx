import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import SEOLandingPage from '../src/pages/SEOLandingPage'
import { seoPages } from '../src/data/seoPages'
import LocationPage from '../src/pages/LocationPage'
import { locationPages } from '../src/data/locationPages'
import Home from '../src/pages/Home'
import Services from '../src/pages/Services'
import Ceramic from '../src/pages/Ceramic'
import Memberships from '../src/pages/Memberships'
import About from '../src/pages/About'
import Contact from '../src/pages/Contact'
import Gallery from '../src/pages/Gallery'

export function renderSeoPage(key: string): string {
  const data = (seoPages as Record<string, typeof seoPages.handCarWash>)[key]
  return renderToStaticMarkup(
    <StaticRouter location={data.slug}>
      <SEOLandingPage data={data} />
    </StaticRouter>
  )
}

export function renderLocationPage(key: string): string {
  const data = (locationPages as Record<string, typeof locationPages.hallandaleBeach>)[key]
  return renderToStaticMarkup(
    <StaticRouter location={data.slug}>
      <LocationPage data={data} />
    </StaticRouter>
  )
}

const corePages: Record<string, { Component: () => JSX.Element; path: string }> = {
  home: { Component: Home, path: '/' },
  services: { Component: Services, path: '/services' },
  ceramic: { Component: Ceramic, path: '/ceramic' },
  memberships: { Component: Memberships, path: '/memberships' },
  about: { Component: About, path: '/about' },
  contact: { Component: Contact, path: '/contact' },
  gallery: { Component: Gallery, path: '/gallery' },
}

export function renderCorePage(key: string): string {
  const entry = corePages[key]
  const { Component } = entry
  return renderToStaticMarkup(
    <StaticRouter location={entry.path}>
      <Component />
    </StaticRouter>
  )
}
