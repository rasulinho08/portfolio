import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Phone, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Services", href: "#services" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "#services" },
        { name: "Frontend Design", href: "#services" },
        { name: "Backend Development", href: "#services" },
        { name: "Database Design", href: "#services" },
        { name: "API Development", href: "#services" }
      ]
    },
    {
      title: "Technologies",
      links: [
        { name: "React & JavaScript", href: "#skills" },
        { name: "Python & Flask", href: "#skills" },
        { name: "Node.js", href: "#skills" },
        { name: "PostgreSQL & MySQL", href: "#skills" },
        { name: "Git & GitHub", href: "#skills" }
      ]
    }
  ]

  return (
    <footer className="bg-slate-900/80 border-t border-orange-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.h3 
              className="text-2xl font-bold text-orange-400 glow-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Rasul Mamishov
            </motion.h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Passionate Software Engineer crafting modern web applications with cutting-edge technologies. 
              Let's build something amazing together.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 text-orange-400 mr-3" />
                <a href="mailto:mamishovrasul028@gmail.com" className="hover:text-orange-400 transition-colors">
                  mamishovrasul028@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 text-orange-400 mr-3" />
                <span>Available Worldwide</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <motion.a
                href="https://github.com/rasulinho08"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 rounded-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/rasul-mamishov-6b9484336/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 rounded-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:mamishovrasul028@gmail.com"
                className="p-3 bg-slate-800/50 rounded-full text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Rasul Mamishov. All rights reserved. Built with React & Tailwind CSS.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Terms of Service
            </a>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="p-2 bg-orange-500/20 rounded-full text-orange-400 hover:bg-orange-500/30 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 opacity-50"></div>
      </div>
    </footer>
  )
}

export default Footer