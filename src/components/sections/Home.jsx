import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown } from 'lucide-react'
import { TypingAnimation } from '../InteractiveElements'

const Home = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  const [isInHeroSection, setIsInHeroSection] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        // Check if hero section is still visible (at least 30% visible)
        const isVisible = rect.bottom > window.innerHeight * 0.3 && rect.top < window.innerHeight * 0.7
        setIsInHeroSection(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(255, 165, 0, 0.1), rgba(255, 255, 0, 0.1))",
            "linear-gradient(45deg, rgba(255, 255, 0, 0.1), rgba(255, 165, 0, 0.1))",
            "linear-gradient(45deg, rgba(255, 165, 0, 0.1), rgba(255, 255, 0, 0.1))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Tech Icons - Only visible in hero section */}
      <AnimatePresence>
        {isInHeroSection && [
          { icon: '⚛️', name: 'React' },
          { icon: '🌐', name: 'HTML' },
          { icon: '🎨', name: 'CSS' },
          { icon: '📱', name: 'JavaScript' },
          { icon: '⚡', name: 'Node.js' },
          { icon: '🐍', name: 'Python' },
          { icon: '🍃', name: 'MongoDB' },
          { icon: '🚀', name: 'Express' }
        ].map((tech, i) => (
          <motion.div
            key={i}
            className="fixed select-none pointer-events-none z-0"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [
                0, 
                200 * Math.cos(i), 
                -150 * Math.sin(i), 
                180 * Math.cos(i + 1),
                -100 * Math.sin(i + 2),
                0
              ],
              y: [
                0,
                -120 * Math.sin(i),
                160 * Math.cos(i),
                -90 * Math.sin(i + 1),
                140 * Math.cos(i + 2),
                0
              ],
              rotate: [0, 180, 360],
            }}
            exit={{ opacity: 0, scale: 0, y: -50 }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="flex flex-col items-center opacity-60"
              animate={{
                rotate: [0, -180, 180, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-4xl md:text-6xl mb-1 drop-shadow-lg">{tech.icon}</div>
              <div className="text-sm text-orange-400/60 font-mono font-semibold">{tech.name}</div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="text-center z-10 px-4"
        style={{ y }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 glow-text relative"
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 20px rgba(255, 165, 0, 0.5)"
          }}
        >
          <span className="inline-block">R</span>
          <span className="inline-block">a</span>
          <span className="inline-block">s</span>
          <span className="inline-block">u</span>
          <span className="inline-block">l</span>
          <span className="inline-block mx-4"></span>
          <span className="inline-block">M</span>
          <span className="inline-block">a</span>
          <span className="inline-block">m</span>
          <span className="inline-block">i</span>
          <span className="inline-block">s</span>
          <span className="inline-block">h</span>
          <span className="inline-block">o</span>
          <span className="inline-block">v</span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-4xl text-yellow-400 mb-8 font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Software Engineer
        </motion.h2>

        <motion.div
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <TypingAnimation
            text="I build interactive, responsive, and futuristic web applications"
            className="inline-block"
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black px-8 py-4 text-lg rounded-full glow-button"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              See My Work
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-8 w-8 text-yellow-400" />
      </motion.div>
    </section>
  )
}

export default Home