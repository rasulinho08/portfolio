import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Github, Linkedin, Mail, ExternalLink, Download, Code, Database, Server, Smartphone, ChevronDown, Utensils, Armchair, Gamepad } from 'lucide-react'
import {
  CustomCursor,
  TypingAnimation,
  AnimatedCounter,
  ScrollProgress,
  ParticleSystem,
  AnimatedSkillBar,
  FloatingActionButton,
  useScrollAnimation
} from './components/InteractiveElements'
import './App.css'

function App() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

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

  const [aboutRef, aboutInView] = useScrollAnimation()
  const [projectsRef, projectsInView] = useScrollAnimation()
  const [skillsRef, skillsInView] = useScrollAnimation()
  const [contactRef, contactInView] = useScrollAnimation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-x-hidden">
      {/* Interactive Elements */}
      <CustomCursor />
      <ScrollProgress />
      <ParticleSystem />
      <FloatingActionButton />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold text-cyan-400 glow-text"
              whileHover={{ scale: 1.05 }}
            >
              Rasul Mamishov
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-cyan-400 transition-colors duration-300 relative"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(16, 185, 129, 0.1))",
              "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="text-center z-10 px-4"
          style={{ y }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 glow-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Rasul Mamishov
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-4xl text-cyan-400 mb-8 font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Software Engineer
          </motion.h2>

          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <TypingAnimation
              text="I build interactive, responsive, and futuristic web applications"
              className="inline-block"
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full glow-button"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                See My Work
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-cyan-400" />
        </motion.div>
      </section>

      {/* About Section */}
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
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 card-glow"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed">
                  I am a dedicated Software Engineer with a strong foundation in computer science. I am passionate about building robust and efficient software solutions that solve real-world problems.
                </p>
              </motion.div>

              <motion.div
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 card-glow"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">What I Do</h3>
                <p className="text-gray-300 leading-relaxed">
                  I specialize in developing scalable applications and have experience across various programming paradigms. My focus is on delivering high-quality code and contributing to impactful projects.
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
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Education & Experience</h3>
                <div className="space-y-4">
                  {[{
                    title: "Holberton School",
                    period: "2024 - 2025",
                    desc: "Foundation of Computer Science Certificate",
                    color: "cyan"
                  }].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -50 }}
                      animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className={`w-3 h-3 bg-${item.color}-400 rounded-full mt-2 glow-dot`}></div>
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 glow-text"
            ref={projectsRef}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Featured Projects
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            {[
              {
                title: "Hungry Bowl Restaurant Project",
                desc: "A web application for a restaurant, likely including menu, ordering, and reservation features.",
                icon: Utensils,
                color: "cyan",
                tags: ["Web Development", "Restaurant", "Project"],
                github: "https://github.com/rasulinho08/Pato-restaurant.git",
                liveDemo: "#",
                image: "/assets/hungry-bowl.png" // Placeholder image
              },
              {
                title: "Sport Seats Project",
                desc: "A project likely related to managing or visualizing sports seating arrangements.",
                icon: Armchair,
                color: "purple",
                tags: ["Web Development", "Sports", "Project"],
                github: "https://github.com/rasulinho08/Sport-Seats.git",
                liveDemo: "#",
                image: "/assets/sport-seats.png" // Placeholder image
              },
              {
                title: "Foosball Game React",
                desc: "An interactive foosball game built using React.",
                icon: Gamepad,
                color: "green",
                tags: ["React", "Game Development", "Frontend"],
                github: "https://github.com/rasulinho08/foosballgame.git",
                liveDemo: "#",
                image: "/assets/foosball-game.png" // Placeholder image
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden card-glow project-card"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`h-48 bg-gradient-to-br from-${project.color}-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  ) : (
                    <project.icon className={`h-16 w-16 text-${project.color}-400 z-10`} />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-${project.color}-400 mb-2`}>{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className={`px-3 py-1 bg-${project.color}-500/20 text-${project.color}-400 rounded-full text-sm`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" className={`border-${project.color}-400 text-${project.color}-400 hover:bg-${project.color}-400 hover:text-black`} onClick={() => window.open(project.github, '_blank')}>
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className={`bg-${project.color}-500 hover:bg-${project.color}-600`} onClick={() => window.open(project.liveDemo, '_blank')}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 glow-text"
            ref={skillsRef}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Skills & Technologies
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
          >
            {/* Frontend */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 card-glow"
              variants={fadeInUp}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Code className="h-16 w-16 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Frontend</h3>
              </div>
              <div className="space-y-4">
                <AnimatedSkillBar skill="React" percentage={65} color="cyan" />
                <AnimatedSkillBar skill="JavaScript" percentage={88} color="cyan" />
                <AnimatedSkillBar skill="CSS/Tailwind" percentage={86} color="cyan" />
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 card-glow"
              variants={fadeInUp}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Server className="h-16 w-16 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Backend</h3>
              </div>
              <div className="space-y-4">
                <AnimatedSkillBar skill="Node.js" percentage={87} color="green" />
                <AnimatedSkillBar skill="Python" percentage={93} color="green" />
                <AnimatedSkillBar skill="Flask" percentage={78} color="green" />
              </div>
            </motion.div>

            {/* Database */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 card-glow"
              variants={fadeInUp}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Database className="h-16 w-16 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Database</h3>
              </div>
              <div className="space-y-4">
                <AnimatedSkillBar skill="SQLite" percentage={80} color="purple" />
                <AnimatedSkillBar skill="PostgreSQL" percentage={85} color="purple" />
                <AnimatedSkillBar skill="MySQL" percentage={82} color="purple" />
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 card-glow"
              variants={fadeInUp}
            >
              <div className="flex items-center space-x-4 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap h-16 w-16 text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <h3 className="text-2xl font-bold text-white">Tools</h3>
              </div>
              <div className="space-y-4">
                <AnimatedSkillBar skill="Git & GitHub" percentage={90} color="yellow" />
                <AnimatedSkillBar skill="Shell / Bash" percentage={85} color="yellow" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Let's Connect</h3>
              <p className="text-gray-300 mb-6">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or
                just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <a href="mailto:mamishovrasul028@gmail.com" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  <Mail className="mr-3 h-5 w-5" />
                  mamishovrasul028@gmail.com
                </a>
                <a href="https://github.com/rasulinho08" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  <Github className="mr-3 h-5 w-5" />
                  github.com/rasulinho08
                </a>
                <a href="https://www.linkedin.com/in/rasul-mamishov-6b9484336/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300">
                  <Linkedin className="mr-3 h-5 w-5" />
                  linkedin.com/in/rasul-mamishov-6b9484336/
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your Name" className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                  <input type="email" id="email" name="email" placeholder="your.email@example.com" className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Your message..." className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-green-500 focus:ring-green-500 focus:outline-none transition-all duration-300"></textarea>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-full glow-button">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © 2025 Rasul Mamishov. Built with love and code.
      </footer>
    </div>
  )
}

export default App


