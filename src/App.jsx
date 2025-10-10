import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  CustomCursor,
  ScrollProgress,
  ParticleSystem,
  FloatingActionButton
} from './components/InteractiveElements'
import Navigation from './components/common/Navigation'
import Home from './components/sections/Home'
import About from './components/sections/About'
import Journey from './components/sections/Journey'
import Services from './components/sections/Services'
import FunFacts from './components/sections/FunFacts'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Testimonials from './components/sections/Testimonials'
import Footer from './components/common/Footer'
import ContactPage from './pages/ContactPage'
import './App.css'

// Main Portfolio Component
const PortfolioHome = () => (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-x-hidden">
    {/* Interactive Elements */}
    <CustomCursor />
    <ScrollProgress />
    <ParticleSystem />
    <FloatingActionButton />

    {/* Navigation */}
    <Navigation />

    {/* Main Sections */}
    <Home />
    <About />
    <Journey />
    <Skills />
    <Services />
    <Projects />
    <FunFacts />
    <Testimonials />

    {/* Footer */}
    <Footer />
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App


