import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const Ceramic = lazy(() => import('./pages/Ceramic'))
const Memberships = lazy(() => import('./pages/Memberships'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Gallery = lazy(() => import('./pages/Gallery'))
const NotFound = lazy(() => import('./pages/NotFound'))
const HandCarWashHollywood = lazy(() => import('./pages/HandCarWashHollywood'))
const CarDetailingHollywood = lazy(() => import('./pages/CarDetailingHollywood'))
const CeramicCoatingHollywood = lazy(() => import('./pages/CeramicCoatingHollywood'))
const CarWashHallandaleBeach = lazy(() => import('./pages/CarWashHallandaleBeach'))
const CarWashDaniaBeach = lazy(() => import('./pages/CarWashDaniaBeach'))
const CarWashPembrokePines = lazy(() => import('./pages/CarWashPembrokePines'))
const CarWashAventura = lazy(() => import('./pages/CarWashAventura'))
const AreasWeServe = lazy(() => import('./pages/AreasWeServe'))
const PaintCorrection = lazy(() => import('./pages/PaintCorrection'))
const PetHairRemoval = lazy(() => import('./pages/PetHairRemoval'))
const SmokeOdorRemoval = lazy(() => import('./pages/SmokeOdorRemoval'))
const EngineBayCleaning = lazy(() => import('./pages/EngineBayCleaning'))
const HeadlightRestoration = lazy(() => import('./pages/HeadlightRestoration'))
const CarWashFortLauderdale = lazy(() => import('./pages/CarWashFortLauderdale'))
const CarWashDavie = lazy(() => import('./pages/CarWashDavie'))
const CarWashCooperCity = lazy(() => import('./pages/CarWashCooperCity'))
const CarWashSunnyIsles = lazy(() => import('./pages/CarWashSunnyIsles'))
const CarWashNorthMiamiBeach = lazy(() => import('./pages/CarWashNorthMiamiBeach'))

export default function App() {
  return (
    <div className="min-h-screen bg-frothy-foam">
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ceramic" element={<Ceramic />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/areas-we-serve" element={<AreasWeServe />} />
            <Route path="/hand-car-wash-hollywood-fl" element={<HandCarWashHollywood />} />
            <Route path="/car-detailing-hollywood-fl" element={<CarDetailingHollywood />} />
            <Route path="/ceramic-coating-hollywood-fl" element={<CeramicCoatingHollywood />} />
            <Route path="/car-wash-hallandale-beach-fl" element={<CarWashHallandaleBeach />} />
            <Route path="/car-wash-dania-beach-fl" element={<CarWashDaniaBeach />} />
            <Route path="/car-wash-pembroke-pines-fl" element={<CarWashPembrokePines />} />
            <Route path="/car-wash-aventura-fl" element={<CarWashAventura />} />
            <Route path="/paint-correction-hollywood-fl" element={<PaintCorrection />} />
            <Route path="/pet-hair-removal-hollywood-fl" element={<PetHairRemoval />} />
            <Route path="/smoke-odor-removal-hollywood-fl" element={<SmokeOdorRemoval />} />
            <Route path="/engine-bay-cleaning-hollywood-fl" element={<EngineBayCleaning />} />
            <Route path="/headlight-restoration-hollywood-fl" element={<HeadlightRestoration />} />
            <Route path="/car-wash-fort-lauderdale-fl" element={<CarWashFortLauderdale />} />
            <Route path="/car-wash-davie-fl" element={<CarWashDavie />} />
            <Route path="/car-wash-cooper-city-fl" element={<CarWashCooperCity />} />
            <Route path="/car-wash-sunny-isles-fl" element={<CarWashSunnyIsles />} />
            <Route path="/car-wash-north-miami-beach-fl" element={<CarWashNorthMiamiBeach />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
            <WhatsAppButton /><SpeedInsights />
      
    </div>
  )
      <a href="https://wa.me/19545103073?text=Hi%20Frothy%20Carwash%2C%20I'd%20like%20to%20book%20a%20wash" target="_blank" rel="noopener noreferrer" style={{position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px', backgroundColor: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)'}}><svg width="35" height="35" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.01-5.002 5.518-5.002 9.236 0 1.548.235 3.069.703 4.519.79 2.408 2.637 4.431 5.003 5.528 1.587.712 3.287 1.123 5.08 1.123 5.514 0 10-4.486 10-10S17.486 2 12 2c-1.793 0-3.493.411-5.08 1.123"/></svg>svg></a></svg>
}
// Build trigger: Sat Jul  4 22:13:07 EDT 2026
