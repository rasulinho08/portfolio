import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Eye, EyeOff, Trash2, Star, CheckCircle, XCircle, Plus } from 'lucide-react'
import { testimonials, updateTestimonialVerification } from '../../data/testimonials'

// Simple admin component for managing testimonials
// You can access this by navigating to /admin (you'd need to set up routing)
// Or integrate it into your development workflow

const TestimonialsAdmin = ({ isVisible, onClose }) => {
  const [allTestimonials, setAllTestimonials] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'verified', 'unverified'

  useEffect(() => {
    setAllTestimonials([...testimonials])
  }, [])

  const handleVerificationToggle = (id, verified) => {
    const updatedTestimonial = updateTestimonialVerification(id, verified)
    if (updatedTestimonial) {
      setAllTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, verified } : t)
      )
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setAllTestimonials(prev => prev.filter(t => t.id !== id))
      // In a real app, you'd also delete from your backend
    }
  }

  const filteredTestimonials = allTestimonials.filter(testimonial => {
    if (filter === 'verified') return testimonial.verified
    if (filter === 'unverified') return !testimonial.verified
    return true
  })

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-800 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-orange-500/20"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-400">Testimonials Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-orange-500' : 'border-gray-600'}
          >
            All ({allTestimonials.length})
          </Button>
          <Button
            onClick={() => setFilter('verified')}
            variant={filter === 'verified' ? 'default' : 'outline'}
            className={filter === 'verified' ? 'bg-green-500' : 'border-gray-600'}
          >
            Verified ({allTestimonials.filter(t => t.verified).length})
          </Button>
          <Button
            onClick={() => setFilter('unverified')}
            variant={filter === 'unverified' ? 'default' : 'outline'}
            className={filter === 'unverified' ? 'bg-yellow-500' : 'border-gray-600'}
          >
            Unverified ({allTestimonials.filter(t => !t.verified).length})
          </Button>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-slate-700/50 rounded-lg p-6 border border-slate-600"
              layout
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <span>{testimonial.name}</span>
                    {testimonial.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="text-sm text-gray-400">({testimonial.rating}/5)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleVerificationToggle(testimonial.id, !testimonial.verified)}
                    size="sm"
                    className={testimonial.verified 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-green-500 hover:bg-green-600'
                    }
                  >
                    {testimonial.verified ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Show
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial.id)}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <blockquote className="text-gray-300 italic mb-4">
                "{testimonial.content}"
              </blockquote>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex space-x-4">
                  {testimonial.projectType && (
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded">
                      {testimonial.projectType}
                    </span>
                  )}
                  <span>Submitted: {testimonial.date}</span>
                </div>
                <span>ID: {testimonial.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No testimonials found for the selected filter.</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-slate-700/30 rounded-lg border border-orange-500/20">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Instructions:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• <strong>Show/Hide:</strong> Toggle testimonial visibility on the public site</li>
            <li>• <strong>Delete:</strong> Permanently remove testimonial (be careful!)</li>
            <li>• <strong>Verified Badge:</strong> Only verified testimonials show the verification badge</li>
            <li>• <strong>Public Display:</strong> Only verified testimonials appear on your portfolio</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TestimonialsAdmin