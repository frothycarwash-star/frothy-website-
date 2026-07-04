// Post-build static prerendering.
// 1. For EVERY route, bakes the correct <title>, meta description, canonical,
//    Open Graph, and Twitter tags directly into a static dist/<route>/index.html
//    so crawlers see correct metadata without executing JS (Priority 1).
// 2. For the new SEO landing pages, also injects full server-rendered body
//    content (via react-dom/server) so the actual page copy is present in
//    the raw HTML too, not just meta tags.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const distDir = path.join(repoRoot, 'dist')
const BASE_URL = 'https://frothycarwash.com'
const DEFAULT_OG_IMAGE = '/images/hand-car-wash-hollywood-fl.webp'

const pages = [
  { route: '/', title: 'Frothy Carwash Lounge | Hand Car Wash in Hollywood, FL', description: 'Premium hand car wash, detailing & lounge in Hollywood, FL. No machines — just expert hands. Open 7 days, 8AM–7PM. Walk-ins welcome. Call (954) 510-3073.', ssrKey: 'home', kind: 'core' },
  { route: '/services', title: 'Car Wash & Detailing Services | Frothy Hollywood FL', description: 'Hand washes from $25, full details from $65, and showroom packages up to $299. Every service done by hand. Sedan & SUV pricing. Hollywood, FL.', ssrKey: 'services', kind: 'core' },
  { route: '/ceramic', title: 'Ceramic Coating Hollywood FL | Frothy Carwash Lounge', description: 'Professional ceramic coating in Hollywood, FL. 1, 3, and 5-year packages from $149 with UV protection and hydrophobic finish. Call for a free quote.', ssrKey: 'ceramic', kind: 'core' },
  { route: '/memberships', title: 'Car Wash Memberships | Frothy Hollywood FL', description: 'Monthly car wash memberships starting at $119/mo. Silver, Gold, and Platinum plans with hand washes, details, and priority scheduling. Hollywood, FL.', ssrKey: 'memberships', kind: 'core' },
  { route: '/about', title: 'About Us | Frothy Carwash Lounge | Hollywood, FL', description: "Hollywood's premium hand car wash and lounge. Built for people who care about their car and their time. Coffee, great work, and a place worth lingering in.", ssrKey: 'about', kind: 'core' },
  { route: '/contact', title: 'Contact & Book | Frothy Carwash Lounge | Hollywood, FL', description: 'Book a hand wash or detailing appointment at Frothy Carwash Lounge. Call (954) 510-3073 or stop by at 2223 Pembroke Rd, Hollywood FL. Open 7 days.', ssrKey: 'contact', kind: 'core' },
  { route: '/gallery', title: 'Photo Gallery | Frothy Carwash Lounge | Hollywood, FL', description: 'See our work — hand washes, full details, and ceramic coatings in Hollywood, FL. Browse photos from the Frothy Carwash Lounge.', ssrKey: 'gallery', kind: 'core' },
  { route: '/hand-car-wash-hollywood-fl', title: 'Hand Car Wash Hollywood FL | Frothy Carwash Lounge', description: 'Premium hand car wash in Hollywood, FL. No machines, no brushes — every car washed by hand. Walk-ins welcome, 7 days a week. Call (954) 510-3073.', ssrKey: 'handCarWash' },
  { route: '/car-detailing-hollywood-fl', title: 'Car Detailing Hollywood FL | Interior & Exterior Detailing | Frothy', description: 'Professional car detailing in Hollywood, FL. Interior & exterior detailing and showroom packages from $65. Book your detail at Frothy Carwash Lounge.', ssrKey: 'carDetailing' },
  { route: '/ceramic-coating-hollywood-fl', title: 'Ceramic Coating Hollywood FL | Paint Protection Near Me | Frothy', description: 'Ceramic coating in Hollywood, FL from $149. 1, 3, and 5-year paint protection packages with hydrophobic finish and UV gloss. Free quotes at Frothy.', ssrKey: 'ceramicCoatingSEO' },
  { route: '/car-wash-hallandale-beach-fl', title: 'Car Wash Near Hallandale Beach, FL | Frothy Carwash Lounge', description: 'Hand car wash, detailing & ceramic coating just minutes from Hallandale Beach, FL. Walk-ins welcome, indoor lounge with coffee & Wi-Fi while you wait.', ssrKey: 'hallandaleBeach', kind: 'location' },
  { route: '/car-wash-dania-beach-fl', title: 'Car Wash Near Dania Beach, FL | Frothy Carwash Lounge', description: 'Hand car wash, detailing & ceramic coating minutes from Dania Beach, FL. Walk-ins welcome, indoor lounge with coffee & Wi-Fi while you wait.', ssrKey: 'daniaBeach', kind: 'location' },
  { route: '/car-wash-pembroke-pines-fl', title: 'Car Wash Near Pembroke Pines, FL | Frothy Carwash Lounge', description: 'Hand car wash, detailing & ceramic coating a short drive from Pembroke Pines, FL. Walk-ins welcome, indoor lounge with coffee & Wi-Fi while you wait.', ssrKey: 'pembrokePines', kind: 'location' },
  { route: '/car-wash-aventura-fl', title: 'Car Wash Near Aventura, FL | Frothy Carwash Lounge', description: 'Hand car wash, detailing & ceramic coating minutes from Aventura, FL. Walk-ins welcome, indoor lounge with coffee & Wi-Fi while you wait.', ssrKey: 'aventura', kind: 'location' },
  { route: '/paint-correction-hollywood-fl', title: 'Paint Correction in Hollywood, FL | Remove Swirl Marks | Frothy', description: 'Professional paint correction in Hollywood, FL. Remove swirl marks and scratches. Expert detailing at Frothy Carwash.' },
  { route: '/pet-hair-removal-hollywood-fl', title: 'Pet Hair Removal in Hollywood, FL | Interior Cleaning | Frothy', description: 'Professional pet hair removal service in Hollywood, FL. Deep clean interior, remove pet odor. Book now.' },
  { route: '/smoke-odor-removal-hollywood-fl', title: 'Smoke Odor Removal Hollywood FL | Interior Deodorizing | Frothy', description: 'Smoke odor removal service in Hollywood, FL. Professional deodorizing treatments for cigarette and cigar smoke.' },
  { route: '/engine-bay-cleaning-hollywood-fl', title: 'Engine Bay Cleaning in Hollywood, FL | Detailed Engine Wash | Frothy', description: 'Professional engine bay cleaning in Hollywood, FL. Detailed engine wash and degreasing service.' },
  { route: '/headlight-restoration-hollywood-fl', title: 'Headlight Restoration in Hollywood, FL | Headlight Polishing | Frothy', description: 'Professional headlight restoration in Hollywood, FL. Restore cloudy, oxidized headlights to clarity.' },
  { route: '/car-wash-fort-lauderdale-fl', title: 'Car Wash Near Fort Lauderdale, FL | Hand Wash | Frothy', description: 'Hand car wash and detailing near Fort Lauderdale, FL. Professional service, lounge with coffee, walk-ins welcome.' },
  { route: '/car-wash-davie-fl', title: 'Car Wash Near Davie, FL | Hand Wash & Detailing | Frothy', description: 'Professional hand car wash and detailing near Davie, FL. No machines, expert care for all vehicles.' },
  { route: '/car-wash-cooper-city-fl', title: 'Car Wash Near Cooper City, FL | Hand Wash | Frothy', description: 'Hand car wash and detailing near Cooper City, FL. Premium ceramic coating packages available.' },
  { route: '/car-wash-sunny-isles-fl', title: 'Car Wash Near Sunny Isles Beach, FL | Hand Wash | Frothy', description: 'Premium hand car wash near Sunny Isles Beach, FL. No machines. Ceramic coating & memberships.' },
  { route: '/car-wash-north-miami-beach-fl', title: 'Car Wash Near North Miami Beach, FL | Hand Wash | Frothy', description: 'Professional hand car wash near North Miami Beach, FL. No machines, ceramic coating, memberships.' }]

