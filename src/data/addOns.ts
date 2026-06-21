export interface AddOnItem {
  name: string
  price: string
}

export const interiorAddOns: AddOnItem[] = [
  { name: 'Pet Hair Removal', price: '$15–$50' },
  { name: 'Seat Deep Cleaning', price: 'Starting at $25 per seat' },
  { name: 'Carpet Deep Cleaning', price: 'Starting at $25 per side' },
  { name: 'Full Interior Extraction', price: '$99–$199' },
  { name: 'Leather Cleaning & Conditioning', price: 'Starting at $25' },
  { name: 'Plastic Trim Dressing', price: 'Starting at $15' },
  { name: 'Odor Removal', price: '$30–$75' },
  { name: 'Ozone Treatment', price: '$50–$100' },
  { name: 'Child Seat Cleaning', price: '$20–$40' },
  { name: 'Headliner Cleaning', price: '$40–$80' },
  { name: 'Steam Cleaning', price: '$50–$150' },
  { name: 'Interior Sanitization', price: '$25–$50' },
  { name: 'Mold Remediation', price: '$100–$300' },
]

export const exteriorAddOns: AddOnItem[] = [
  { name: 'Hand Wax', price: '$40–$60' },
  { name: 'Spray Wax', price: '$15–$25' },
  { name: 'Clay Bar Treatment', price: '$50–$100' },
  { name: 'Iron Decontamination', price: '$50–$100' },
  { name: 'Tar Removal', price: '$25–$75' },
  { name: 'Bug Removal', price: '$15–$30' },
  { name: 'Water Spot Removal', price: '$50–$150' },
  { name: 'Tree Sap Removal', price: '$30–$100' },
  { name: 'Paint Decontamination', price: '$75–$150' },
  { name: 'Chrome Polishing', price: '$25–$75' },
  { name: 'Engine Bay Detail', price: 'Starting at $30' },
  { name: 'Wheel Deep Cleaning', price: '$25–$50' },
  { name: 'Trim Restoration', price: '$50–$150' },
]

export const paintCorrectionServices: AddOnItem[] = [
  { name: 'One-Step Polish', price: '$150–$300' },
  { name: 'Two-Step Paint Correction', price: '$300–$700' },
  { name: 'Three-Step Paint Correction', price: '$700–$1,500' },
  { name: 'Swirl Mark Removal', price: '$200–$600' },
  { name: 'Light Scratch Removal', price: '$75–$300' },
  { name: 'Heavy Scratch Removal', price: 'Quote' },
  { name: 'Oxidation Removal', price: '$150–$500' },
  { name: 'Paint Enhancement', price: '$190–$300' },
]

export const headlightGlassServices: AddOnItem[] = [
  { name: 'Headlight Restoration', price: 'Starting at $50' },
  { name: 'Taillight Restoration', price: '$50–$100' },
  { name: 'Windshield Water Repellent', price: '$25–$50' },
  { name: 'Glass Polishing', price: '$75–$200' },
  { name: 'Water Spot Glass Correction', price: '$50–$150' },
]

export const specialtyServices: AddOnItem[] = [
  { name: 'Convertible Top Cleaning', price: '$50–$150' },
  { name: 'Convertible Top Protection', price: '$50–$150' },
  { name: 'Decal Removal', price: '$50–$200' },
  { name: 'Sticker Removal', price: '$20–$100' },
  { name: 'Overspray Removal', price: '$100–$500' },
  { name: 'Smoke Odor Treatment', price: 'Starting at $50' },
  { name: 'Flood Cleanup', price: 'Quote' },
]

export const fleetLuxuryServices: AddOnItem[] = [
  { name: 'Fleet Wash', price: 'Custom' },
  { name: 'Dealer Prep', price: 'Custom' },
  { name: 'Rental Car Turnaround', price: 'Custom' },
  { name: 'Corporate Vehicle Maintenance', price: 'Custom' },
  { name: 'Concierge Pick-Up & Delivery', price: '$25–$75' },
  { name: 'VIP Same-Day Service', price: '+$25 Premium' },
  { name: 'Airport Vehicle Detailing', price: '$100–$300' },
  { name: 'Boat Wash (20–25 ft)', price: '$8–$15/ft' },
  { name: 'RV Wash', price: '$10–$20/ft' },
  { name: 'Motorcycle Detail', price: '$100–$250' },
]

export const addOnGroups: { title: string; items: AddOnItem[] }[] = [
  { title: 'Interior Add-Ons', items: interiorAddOns },
  { title: 'Exterior Add-Ons', items: exteriorAddOns },
  { title: 'Paint Correction', items: paintCorrectionServices },
  { title: 'Headlights & Glass', items: headlightGlassServices },
  { title: 'Specialty Services', items: specialtyServices },
  { title: 'Fleet & Luxury', items: fleetLuxuryServices },
]
