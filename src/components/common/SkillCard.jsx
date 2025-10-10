import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { AnimatedSkillBar } from '../InteractiveElements'

const SkillCard = ({ title, icon: Icon, color, skills, fadeInUp }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

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

  const getColorClasses = () => {
    switch(color) {
      case 'cyan': return { border: 'border-cyan-500/20 hover:border-cyan-500/60', icon: 'text-cyan-400', glow: 'rgba(6, 182, 212, 0.3)' }
      case 'green': return { border: 'border-green-500/20 hover:border-green-500/60', icon: 'text-green-400', glow: 'rgba(16, 185, 129, 0.3)' }
      case 'purple': return { border: 'border-purple-500/20 hover:border-purple-500/60', icon: 'text-purple-400', glow: 'rgba(147, 51, 234, 0.3)' }
      default: return { border: 'border-orange-500/20 hover:border-orange-500/60', icon: 'text-orange-400', glow: 'rgba(255, 165, 0, 0.3)' }
    }
  }

  const colorClasses = getColorClasses()

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
      className={`bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border ${colorClasses.border} transition-all duration-300 card-glow relative overflow-hidden`}
      variants={fadeInUp}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 25px 50px ${colorClasses.glow}`
      }}
    >
      {/* Floating particles effect */}
      {isHovered && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 ${colorClasses.icon.replace('text-', 'bg-')} rounded-full`}
          initial={{ 
            x: Math.random() * 300,
            y: Math.random() * 300,
            opacity: 0 
          }}
          animate={{ 
            x: Math.random() * 300,
            y: Math.random() * 300,
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2 
          }}
        />
      ))}

      <div className="flex items-center space-x-4 mb-6" style={{ transform: "translateZ(20px)" }}>
        <motion.div
          animate={{
            rotate: isHovered ? [0, 360] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
        >
          <Icon className={`h-16 w-16 ${colorClasses.icon}`} />
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold text-white"
          animate={{
            textShadow: isHovered ? 
              [`0 0 10px ${colorClasses.glow}`, `0 0 20px ${colorClasses.glow}`, `0 0 10px ${colorClasses.glow}`] : 
              "0 0 0px rgba(0,0,0,0)"
          }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        >
          {title}
        </motion.h3>
      </div>
      
      <div className="space-y-4" style={{ transform: "translateZ(10px)" }}>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnimatedSkillBar 
              skill={skill.name} 
              percentage={skill.percentage} 
              color={color} 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillCard