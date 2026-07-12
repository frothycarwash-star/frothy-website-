import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
              <a
                          href="https://wa.me/19545103073?text=Hi%20Frothy%20Carwash%20I'd%20like%20to%20book%20a%20wash"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                                        position: 'fixed',
                                        bottom: '20px',
                                        right: '20px',
                                        width: '60px',
                                        height: '60px',
                                        background: '#25D366',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 9999,
                                        fontSize: '32px',
                                        textDecoration: 'none'
                          }}
                          title="Chat with us on WhatsApp"
                        >
                        💬
              </a>a>
    </div>div>
    </>
      }h
      }</a>
ld trigger: Sat Jul  4 22:13:07 EDT 2026
