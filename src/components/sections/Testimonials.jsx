import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Plus, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useScrollAnimation } from '../InteractiveElements'
import TestimonialForm from '../common/TestimonialForm'
const Testimonials = () => {
  const [testimonialsRef, testimonialsInView] = useScrollAnimation()
  const [showForm, setShowForm] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          // Show only the first 6 testimonials for display
          setTestimonials(data.slice(0, 6))
        } else {
          console.error('Failed to fetch testimonials')
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

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
        staggerChildren: 0.3
      }
    }
  }

  const handleTestimonialSubmit = (testimonialData) => {
    // In a real application, this would send data to your backend
    console.log('New testimonial submitted:', testimonialData)
    
    // You can integrate this with:
    // 1. Formspree for email notifications
    // 2. A database like Firebase/Supabase
    // 3. Your own backend API
    
    // For now, we'll just log it and show a success message
    // The form component handles the success state
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
  }

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-4 glow-text"
          ref={testimonialsRef}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          What Clients Say
        </motion.h2>

        <motion.p
          className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto"
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Don't just take my word for it - here's what my clients have to say about working with me.
        </motion.p>

        {/* Add Testimonial Button */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white px-6 py-3 rounded-full glow-button"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Share Your Experience
          </Button>
          <p className="text-sm text-gray-400 mt-2">
            Worked with me? I'd love to hear about your experience!
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            <p className="text-gray-400 mt-4">Loading testimonials...</p>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 card-glow relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Quote className="h-8 w-8 text-orange-400 mb-4 opacity-50" />
              
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.message || testimonial.content}"
              </p>

              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.position || testimonial.role}</p>
                    {testimonial.company && (
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    )}
                  </div>
                </div>
                
                {/* Verified badge - show for approved testimonials */}
                {(testimonial.status === 'approved' || testimonial.verified) && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-orange-400 fill-current" />
                    <span className="text-xs text-orange-400">Verified</span>
                  </div>
                )}
              </div>

              {/* Project type badge */}
              {testimonial.projectType && (
                <div className="mt-3">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">
                    {testimonial.projectType}
                  </span>
                </div>
              )}

              {/* Decorative gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {/* Show more testimonials message */}
        {testimonials.length >= 6 && (
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-gray-400">
              Showing recent testimonials. More client feedback available upon request.
            </p>
          </motion.div>
        )}

        {/* Testimonial Form Modal */}
        <TestimonialForm
          isVisible={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleTestimonialSubmit}
        />
      </div>
    </section>
  )
}

export default Testimonials