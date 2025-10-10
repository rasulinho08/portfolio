import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'
import { useScrollAnimation } from '../InteractiveElements'

const About = () => {
  const [aboutRef, aboutInView] = useScrollAnimation()

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 glow-text"
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
        >
          <div className="space-y-6">
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 card-glow"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm Rasul Mamishov, a passionate 15-year-old web developer who started my coding journey in 2023 with Star Collegues. I began learning programming at age 13, starting with HTML and CSS, and quickly developed a love for building creative and functional websites.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 card-glow"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">What I Do</h3>
              <p className="text-gray-300 leading-relaxed">
                In 2024, I built 5 websites and learned React while completing my Foundation program. I finished the Foundation of Computer Science in August 2025 and started Full-Stack Development in October 2025. My philosophy is simple: "Code to solve real problems."
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/rasul.pdf" download>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full glow-button">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="space-y-8"
            variants={fadeInUp}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Education & Experience</h3>
              <div className="space-y-4">
                {[{
                  title: "Holberton School - Full-Stack",
                  period: "October 2025 - Present",
                  desc: "Full-Stack Development Program",
                  color: "orange"
                }, {
                  title: "Holberton School - Foundation",
                  period: "2024 - August 2025",
                  desc: "Foundation of Computer Science (Completed)",
                  color: "yellow"
                }, {
                  title: "Star Collegues",
                  period: "2023 - 2024 (6 months)",
                  desc: "Started coding journey with HTML & CSS",
                  color: "orange"
                }].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className={`w-3 h-3 ${item.color === 'orange' ? 'bg-orange-400' : 'bg-yellow-400'} rounded-full mt-2 glow-dot`}></div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.period}</p>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About