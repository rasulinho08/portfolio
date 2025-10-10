// Testimonials Data
// To add a new testimonial, simply add a new object to the testimonials array
// Make sure to include all required fields: name, role, content, rating, date, verified

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    company: "TechCorp Solutions",
    content: "Rasul delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made the entire project smooth and successful. The final product was delivered on time and within budget.",
    rating: 5,
    date: "2024-09-15",
    verified: true,
    avatar: null, // Will use initials if no avatar provided
    projectType: "Full-Stack Web Application"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnovateLab",
    content: "Working with Rasul was a game-changer for our startup. He transformed our ideas into a beautiful, functional platform that our users love. His understanding of both technical and business requirements is impressive.",
    rating: 5,
    date: "2024-08-22",
    verified: true,
    avatar: null,
    projectType: "E-commerce Platform"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Digital Marketing Pro",
    content: "The website Rasul built for us significantly improved our online presence. The performance and user experience are outstanding. Our conversion rates increased by 40% after the launch!",
    rating: 5,
    date: "2024-07-10",
    verified: true,
    avatar: null,
    projectType: "Marketing Website"
  },
  {
    id: 4,
    name: "David Kumar",
    role: "CTO",
    company: "FinTech Solutions",
    content: "Rasul's expertise in database design and backend development helped us build a secure, scalable financial platform. His code quality and documentation standards are exceptional.",
    rating: 5,
    date: "2024-06-18",
    verified: true,
    avatar: null,
    projectType: "FinTech Platform"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Product Owner",
    company: "HealthTech Inc",
    content: "Amazing work on our healthcare dashboard. Rasul understood our complex requirements and delivered a solution that our medical professionals find intuitive and efficient to use.",
    rating: 5,
    date: "2024-05-30",
    verified: true,
    avatar: null,
    projectType: "Healthcare Dashboard"
  }
]

// Add new testimonial function (for future admin interface)
export const addTestimonial = (testimonialData) => {
  const newTestimonial = {
    id: testimonials.length + 1,
    ...testimonialData,
    date: new Date().toISOString().split('T')[0],
    verified: false // New testimonials start as unverified
  }
  testimonials.push(newTestimonial)
  return newTestimonial
}

// Get verified testimonials only
export const getVerifiedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.verified)
}

// Get testimonials by rating
export const getTestimonialsByRating = (minRating = 4) => {
  return testimonials.filter(testimonial => testimonial.rating >= minRating)
}

// Update testimonial verification status
export const updateTestimonialVerification = (id, verified) => {
  const testimonial = testimonials.find(t => t.id === id)
  if (testimonial) {
    testimonial.verified = verified
    return testimonial
  }
  return null
}