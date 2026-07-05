import { useSEO, PAGE_SEO } from '../hooks/useSEO'
import Hero from '../sections/Hero'
import InfoBar from '../sections/InfoBar'
import ServicesPreview from '../sections/ServicesPreview'
import BeforeAfter from '../sections/BeforeAfter'
import WhyFrothy from '../sections/WhyFrothy'
import GoogleReviewsSlider from '../components/GoogleReviewsSlider'
import CeramicCTA from '../sections/CeramicCTA'
import LocationCTA from '../sections/LocationCTA'
import HomeSEOContent from '../sections/HomeSEOContent'

export default function Home() {
  useSEO(PAGE_SEO.home)
  return (
    <>
      <Hero />
      <InfoBar />
      <ServicesPreview />
      <BeforeAfter />
      <WhyFrothy />
      <GoogleReviewsSlider />
      <CeramicCTA />
      <HomeSEOContent />
      <LocationCTA />
    </>
  )
}