function injectHead(html, page) {
  const canonical = `${BASE_URL}${page.route}`
  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`)
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${page.description}" />`)
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${page.title}" />`)
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${page.description}" />`)
  html = html.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${BASE_URL}${DEFAULT_OG_IMAGE}" />`)
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
  if (!/<meta property="og:url"/.test(html)) {
    html = html.replace('</head>', `<meta property="og:url" content="${canonical}" />\n</head>`)
  }
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${page.title}" />`)
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${page.description}" />`)
  if (page.route === '/') {
    html = html.replace(
      '</head>',
      `<link rel="preload" as="image" href="/images/hand-car-wash-hollywood-fl-1024w.webp" imagesrcset="/images/hand-car-wash-hollywood-fl-640w.webp 640w, /images/hand-car-wash-hollywood-fl-1024w.webp 1024w, /images/hand-car-wash-hollywood-fl-1536w.webp 1536w" imagesizes="100vw" fetchpriority="high" />\n</head>`
    )
  }
  return html
}

async function main() {
  const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  let ssrModule = null
  if (pages.some((p) => p.ssrKey)) {
    ssrModule = await import(path.join(repoRoot, 'dist-ssr', 'ssr-entry.js'))
  }

  for (const page of pages) {
    let html = injectHead(baseHtml, page)

    if (page.ssrKey) {
      const bodyHtml = page.kind === 'location'
        ? ssrModule.renderLocationPage(page.ssrKey)
        : page.kind === 'core'
        ? ssrModule.renderCorePage(page.ssrKey)
        : ssrModule.renderSeoPage(page.ssrKey)
      html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
    }

    if (page.route === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), html)
    } else {
      const dir = path.join(distDir, page.route.replace(/^\//, ''))
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, 'index.html'), html)
    }
    console.log(`prerendered ${page.route}${page.ssrKey ? ' (with SSR content)' : ' (meta only)'}`)
  }
}

main()
