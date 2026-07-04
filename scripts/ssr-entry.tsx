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
import AreasWeServe from '../src/pages/AreasWeServe'
import PaintCorrection from '../src/pages/PaintCorrection'
import PetHairRemoval from '../src/pages/PetHairRemoval'
import SmokeOdorRemoval from '../src/pages/SmokeOdorRemoval'
import EngineBayCleaning from '../src/pages/EngineBayCleaning'
import HeadlightRestoration from '../src/pages/HeadlightRestoration'
import CarWashFortLauderdale from '../src/pages/CarWashFortLauderdale'
import CarWashDavie from '../src/pages/CarWashDavie'
import CarWashCooperCity from '../src/pages/CarWashCooperCity'
import CarWashSunnyIsles from '../src/pages/CarWashSunnyIsles'
import CarWashNorthMiamiBeach from '../src/pages/CarWashNorthMiamiBeach'

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
  'areas-we-serve': { Component: AreasWeServe, path: '/areas-we-serve' },
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

const newServicePages: Record<string, { Component: () => JSX.Element; path: string }> = {
  paintCorrection: { Component: PaintCorrection, path: '/paint-correction-hollywood-fl' },
  petHairRemoval: { Component: PetHairRemoval, path: '/pet-hair-removal-hollywood-fl' },
  smokeOdorRemoval: { Component: SmokeOdorRemoval, path: '/smoke-odor-removal-hollywood-fl' },
  engineBayCleaning: { Component: EngineBayCleaning, path: '/engine-bay-cleaning-hollywood-fl' },
  headlightRestoration: { Component: HeadlightRestoration, path: '/headlight-restoration-hollywood-fl' },
  carWashFortLauderdale: { Component: CarWashFortLauderdale, path: '/car-wash-fort-lauderdale-fl' },
  carWashDavie: { Component: CarWashDavie, path: '/car-wash-davie-fl' },
  carWashCooperCity: { Component: CarWashCooperCity, path: '/car-wash-cooper-city-fl' },
  carWashSunnyIsles: { Component: CarWashSunnyIsles, path: '/car-wash-sunny-isles-fl' },
  carWashNorthMiamiBeach: { Component: CarWashNorthMiamiBeach, path: '/car-wash-north-miami-beach-fl' },
}

export function renderNewServicePage(key: string): string {
  const entry = newServicePages[key]
  const { Component } = entry
  return renderToStaticMarkup(
    <StaticRouter location={entry.path}>
      <Component />
    </StaticRouter>
  )
}
