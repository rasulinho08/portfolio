import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react'

const TestimonialForm = ({ onSubmit, isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    email: '',
    projectType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      console.log('⭐ Submitting testimonial:', formData)
      
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          position: formData.role,
          message: formData.content,
          rating: formData.rating
        })
      })

      const result = await response.json()
      console.log('⭐ Testimonial response:', result)

      if (response.ok) {
        setSubmitStatus('success')
        console.log('✅ Testimonial submitted successfully')
      } else {
        setSubmitStatus('error')
        console.error('❌ Failed to submit testimonial:', result.error)
      }
      
      // Call the parent component's submit handler
      if (onSubmit) {
        onSubmit(formData)
      }
      
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5,
          email: '',
          projectType: ''
        })
        setSubmitStatus(null)
        if (onClose) onClose()
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting testimonial:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          index < formData.rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400 hover:text-yellow-300'
        }`}
        onClick={() => handleRatingChange(index + 1)}
      />
    ))
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <motion.div
        className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-orange-500/20"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-orange-400">Share Your Experience</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {submitStatus === 'success' && (
          <motion.div
            className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="h-5 w-5 text-green-400" />
            <p className="text-green-300">Thank you! Your testimonial has been submitted and will be reviewed.</p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-300">Sorry, there was an error. Please try again later.</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="testimonial-email" className="block text-gray-300 text-sm font-bold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="testimonial-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-gray-300 text-sm font-bold mb-2">
                Your Role/Position *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., CEO, Developer, Manager"
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-gray-300 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company or organization"
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="projectType" className="block text-gray-300 text-sm font-bold mb-2">
              Project Type
            </label>
            <input
              type="text"
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              placeholder="e.g., Web App, E-commerce, API Development"
              className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-1 mb-2">
              {renderStars()}
            </div>
            <p className="text-sm text-gray-400">Click to rate your experience</p>
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-300 text-sm font-bold mb-2">
              Your Testimonial *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="5"
              placeholder="Share your experience working with Rasul. What did you like most? How did the project turn out?"
              className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white px-6 py-3 rounded-full glow-button"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Submit Testimonial</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default TestimonialForm