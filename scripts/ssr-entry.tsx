import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import SEOLandingPage from '../src/pages/SEOLandingPage'
import { seoPages } from '../src/data/seoPages'

export function renderSeoPage(key: string): string {
  const data = (seoPages as Record<string, typeof seoPages.handCarWash>)[key]
  return renderToStaticMarkup(
    <StaticRouter location={data.slug}>
      <SEOLandingPage data={data} />
    </StaticRouter>
  )
}
