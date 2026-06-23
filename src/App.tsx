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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}
