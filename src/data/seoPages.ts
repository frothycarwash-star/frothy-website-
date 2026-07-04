hexport interface FAQItem {
  question: string
  answer: string
}

export interface SEOPageSection {
  heading: string
  paragraphs: string[]
}

export interface InternalLink {
  label: string
  to: string
}

export interface SEOPageData {
  slug: string
  title: string
  description: string
  badge: string
  h1: string
  intro: string
  heroImage: string
  sections: SEOPageSection[]
  faq: FAQItem[]
  internalLinks: InternalLink[]
  ctaHeading: string
}

export const seoPages: Record<string, SEOPageData> = {
  handCarWash: {
    slug: '/hand-car-wash-hollywood-fl',
    title: 'Hand Car Wash Hollywood FL | Frothy Carwash Lounge',
    description:
      'Premium hand car wash in Hollywood, FL. No machines, no brushes — every car washed by hand. Walk-ins welcome, 7 days a week. Call (954) 510-3073.',
    badge: 'Hand Car Wash · Hollywood, FL',
    h1: 'Hand Car Wash in Hollywood, FL',
    intro:
      "Frothy Carwash Lounge is Hollywood's premium hand car wash — every vehicle is washed entirely by hand, never run through a machine or tunnel. If you've been searching for a hand wash car wash in Hollywood that actually treats your paint with care, you've found it.",
    heroImage: '/images/hand-car-wash-service-hollywood-fl.webp',
    sections: [
      {
        heading: 'Why a hand car wash beats an automatic wash',
        paragraphs: [
          "Automatic tunnel washes use the same spinning brushes and cloth strips on every car that drives through — brushes that pick up grit from the last vehicle and drag it across your paint. Over time, that's how swirl marks and fine scratches build up, even on a brand-new car.",
          "A hand car wash in Hollywood FL like Frothy eliminates that risk entirely. Our team uses fresh microfiber towels, pH-balanced soap, and a two-bucket method, washing each panel by hand and rinsing the wash mitt between sections. The result is a noticeably deeper shine and a finish that doesn't degrade your clear coat over time.",
          "It's also simply more thorough. A machine can't get into door jambs, around emblems, behind mirrors, or into wheel wells the way a trained pair of hands can. Every full service hand car wash at Frothy covers the parts of your car an automatic wash skips entirely.",
        ],
      },
      {
        heading: 'What our premium hand car wash includes',
        paragraphs: [
          'Our hand wash packages start with a thorough pre-rinse and bug/tar pre-treatment, followed by a hand wash of the entire exterior using soft wash mitts and premium car-safe soap. We hand-dry with plush microfiber towels to avoid water spotting — something an automatic dryer can never fully prevent.',
          'Interior service is included on most packages: vacuuming carpets and seats, wiping down the dash and console, cleaning interior glass, and tire shine for a finished look inside and out. Sedan and SUV pricing is available, and you can see exact pricing on our services page.',
          "Need a quick rinse between full washes, or want to step it up to a Signature Detail or ceramic coating? We offer all three under one roof, so your car gets exactly the level of care it needs at the time.",
        ],
      },
      {
        heading: 'A hand car wash near you that doubles as a lounge',
        paragraphs: [
          "Most hand car washes near you have you waiting outside in the heat. At Frothy, you wait inside our indoor lounge — massage chairs, free Wi-Fi, and espresso and coffee while your car is hand washed. It's the kind of experience that makes a 20-minute wash feel like a break in your day instead of an errand.",
          "We're located at 2223 Pembroke Rd in Hollywood, FL, open 7 days a week from 8AM to 7PM, and we welcome walk-ins — no appointment required for a standard hand wash.",
        ],
      },
    ],
    faq: [
      {
        question: 'How long does a hand car wash take?',
        answer:
          'A standard hand wash typically takes 20–30 minutes. Signature Detail packages take longer, generally 60–90 minutes depending on the size of the vehicle and the package selected.',
      },
      {
        question: 'Do I need an appointment for a hand wash?',
        answer:
          'No — walk-ins are welcome for hand washes 7 days a week, 8AM to 7PM. Signature Detailing and ceramic coating appointments are recommended so we can allocate enough time for your vehicle.',
      },
      {
        question: 'Is a hand car wash better than an automatic wash?',
        answer:
          "Yes. Automatic washes reuse the same brushes on every vehicle, which can introduce swirl marks over time. Hand washing with fresh microfiber towels and a two-bucket method is gentler on your paint and gets into areas a machine can't reach.",
      },
      {
        question: 'Do you wash luxury and exotic vehicles?',
        answer:
          'Absolutely. Because every wash is done by hand with car-safe products, we regularly hand wash luxury, exotic, and high-end vehicles where paint care matters most.',
      },
    ],
    internalLinks: [
      { label: 'View All Services & Pricing', to: '/services' },
      { label: 'Ceramic Coating in Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
      { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
      { label: 'Monthly Memberships', to: '/memberships' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'Walk in today for a premium hand car wash',
  },

  carDetailing: {
    slug: '/car-detailing-hollywood-fl',
    title: 'Car Detailing Hollywood FL | Interior & Exterior Detailing | Frothy',
    description:
      'Professional car detailing in Hollywood, FL. Interior & exterior detailing and showroom packages from $65. Book your detail at Frothy Carwash Lounge.',
    badge: 'Auto Detailing · Hollywood, FL',
    h1: 'Car Detailing in Hollywood, FL',
    intro:
      "Frothy Carwash Lounge offers professional car detailing in Hollywood, FL — full interior detailing, exterior detailing, and complete showroom-quality packages. Whether your car needs a deep clean or a full restoration of that new-car feel, our detailing team handles it by hand, panel by panel.",
    heroImage: '/images/seats-after.webp',
    sections: [
      {
        heading: 'Interior detailing that goes beyond a vacuum',
        paragraphs: [
          "Our interior detailing in Hollywood covers everything a quick vacuum misses: deep extraction of carpets and seats, steam cleaning of cracks and crevices, conditioning of leather or fabric upholstery, full dashboard and trim restoration, interior glass cleaning, and odor elimination.",
          "If your car sees kids, pets, beach trips, or just daily life in South Florida, interior detailing resets it — lifting out sand, salt, stains, and smells that build up over months of regular use.",
        ],
      },
      {
        heading: 'Exterior detailing for a deeper, longer-lasting shine',
        paragraphs: [
          "Exterior detailing in Hollywood at Frothy starts with a full hand wash and decontamination wash to strip away embedded grime, followed by clay bar treatment to remove bonded contaminants your paint can't shed on its own. From there we apply a premium sealant or wax for a glossy, protected finish.",
          "For vehicles with swirl marks, light scratches, or oxidation, we offer paint correction as part of our higher-tier detailing packages — restoring clarity and depth to the paint before sealing it in.",
          "Wheels, tires, and trim get the same attention: deep wheel cleaning, tire dressing, and exterior trim restoration so nothing gets overlooked.",
        ],
      },
      {
        heading: 'Showroom packages and pricing',
        paragraphs: [
          'Signature Details at Frothy start at $65 and go up to $299 for our showroom-level packages, with separate sedan and SUV pricing. Every detailing package can be paired with ceramic coating for long-term protection once the correction work is done — see full pricing on our services page.',
          "Detailing is by appointment so we can give your vehicle the time it needs — book online or call us directly and we'll walk you through which package fits your car best.",
          "Many of our Hollywood, FL detailing customers start with a Signature Detail or Executive Finish and move up to a Signature Detail or Showroom package once they see the difference paint correction and proper interior treatment makes. If you're not sure which tier your car needs, send us a few photos when you call and we'll recommend a starting point.",
          "Detailing pairs especially well with our monthly memberships — Gold and Platinum members get a Signature Detail or Executive Finish included every month, so the deeper clean becomes part of your regular routine instead of an occasional splurge.",
        ],
      },
    ],
    faq: [
      {
        question: 'What is included in a Signature Detail?',
        answer:
          'A Signature Detail includes a complete hand wash, interior vacuuming and wipe-down, interior glass cleaning, exterior wheel and tire cleaning, and a protective wax or sealant application. Higher tiers add paint correction, leather conditioning, and steam cleaning.',
      },
      {
        question: 'How long does interior detailing take?',
        answer:
          'Interior detailing typically takes 60–120 minutes depending on the size of the vehicle and the level of cleaning needed. Heavily soiled interiors or pet hair removal may take longer.',
      },
      {
        question: 'Do I need an appointment for detailing?',
        answer:
          'Yes, we recommend booking ahead for detailing services so we can set aside enough time to do the job right. Standard hand washes do not require an appointment.',
      },
      {
        question: 'Can detailing be combined with ceramic coating?',
        answer:
          'Yes — most customers pair a Signature Detail with ceramic coating, since the detail (including paint correction) prepares the surface for the best possible ceramic bond and finish.',
      },
    ],
    internalLinks: [
      { label: 'View All Services & Pricing', to: '/services' },
      { label: 'Ceramic Coating in Hollywood, FL', to: '/ceramic-coating-hollywood-fl' },
      { label: 'Hand Car Wash in Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
      { label: 'Monthly Memberships', to: '/memberships' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'Book your car detailing appointment',
  },

  ceramicCoatingSEO: {
    slug: '/ceramic-coating-hollywood-fl',
    title: 'Ceramic Coating Hollywood FL | Paint Protection Near Me | Frothy',
    description:
      'Ceramic coating in Hollywood, FL from $149. 1, 3, and 5-year paint protection packages with hydrophobic finish and UV gloss. Free quotes at Frothy.',
    badge: 'Paint Protection · Hollywood, FL',
    h1: 'Ceramic Coating in Hollywood, FL',
    intro:
      "Searching for ceramic coating near you in South Florida? Frothy Carwash Lounge applies professional-grade ceramic coatings in Hollywood, FL, with packages ranging from a 1-year spray sealant to a 5-year ultimate protection package. Every coating is applied by hand after a full paint decontamination.",
    heroImage: '/images/ceramic-coating-hollywood-fl.webp',
    sections: [
      {
        heading: 'Why ceramic coating matters in South Florida',
        paragraphs: [
          "South Florida's combination of intense year-round UV exposure, salt air, and sudden rain makes paint protection more important here than almost anywhere else in the country. Unprotected paint oxidizes faster, water spots more easily, and tree sap or bird droppings near coastal areas can etch into clear coat within days.",
          "Ceramic coating creates a hard, hydrophobic layer bonded to your factory paint. Water beads up and rolls off instead of sitting and spotting, UV rays are blocked before they can fade or oxidize the paint, and contaminants like sap, salt, and bird droppings wash off instead of bonding to the surface.",
        ],
      },
      {
        heading: 'Ceramic coating packages near Hollywood, FL',
        paragraphs: [
          'We offer four tiers of paint protection depending on how long you plan to keep your vehicle and how much protection you want: an entry-level ceramic spray sealant from $149, a 1-year coating, a 3-year coating (our most popular package), and a 5-year ultimate package that includes wheel and glass ceramic coating.',
          'Every ceramic coating starts with paint decontamination — washing, clay bar treatment, and in some cases paint correction — so the coating bonds directly to clean, smooth paint rather than trapping dirt or swirl marks underneath it.',
          'Add-ons like wheel ceramic coating and glass ceramic coating extend the same hydrophobic, easy-clean protection to the parts of your car that take the most abuse from brake dust and road grime.',
        ],
      },
      {
        heading: 'What to expect after coating',
        paragraphs: [
          "Once applied, ceramic coating needs a short cure time before the vehicle gets wet. After that, maintenance is simple: regular hand washes (never automatic tunnel washes, which can introduce swirl marks that dull the coating's gloss) keep the surface performing at its best for the full length of the warranty period.",
          "We recommend a maintenance hand wash every one to two weeks for coated vehicles, along with an annual inspection so we can top off any high-wear areas before the coating's protection starts to fade. Most Hollywood, FL customers find that a coated car needs noticeably less scrubbing to come clean, since dirt and grime no longer bond directly to the paint.",
          'Call ahead or stop by for a free quote — pricing depends on vehicle size and condition, and we\'ll recommend the right tier for your car and budget.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long does ceramic coating last?',
        answer:
          'Depending on the package, ceramic coating lasts between 1 and 5 years. Our most popular package is the 3-year coating, which balances durability with cost for most daily-driven vehicles.',
      },
      {
        question: 'How long does the ceramic coating application take?',
        answer:
          'Most ceramic coating appointments take a half day to a full day, depending on the tier and whether paint correction is needed beforehand. We recommend booking ahead for ceramic coating services.',
      },
      {
        question: 'Is ceramic coating worth it in Florida?',
        answer:
          "Yes — Florida's intense UV exposure, salt air, and frequent rain make paint protection especially valuable. Ceramic coating blocks UV-related fading, repels water and salt, and makes regular washing easier.",
      },
      {
        question: 'Do you offer ceramic coating for wheels and glass?',
        answer:
          'Yes, wheel ceramic coating and glass ceramic coating are available as add-ons to any package, or included automatically in our 5-year ultimate package.',
      },
    ],
    internalLinks: [
      { label: 'View Ceramic Coating Pricing', to: '/ceramic' },
      { label: 'Car Detailing in Hollywood, FL', to: '/car-detailing-hollywood-fl' },
      { label: 'Hand Car Wash in Hollywood, FL', to: '/hand-car-wash-hollywood-fl' },
      { label: 'Monthly Memberships', to: '/memberships' },
      { label: 'Contact & Directions', to: '/contact' },
    ],
    ctaHeading: 'Get a free ceramic coating quote',
  },
}
