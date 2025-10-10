import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, Coffee, Code, Star, Gamepad2, 
  Music, Book, Zap, Trophy, Clock 
} from 'lucide-react'
import { useScrollAnimation } from '../InteractiveElements'

const FunFacts = () => {
  const [funFactsRef, funFactsInView] = useScrollAnimation()
  const [currentFact, setCurrentFact] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Rasul's real fun facts
  const funFacts = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Age & Passion",
      content: "15 years old and passionate about coding for 2 years since starting at !",
      color: "orange"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Tech Stack",
      content: "HTML, CSS, JavaScript, React, and currently mastering Node.js & databases",
      color: "yellow"
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Coding Fuel",
      content: "Powered by energy drinks and pizza during late-night coding sessions",
      color: "orange"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Dream Companies",
      content: "One day I want to work at Google, Apple, or Tesla and build revolutionary tech",
      color: "yellow"
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: "When Not Coding",
      content: "I love gaming, music, and gym in my free time",
      color: "orange"
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "My Philosophy",
      content: "Code to solve real problems - technology should make the world better",
      color: "yellow"
    }
  ]

  const stats = [
    { number: "15", label: "Years Old", icon: <Clock /> },
    { number: "2", label: "Years Coding", icon: <Code /> },
    { number: "5+", label: "Websites Built", icon: <Trophy /> },
    { number: "∞", label: "Dreams & Goals", icon: <Star /> }
  ]

  // Auto-rotate facts
  useEffect(() => {
    if (funFactsInView) {
      const interval = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentFact((prev) => (prev + 1) % funFacts.length)
          setIsAnimating(false)
        }, 250)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [funFactsInView, funFacts.length])

  return (
    <section id="funfacts" className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${
              i % 3 === 0 ? 'bg-orange-400' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-white'
            } rounded-full`}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          ref={funFactsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={funFactsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Get to Know Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Beyond the code - here's what makes me who I am as a young developer
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={funFactsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20 hover:border-yellow-500/40 transition-all duration-300 text-center"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(255, 165, 0, 0.2)"
              }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-black">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Rotating Fun Facts */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={funFactsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      funFacts[currentFact].color === 'orange'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                    } text-black`}
                    animate={{ rotate: isAnimating ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {funFacts[currentFact].icon}
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${
                    funFacts[currentFact].color === 'orange' ? 'text-orange-400' : 'text-yellow-400'
                  }`}>
                    {funFacts[currentFact].title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {funFacts[currentFact].content}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Fact Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {funFacts.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentFact(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFact 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Personal Showcase */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={funFactsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-6">
                My Coding Philosophy
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-orange-400 mt-1" />
                  <p className="text-gray-300">
                    "Code should solve real problems and make life easier"
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-yellow-400 mt-1" />
                  <p className="text-gray-300">
                    "Never stop learning - technology evolves every day"
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-orange-400 mt-1" />
                  <p className="text-gray-300">
                    "Passion drives me more than perfection"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
              <h4 className="text-xl font-bold text-yellow-400 mb-4">Quick Facts</h4>
              <div className="space-y-3 text-gray-300">
                <p>📍 Based in: <span className="text-orange-400">Baku, Azerbaijan</span></p>
                <p>🎓 Current: <span className="text-orange-400">Holberton School (Full-Stack Program - Oct 2025)</span></p>
                <p>💻 Setup: <span className="text-orange-400">Windows, VS Code</span></p>
                <p>🎯 Goal: <span className="text-orange-400">Full-stack developer at top tech companies!</span></p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={funFactsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 p-1 rounded-2xl">
            <div className="bg-black/90 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                Let's Connect!
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always excited to meet fellow developers, potential mentors, or anyone interested in cool projects!
              </p>
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Say Hello! 👋
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FunFacts