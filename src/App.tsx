import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Ceramic from './pages/Ceramic'
import Memberships from './pages/Memberships'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'
import HandCarWashHollywood from './pages/HandCarWashHollywood'
import CarDetailingHollywood from './pages/CarDetailingHollywood'
import CeramicCoatingHollywood from './pages/CeramicCoatingHollywood'
import CarWashHallandaleBeach from './pages/CarWashHallandaleBeach'
import CarWashDaniaBeach from './pages/CarWashDaniaBeach'
import CarWashPembrokePines from './pages/CarWashPembrokePines'
import CarWashAventura from './pages/CarWashAventura'

export default function App() {
  return (
    <div className="min-h-screen bg-frothy-foam">
      <Navbar />
      <main>
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
          <Route path="/ceramic-coating-hollywood-fl" element={<CeramicCoatingHollywood />} />
          <Route path="/car-wash-hallandale-beach-fl" element={<CarWashHallandaleBeach />} />
          <Route path="/car-wash-dania-beach-fl" element={<CarWashDaniaBeach />} />
          <Route path="/car-wash-pembroke-pines-fl" element={<CarWashPembrokePines />} />
          <Route path="/car-wash-aventura-fl" element={<CarWashAventura />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}
