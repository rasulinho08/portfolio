import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, Database, Code2, Palette, Smartphone, 
  Server, Zap, Settings, ArrowRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useScrollAnimation } from '../InteractiveElements'

const Services = () => {
  const [servicesRef, servicesInView] = useScrollAnimation()
  const [hoveredService, setHoveredService] = useState(null)

  // Placeholder services - you'll provide the real info
  const services = [
    {
      id: 1,
      icon: <Globe className="h-8 w-8" />,
      title: "Website Development",
      description: "Modern, responsive websites built with React",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Modern UI"],
      color: "orange"
    },
    {
      id: 2,
      icon: <Code2 className="h-8 w-8" />,
      title: "Portfolio Sites",
      description: "Custom portfolio websites for professionals",
      features: ["Personal Branding", "Interactive Design", "Mobile Friendly", "Fast Performance"],
      color: "yellow"
    },
    {
      id: 3,
      icon: <Database className="h-8 w-8" />,
      title: "Full-Stack Solutions",
      description: "Complete web applications with backend",
      features: ["Database Design", "API Development", "User Authentication", "Admin Panels"],
      color: "orange"
    },
    {
      id: 4,
      icon: <Smartphone className="h-8 w-8" />,
      title: "Small Business Sites",
      description: "Professional websites for small businesses",
      features: ["Business Cards", "Contact Forms", "Service Pages", "Gallery"],
      color: "yellow"
    },
    {
      id: 5,
      icon: <Server className="h-8 w-8" />,
      title: "API Development",
      description: "RESTful APIs and backend services",
      features: ["REST APIs", "Database Integration", "Authentication", "Documentation"],
      color: "orange"
    },
    {
      id: 6,
      icon: <Settings className="h-8 w-8" />,
      title: "Learning Systems",
      description: "Educational platforms and tools",
      features: ["User Progress", "Interactive Content", "Assessment Tools", "Admin Dashboard"],
      color: "yellow"
    }
  ]

  return (
    <section id="services" className="py-20 px-4 relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-16 h-16 ${
              i % 2 === 0 ? 'bg-orange-500' : 'bg-yellow-500'
            } ${i % 3 === 0 ? 'rounded-full' : 'rotate-45'}`}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          ref={servicesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            What I Can Build
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At 15, I'm already creating powerful solutions. Here's what I can deliver for you:
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
            >
              <motion.div
                className={`bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 h-full ${
                  service.color === 'orange' 
                    ? 'border-orange-500/20 hover:border-orange-500/60' 
                    : 'border-yellow-500/20 hover:border-yellow-500/60'
                }`}
                whileHover={{ 
                  scale: 1.02, 
                  y: -10,
                  boxShadow: service.color === 'orange' 
                    ? "0 25px 50px rgba(255, 165, 0, 0.3)"
                    : "0 25px 50px rgba(255, 255, 0, 0.3)"
                }}
              >
                {/* Service Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${
                    service.color === 'orange'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  } text-black`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>

                <h3 className={`text-2xl font-bold mb-4 ${
                  service.color === 'orange' ? 'text-orange-400' : 'text-yellow-400'
                }`}>
                  {service.title}
                </h3>

                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <AnimatePresence>
                  {hoveredService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 mb-6"
                    >
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <Zap className={`h-4 w-4 ${
                            service.color === 'orange' ? 'text-orange-400' : 'text-yellow-400'
                          }`} />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`w-full ${
                      service.color === 'orange'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                    } text-black font-semibold transition-all duration-300`}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Young, passionate, and ready to deliver. Let's build something amazing together!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black px-8 py-4 text-lg rounded-full font-bold"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Work Together!
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services