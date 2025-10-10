import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useForm, ValidationError } from '@formspree/react'

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xrbyyadz")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Reset form after successful submission
  React.useEffect(() => {
    if (state.succeeded) {
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    }
  }, [state.succeeded])

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "mamishovrasul028@gmail.com",
      link: "mailto:mamishovrasul028@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+994 (055) 556-10-07",
      link: "tel:+994055556100"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Baku, Azerbaijan",
      link: "#"
    }
  ]

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: "GitHub",
      url: "https://github.com/rasulinho08",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/rasul-mamishov",
      color: "hover:text-blue-400"
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      name: "Instagram",
      url: "https://www.instagram.com/codewith.rasul?igsh=MmhiY3BhcXBrcjFw",
      color: "hover:text-pink-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Floating Tech Icons Background */}
      {[
        { icon: '📧', name: 'Email' },
        { icon: '💬', name: 'Chat' },
        { icon: '🤝', name: 'Connect' },
        { icon: '💼', name: 'Work' },
        { icon: '🚀', name: 'Projects' }
      ].map((tech, i) => (
        <motion.div
          key={i}
          className="fixed select-none pointer-events-none z-0 opacity-10"
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 3) * 25}%`
          }}
          animate={{
            x: [0, 100 * Math.cos(i), -80 * Math.sin(i), 0],
            y: [0, -60 * Math.sin(i), 80 * Math.cos(i), 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        >
          <div className="text-3xl md:text-5xl text-orange-400">{tech.icon}</div>
        </motion.div>
      ))}

      <div className="relative z-10">
        {/* Header with Back Button */}
        <motion.header
          className="p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            className="text-orange-400 hover:text-yellow-400 hover:bg-orange-500/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </motion.header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                Let's Work Together
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to build something amazing? I'm always excited to discuss new projects, 
                creative ideas, or opportunities to be part of your visions.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20">
                  <h2 className="text-3xl font-bold text-orange-400 mb-6">Send a Message</h2>
                  
                  {state.succeeded ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                      <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon!</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                            placeholder="john@example.com"
                            required
                          />
                          <ValidationError 
                            prefix="Email" 
                            field="email"
                            errors={state.errors}
                            className="text-red-400 text-sm mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                          placeholder="Project Discussion"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white resize-none"
                          placeholder="Tell me about your project..."
                          required
                        />
                        <ValidationError 
                          prefix="Message" 
                          field="message"
                          errors={state.errors}
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={state.submitting}
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold py-3 text-lg disabled:opacity-50"
                        >
                          {state.submitting ? (
                            <div className="flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                              Sending...
                            </div>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Contact Info Cards */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-6">Get In Touch</h2>
                  
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="block bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-400">{info.title}</h3>
                          <p className="text-gray-300">{info.value}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20">
                  <h3 className="text-2xl font-bold text-orange-400 mb-6">Follow Me</h3>
                  <div className="flex space-x-6">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:scale-110`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <p className="text-sm text-gray-300">
                      <strong className="text-orange-400">Quick Response:</strong> I typically respond to messages within 24 hours. 
                      For urgent matters, feel free to reach out on multiple platforms!
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/20">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Current Availability</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>🟢 <strong className="text-green-400">Available</strong> for new projects</p>
                    <p>⏰ <strong className="text-yellow-400">Response Time:</strong> Within 24 hours</p>
                    <p>🎯 <strong className="text-orange-400">Focus:</strong> Full-stack web development</p>
                    <p>💡 <strong className="text-blue-400">Interests:</strong> Innovative projects, startups, learning opportunities</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage