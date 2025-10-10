import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Utensils, Armchair, Gamepad } from 'lucide-react'
import { useScrollAnimation } from '../InteractiveElements'
import ProjectCard from '../common/ProjectCard'

const Projects = () => {
  const [projectsRef, projectsInView] = useScrollAnimation()

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

  const projectsData = [
    {
      title: "Hungry Bowl Restaurant Project",
      desc: "A web application for a restaurant, likely including menu, ordering, and reservation features.",
      icon: Utensils,
      color: "cyan",
      tags: ["Web Development", "Restaurant", "Project"],
      github: "https://github.com/rasulinho08/Pato-restaurant.git",
      liveDemo: "#",
      image: "/assets/hungry-bowl.png"
    },
    {
      title: "Sport Seats Project",
      desc: "A project likely related to managing or visualizing sports seating arrangements.",
      icon: Armchair,
      color: "purple",
      tags: ["Web Development", "Sports", "Project"],
      github: "https://github.com/rasulinho08/Sport-Seats.git",
      liveDemo: "#",
      image: "/assets/sport-seats.png"
    },
    {
      title: "Foosball Game React",
      desc: "An interactive foosball game built using React.",
      icon: Gamepad,
      color: "green",
      tags: ["React", "Game Development", "Frontend"],
      github: "https://github.com/rasulinho08/foosballgame.git",
      liveDemo: "#",
      image: "/assets/foosball-game.png"
    }
  ]

  return (
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
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              fadeInUp={fadeInUp}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects