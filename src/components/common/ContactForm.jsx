import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      console.log('📧 Submitting contact form:', formData)
      
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      console.log('📧 Contact form response:', result)

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' }) // Reset form
        console.log('✅ Contact message sent successfully')
      } else {
        setSubmitStatus('error')
        console.error('❌ Failed to send message:', result.error)
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center space-x-2"
        >
          <CheckCircle className="h-5 w-5 text-green-400" />
          <span className="text-green-300">Message sent successfully! I'll get back to you soon.</span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-2"
        >
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-red-300">Failed to send message. Please try again or email me directly.</span>
        </motion.div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-gray-300 text-sm font-bold mb-2">
          Name *
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-gray-300 text-sm font-bold mb-2">
          Email *
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition-all duration-300"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-gray-300 text-sm font-bold mb-2">
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="What's this about?"
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-all duration-300"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-gray-300 text-sm font-bold mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          placeholder="Tell me about your project or just say hi!"
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition-all duration-300 resize-none"
          required
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 glow-button flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  )
}

export default ContactForm