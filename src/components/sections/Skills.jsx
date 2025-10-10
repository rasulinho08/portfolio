import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Server } from 'lucide-react'
import { useScrollAnimation } from '../InteractiveElements'
import SkillCard from '../common/SkillCard'

const Skills = () => {
  const [skillsRef, skillsInView] = useScrollAnimation()

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

  const skillsData = [
    {
      title: "Frontend",
      icon: Code,
      color: "cyan",
      skills: [
        { name: "React", percentage: 65 },
        { name: "JavaScript", percentage: 88 },
        { name: "CSS/Tailwind", percentage: 86 }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "green",
      skills: [
        { name: "Node.js", percentage: 87 },
        { name: "Python", percentage: 93 },
        { name: "Flask", percentage: 78 }
      ]
    },
    {
      title: "Database",
      icon: Database,
      color: "purple",
      skills: [
        { name: "SQLite", percentage: 80 },
        { name: "PostgreSQL", percentage: 85 },
        { name: "MySQL", percentage: 82 }
      ]
    },
    {
      title: "Tools",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-16 w-16 text-yellow-400">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      color: "yellow",
      skills: [
        { name: "Git & GitHub", percentage: 90 },
        { name: "Shell / Bash", percentage: 85 }
      ]
    }
  ]

  return (
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
          {skillsData.map((skillCategory, index) => (
            <SkillCard 
              key={index}
              title={skillCategory.title}
              icon={skillCategory.icon}
              color={skillCategory.color}
              skills={skillCategory.skills}
              fadeInUp={fadeInUp}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills