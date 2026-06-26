export interface LocationSection {
  heading: string
  paragraphs: string[]
}

export interface LocationLink {
  label: string
  to: string
}

export interface LocationPageData {
  slug: string
  cityName: string
  title: string
  description: string
  badge: string
  h1: string
  intro: string
  heroImage: string
  distanceLabel: string
  distanceText: string
  sections: LocationSection[]
  internalLinks: LocationLink[]
  ctaHeading: string
}

export const locationPages: Record<string, LocationPageData> = {
  hallandaleBeach: {
    slug: '/car-wash-hallandale-beach-fl',
    cityName: 'Hallandale Beach',
    title: 'Car Wash Near Hallandale Beach, FL | Frothy Carwash Lounge',
    description:
      'Hand car wash, detailing & ceramic coating just minutes from Hallandale Beach, FL. Walk-ins welcome, indoor lounge with coffee & Wi-Fi while you wait.',
    badge: 'Serving Hallandale Beach, FL',
    h1: 'Car Wash Near Hallandale Beach, FL',
    intro:
      "If you live or work in Hallandale Beach, Frothy Carwash Lounge is the closest premium hand car wash to you — just a few minutes inland in Hollywood, FL. No tunnels, no machines, just a hand wash, full detailing, and ceramic coating done right.",
    heroImage: '/images/exterior-after.webp',
    distanceLabel: '~3.5 miles · 8–10 minute drive',
    distanceText:
      'From most of Hallandale Beach — including the Three Islands area and the stretch along Hallandale Beach Blvd — Frothy Carwash Lounge at 2223 Pembroke Rd is roughly a 3 to 4 mile drive, typically 8 to 10 minutes depending on traffic on Federal Highway or I-95.',
    sections: [
      {
        heading: 'Why Hallandale Beach drivers choose Frothy',
        paragraphs: [
          "Hallandale Beach sees a lot of salt air, beach sand, and year-round sun — all things that wear down paint and interiors faster than inland driving alone. Residents near the beach and the Gulfstream Park area come to Frothy specifically because we hand wash every vehicle, which removes embedded salt and sand without the swirl marks an automatic tunnel wash can leave behind.",
          "We also see a steady stream of customers from Hallandale's condo towers who don't have access to a hose or wash bay at home. A quick walk-in hand wash at Frothy takes care of what HOA rules won't let you do in the parking garage.",
        ],
      },
      {
        heading: 'A real place to wait — not a parking lot',
        paragraphs: [
          "Most car washes near Hallandale Beach have you standing outside in the heat or sitting in your car. At Frothy, you wait inside an actual lounge: massage chairs, free Wi-Fi, and espresso or coffee while our team hand washes your car. For Hallandale residents running errands toward Hollywood or Aventura, it's an easy stop that turns a chore into a short break.",
        ],
      },
      {
        heading: 'Detailing and ceramic coating for coastal driving',
        paragraphs: [
          "Salt air is hard on clear coat, chrome, and rubber trim — which is exactly what our detailing and ceramic coating services are built to fight. A ceramic coating creates a hydrophobic barrier that sheds salt spray and water spots before they can etch into your paint, and it's especially worth it for anyone parking near the beach regularly.",
          "Full interior and exterior detailing is also popular with Hallandale Beach customers after trips to the sand — we get sand out of carpets, seats, and door tracks that a home vacuum never fully reaches.",
        ],
      },
      {
        heading: 'Getting to Frothy from Hallandale Beach',
        paragraphs: [
          "From Three Islands, the Golden Isles, or anywhere along Hallandale Beach Blvd, the drive to Frothy is straightforward: head west to Federal Highway (US-1) or I-95, then south toward Pembroke Road. There's no need to plan a special trip — most customers fold a hand wash into a grocery run, a trip to the gym, or a commute toward Hollywood or Aventura.",
          "Whether you're maintaining a daily driver, prepping a car for a Gulfstream Park event, or just tired of sand in the floor mats, Frothy is the closest hand wash that treats Hallandale Beach vehicles the way coastal driving demands.",
          "We also offer monthly memberships if you find yourself making the drive from Hallandale Beach regularly — locking in a set number of hand washes or details each month works out cheaper than paying walk-in pricing every time, especially if you're trying to stay ahead of salt air and beach sand year-round. Call ahead and our team can recommend the plan that best matches how often you're making the trip.",
        ],
      },
    ],
    internalLinks: [
      { label: 'Hand Car Wash in Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
      { label: 'Ceramic Coating in Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
      { label: 'View All Services & Pricing', to: '/services' },
      { label: 'Monthly Memberships', to: '/memberships' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'Closest premium hand wash to Hallandale Beach',
  },

  daniaBeach: {
    slug: '/car-wash-dania-beach-fl',
    cityName: 'Dania Beach',
    title: 'Car Wash Near Dania Beach, FL | Frothy Carwash Lounge',
    description:
      'Hand car wash & detailing near Dania Beach and Fort Lauderdale-Hollywood Airport. Quick turnaround, indoor lounge, ceramic coating available. Open 7 days.',
    badge: 'Serving Dania Beach, FL',
    h1: 'Car Wash Near Dania Beach, FL',
    intro:
      "Frothy Carwash Lounge sits just south of Dania Beach, making us a convenient hand car wash for anyone near the marina district, the antiques row on Federal Highway, or Fort Lauderdale-Hollywood International Airport. Hand wash, full detail, or ceramic coating — all without ever touching a machine.",
    heroImage: '/images/exterior-before.webp',
    distanceLabel: '~5 miles · 10–13 minute drive',
    distanceText:
      'From downtown Dania Beach and the marina area near Dania Beach Blvd, Frothy is about 5 miles south, generally a 10 to 13 minute drive via Federal Highway (US-1) or I-95.',
    sections: [
      {
        heading: 'Convenient for airport and marina traffic',
        paragraphs: [
          "Dania Beach sits right next to Fort Lauderdale-Hollywood International Airport, and a lot of our Dania Beach customers are travelers who want their car cleaned before or after a trip, or locals heading to or from the airport for work. A walk-in hand wash fits easily into that kind of schedule — no appointment needed, just stop by on the way.",
          "We also see plenty of boat owners and marina workers from the Dania Beach waterfront. Salt spray and boat ramp grime are tough on a vehicle's exterior, and our hand wash and detailing services are built to handle that kind of buildup without damaging paint the way an automatic wash can.",
          "Dania Beach is also home to a growing number of new residential developments along the water, and we've become a regular stop for residents there who want a thorough hand wash without the hassle of an at-home setup or a trip further north.",
        ],
      },
      {
        heading: 'Antiques district and local business customers',
        paragraphs: [
          "Dania Beach's Antique Row along Federal Highway draws a steady flow of shoppers and dealers moving furniture and goods in and out of their vehicles — which means interiors that need real attention. Our interior detailing handles dust, fabric stains, and general wear from hauling goods, while our exterior wash and wax keeps the outside looking sharp for business owners who drive their vehicle as part of their brand.",
          "We also work with several local delivery drivers and rideshare operators based out of the Dania Beach area who need a fast, reliable hand wash between jobs — something an automatic wash with a long queue often can't offer on a tight schedule.",
        ],
      },
      {
        heading: 'Why hand washing matters this close to the coast',
        paragraphs: [
          'Being this close to the Intracoastal and the ocean means more salt exposure than vehicles see further inland. Ceramic coating is a popular upgrade for Dania Beach customers for exactly this reason — it keeps salt and water from bonding to paint and makes regular hand washes even more effective at keeping a car looking new.',
        ],
      },
      {
        heading: 'Getting to Frothy from Dania Beach',
        paragraphs: [
          "From downtown Dania Beach, the marina district, or the streets around the airport, reaching Frothy is a quick trip south on Federal Highway (US-1) or I-95 to Pembroke Road. It's an easy stop before a flight, after pulling the boat out of the water, or on a regular errand run through Hollywood.",
          "Whether you're a daily commuter, a weekend boater, or just passing through Dania Beach on your way south, Frothy gives you a thorough hand wash without the wait or the brushes of a tunnel wash.",
          "If a trip to the marina or the airport is part of your regular routine, a Frothy membership can make sense — it bundles several hand washes or details into one monthly price so you're not paying full walk-in rates every time salt spray or boat ramp grime needs to come off your car.",
        ],
      },
    ],
    internalLinks: [
      { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
      { label: 'Ceramic Coating in Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
      { label: 'View All Services & Pricing', to: '/services' },
      { label: 'Monthly Memberships', to: '/memberships' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'On your way to or from the airport? Stop in.',
  },

  pembrokePines: {
    slug: '/car-wash-pembroke-pines-fl',
    cityName: 'Pembroke Pines',
    title: 'Car Wash Near Pembroke Pines, FL | Frothy Carwash Lounge',
    description:
      'Premium hand car wash and detailing worth the drive from Pembroke Pines, FL. Memberships, ceramic coating, and a real indoor lounge while you wait.',
    badge: 'Serving Pembroke Pines, FL',
    h1: 'Car Wash Near Pembroke Pines, FL',
    intro:
      "Frothy Carwash Lounge is a short drive east from Pembroke Pines, and for families and commuters tired of automatic tunnel washes, it's worth the trip. Every vehicle is washed entirely by hand — no brushes, no machines — with detailing and ceramic coating available for cars that need more than a quick rinse.",
    heroImage: '/images/black-corvette-front-three-quarter-view.webp',
    distanceLabel: '~8 miles · 15–20 minute drive',
    distanceText:
      'From central Pembroke Pines near Pines Blvd and Flamingo Road, Frothy is roughly 8 miles east, typically a 15 to 20 minute drive via Pines Blvd to Hollywood, or I-75 to I-595 depending on the time of day.',
    sections: [
      {
        heading: 'Why Pembroke Pines families make the drive',
        paragraphs: [
          "Pembroke Pines has plenty of car washes closer to home, but most of them are automatic tunnels — the same spinning brushes on every vehicle, all day. Families with SUVs and minivans full of kids, sports gear, and beach trips tend to need more than a quick rinse, and our hand wash and interior detailing actually get into footwells, cup holders, and upholstery the way a tunnel wash never will.",
          "A number of our Pembroke Pines customers also commute toward Hollywood, Hallandale, or Aventura for work, and use Frothy as a stop on the way rather than a special trip — getting a hand wash done while they'd otherwise be sitting in traffic anyway.",
          "Pembroke Pines is a sprawling city, and depending on which neighborhood you're in — from the older sections near Hollywood to newer developments further west — the calculus on driving a bit further for a better wash changes. For residents on the eastern side of the city especially, Frothy is genuinely one of the closer premium options rather than a major detour.",
        ],
      },
      {
        heading: 'Memberships make the extra distance worth it',
        paragraphs: [
          'For Pembroke Pines customers who commit to a membership, the value adds up quickly — unlimited or discounted hand washes, priority scheduling, and detailing perks that make the slightly longer drive worthwhile compared to a closer but lower-quality automatic wash.',
          "We also recommend ceramic coating for Pembroke Pines drivers who do a lot of highway miles — it keeps bug splatter, road tar, and sun fade from settling in between visits, so even a 2 to 3 week gap between washes still looks clean.",
        ],
      },
      {
        heading: 'A break from the errand-running routine',
        paragraphs: [
          "Instead of waiting in a hot car or standing in a parking lot, Pembroke Pines customers can relax in our indoor lounge with massage chairs, free Wi-Fi, and coffee while their car is hand washed — turning the trip into something closer to a break than a chore.",
        ],
      },
      {
        heading: 'Getting to Frothy from Pembroke Pines',
        paragraphs: [
          "From central Pembroke Pines, the most direct route is east on Pines Blvd toward Hollywood, or I-75 to I-595 if you're coming from the western edges of the city. Either way, it's a manageable drive that most customers pair with a commute, a shopping trip, or a visit to family in Hollywood or Hallandale.",
          "For Pembroke Pines drivers who want their car looking its best without resorting to an automatic tunnel wash, the extra few miles east to Frothy is consistently worth it — especially once a membership makes repeat visits effortless.",
          "If you're weighing whether the drive is worth it, most Pembroke Pines customers tell us the same thing: the quality difference is obvious the first time, and the lounge makes the wait genuinely enjoyable instead of something to plan around.",
        ],
      },
    ],
    internalLinks: [
      { label: 'Monthly Memberships', to: '/memberships' },
      { label: 'Hand Car Wash in Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
      { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
      { label: 'View All Services & Pricing', to: '/services' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'Worth the drive from Pembroke Pines',
  },

  aventura: {
    slug: '/car-wash-aventura-fl',
    cityName: 'Aventura',
    title: 'Car Wash Near Aventura, FL | Frothy Carwash Lounge',
    description:
      'Hand car wash, detailing, and ceramic coating near Aventura, FL. Trusted by luxury and exotic car owners near Aventura Mall. Open 7 days, walk-ins welcome.',
    badge: 'Serving Aventura, FL',
    h1: 'Car Wash Near Aventura, FL',
    intro:
      "Aventura is home to some of South Florida's nicest cars, and Frothy Carwash Lounge is the hand car wash and detailing shop those owners trust just south in Hollywood, FL. No brushes, no machines — every vehicle, from daily drivers to exotics, is washed entirely by hand.",
    heroImage: '/images/hand-car-wash-hollywood-fl.webp',
    distanceLabel: '~11 miles · 18–22 minute drive',
    distanceText:
      'From Aventura Mall and the surrounding condo towers, Frothy is about 11 miles south, generally an 18 to 22 minute drive via Biscayne Blvd / US-1 or I-95 depending on traffic.',
    sections: [
      {
        heading: 'Why Aventura car owners skip the automatic wash',
        paragraphs: [
          "Aventura has no shortage of high-end and exotic vehicles, and owners of those cars know that automatic tunnel washes are a real risk to paint — the same brushes and cloth strips touch every car that drives through, picking up grit along the way. For a car worth protecting, that's not a risk worth taking for the sake of convenience.",
          "Frothy hand washes every vehicle with fresh microfiber towels and car-safe products, which is why we see a steady stream of Aventura customers with luxury sedans, exotics, and daily drivers alike who simply won't put their car through a machine.",
          "It's not just exotics, either — daily drivers in Aventura see the same coastal sun and salt exposure as anywhere else in this part of South Florida, and a hand wash with proper drying technique avoids the water spots and mineral deposits that build up from inconsistent washing.",
        ],
      },
      {
        heading: 'Ceramic coating built for condo and garage parking',
        paragraphs: [
          'Many Aventura residents park in covered garages or valet structures, which actually makes ceramic coating even more effective — less direct sun exposure means the coating\'s gloss and protection last longer between washes. Our 3-year and 5-year ceramic coating packages are popular with Aventura customers who want their car looking showroom-fresh between detailing visits.',
          "Beyond paint protection, ceramic coating also makes the day-to-day easier — a coated car sheds dust and pollen far more easily than bare paint, which matters in a high-rise environment where a car can sit between drives longer than it would for someone parking outdoors and driving daily.",
        ],
      },
      {
        heading: 'A lounge experience that matches the neighborhood',
        paragraphs: [
          "We built Frothy's indoor lounge — massage chairs, espresso, free Wi-Fi — with exactly this kind of customer in mind: people who care about their car and don't want to spend their wait standing in a parking lot. Stop in on your way to or from Aventura Mall and let us take care of the wash while you take a break.",
          "We've also found that Aventura clients tend to keep their cars longer when they're maintained properly from day one, which is exactly why so many ask us about a membership the first time they visit — it's a simple way to protect a six-figure investment without thinking about it every week.",
        ],
      },
      {
        heading: 'Getting to Frothy from Aventura',
        paragraphs: [
          "From Aventura Mall or the surrounding condo corridor along Biscayne Blvd, the drive south to Frothy is a straight shot down US-1 or I-95 to Hollywood. Many Aventura customers time their visit around errands near the Hollywood/Hallandale border rather than making it a special trip.",
          "For a city with this many luxury and exotic vehicles, a hand car wash that won't put your paint at risk is worth the short drive — and our indoor lounge makes the wait feel like part of the day rather than an interruption to it.",
        ],
      },
    ],
    internalLinks: [
      { label: 'Ceramic Coating in Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
      { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
      { label: 'View Ceramic Coating Pricing', to: '/ceramic' },
      { label: 'View All Services & Pricing', to: '/services' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'The hand wash Aventura car owners trust',
  },
}
