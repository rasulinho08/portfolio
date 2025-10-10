import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useScrollAnimation } from '../InteractiveElements'
import ContactForm from '../common/ContactForm'

const Contact = () => {
  const [contactRef, contactInView] = useScrollAnimation()

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
    <section id="contact" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 glow-text"
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-6">
              I'm always interested in new opportunities and exciting projects. Whether you have a question or
              just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="space-y-4">
              <a href="mailto:mamishovrasul028@gmail.com" className="flex items-center text-gray-300 hover:text-orange-400 transition-colors duration-300">
                <Mail className="mr-3 h-5 w-5" />
                mamishovrasul028@gmail.com
              </a>
              <a href="https://github.com/rasulinho08" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300">
                <Github className="mr-3 h-5 w-5" />
                github.com/rasulinho08
              </a>
              <a href="https://www.linkedin.com/in/rasul-mamishov-6b9484336/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Linkedin className="mr-3 h-5 w-5" />
                linkedin.com/in/rasul-mamishov-6b9484336/
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact