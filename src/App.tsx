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
const InteriorDetailing = lazy(() => import('./pages/InteriorDetailing'))
const CarWashPembrokePines = lazy(() => import('./pages/CarWashPembrokePines'))
const CarWashAventura = lazy(() => import('./pages/CarWashAventura'))

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
            <Route path="/hand-car-wash-hollywood-fl" element={<HandCarWashHollywood />} />
            <Route path="/car-detailing-hollywood-fl" element={<CarDetailingHollywood />} />
                        <Route path="/interior-detailing-hollywood-fl" element={<InteriorDetailing />} />
            <Route path="/ceramic-coating-hollywood-fl" element={<CeramicCoatingHollywood />} />
            <Route path="/car-wash-hallandale-beach-fl" element={<CarWashHallandaleBeach />} />
            <Route path="/car-wash-dania-beach-fl" element={<CarWashDaniaBeach />} />
            <Route path="/car-wash-pembroke-pines-fl" element={<CarWashPembrokePines />} />
            <Route path="/car-wash-aventura-fl" element={<CarWashAventura />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}
