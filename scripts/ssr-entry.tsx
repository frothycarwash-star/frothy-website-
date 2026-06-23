import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import SEOLandingPage from '../src/pages/SEOLandingPage'
import { seoPages } from '../src/data/seoPages'
import LocationPage from '../src/pages/LocationPage'
import { locationPages } from '../src/data/locationPages'

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
