import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Code, Trophy, BookOpen, Zap } from 'lucide-react'
import { useScrollAnimation } from '../InteractiveElements'

const Journey = () => {
  const [journeyRef, journeyInView] = useScrollAnimation()
  const [activeYear, setActiveYear] = useState(2024)

  // Rasul's real coding journey
  const journeyData = {
    2023: {
      title: "Started Coding Journey",
      items: [
        { icon: <Code />, title: "Star Collegues (6 months)", desc: "Started with HTML/CSS at age 13" },
        { icon: <BookOpen />, title: "First Foundations", desc: "Discovered love for building creative websites" }
      ]
    },
    2024: {
      title: "Advanced Learning",
      items: [
        { icon: <Trophy />, title: "Holberton School", desc: "Foundation of Computer Science program" },
        { icon: <Zap />, title: "5 Websites & React", desc: "Built projects and mastered React development" }
      ]
    },
    2025: {
      title: "Full-Stack Mastery",
      items: [
        { icon: <Trophy />, title: "Foundation Completed", desc: "Finished Foundation program in August 2025" },
        { icon: <Code />, title: "Full-Stack Started", desc: "Started Full-Stack Development in October 2025" }
      ]
    }
  }

  const years = Object.keys(journeyData)

  return (
    <section id="journey" className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
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
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 glow-text"
          ref={journeyRef}
          initial={{ opacity: 0, y: 50 }}
          animate={journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          My Coding Journey
        </motion.h2>

        {/* Timeline Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={journeyInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex space-x-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-orange-500/30">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setActiveYear(parseInt(year))}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeYear === parseInt(year)
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold'
                    : 'text-yellow-400 hover:text-orange-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Journey Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            className="text-center mb-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-12">
              {journeyData[activeYear].title}
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {journeyData[activeYear].items.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20 hover:border-yellow-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(255, 165, 0, 0.2)"
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-4 mx-auto text-black">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Age Highlight */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={journeyInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-2xl text-black">
            <h4 className="text-2xl font-bold">Age: 15</h4>
            <p className="text-lg">Coding since age 13</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Journey