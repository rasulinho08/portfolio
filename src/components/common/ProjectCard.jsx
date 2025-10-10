import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Github, ExternalLink } from 'lucide-react'

const ProjectCard = ({ project, index, fadeInUp }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d"
      }}
      className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-orange-500/20 hover:border-yellow-500/40 transition-all duration-300 overflow-hidden card-glow project-card relative"
      variants={fadeInUp}
      whileHover={{
        scale: 1.02,
        z: 50,
        boxShadow: "0 25px 50px rgba(255, 165, 0, 0.3)"
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div 
        className="h-48 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center relative overflow-hidden"
        style={{ transform: "translateZ(20px)" }}
      >
        {project.image ? (
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            style={{ 
              transform: isHovered ? "translateZ(30px) scale(1.1)" : "translateZ(0) scale(1)",
              transition: "all 0.3s ease-out"
            }}
          />
        ) : (
          <motion.div
            style={{ transform: "translateZ(40px)" }}
            animate={{ 
              rotateY: isHovered ? [0, 360] : 0,
              scale: isHovered ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.6 }}
          >
            <project.icon className="h-16 w-16 text-orange-400 z-10" />
          </motion.div>
        )}
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: isHovered ? ["100%", "-100%"] : "-100%" }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        />
      </div>
      <div className="p-6" style={{ transform: "translateZ(20px)" }}>
        <motion.h3 
          className="text-xl font-bold text-orange-400 mb-2"
          animate={{ 
            color: isHovered ? ["#fb923c", "#fbbf24", "#fb923c"] : "#fb923c"
          }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        >
          {project.title}
        </motion.h3>
        
        <p className="text-gray-300 mb-4">{project.desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(251, 146, 60, 0.3)",
                color: "#fbbf24"
              }}
              style={{ transform: "translateZ(10px)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="flex space-x-4" style={{ transform: "translateZ(30px)" }}>
          <motion.div whileHover={{ scale: 1.05, z: 10 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, z: 10 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black transition-all duration-300"
              onClick={() => window.open(project.liveDemo, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard