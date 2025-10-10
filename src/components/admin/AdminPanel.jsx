import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { 
  Users, 
  MessageSquare, 
  Star, 
  ShoppingBag, 
  Eye, 
  EyeOff, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Calendar,
  TrendingUp,
  Mail,
  Phone
} from 'lucide-react'

const AdminPanel = ({ isVisible, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [shopInquiries, setShopInquiries] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isVisible && user?.role === 'admin') {
      loadDashboardData()
    }
  }, [isVisible, user])

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
  })

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // Load stats
      const statsRes = await fetch('http://localhost:5000/api/admin/stats', {
        headers: getAuthHeaders()
      })
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      // Load testimonials
      const testimonialsRes = await fetch('http://localhost:5000/api/admin/testimonials', {
        headers: getAuthHeaders()
      })
      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json()
        setTestimonials(testimonialsData)
      }

      // Load contact messages
      const contactRes = await fetch('http://localhost:5000/api/admin/messages', {
        headers: getAuthHeaders()
      })
      if (contactRes.ok) {
        const contactData = await contactRes.json()
        setContactMessages(contactData)
        console.log('📧 Loaded contact messages:', contactData)
      } else {
        console.error('Failed to load contact messages:', contactRes.status)
      }

      // Load users
      const usersRes = await fetch('http://localhost:5000/api/admin/users', {
        headers: getAuthHeaders()
      })
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        console.log('👥 Loaded users:', usersData)
      }
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTestimonialVerification = async (id, shouldApprove) => {
    try {
      const status = shouldApprove ? 'approved' : 'pending'
      const response = await fetch(`http://localhost:5000/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        setTestimonials(prev => 
          prev.map(t => t.id === id ? { ...t, status } : t)
        )
        loadDashboardData() // Refresh stats
        console.log('✅ Testimonial updated:', id, 'Status:', status)
      } else {
        console.error('Failed to update testimonial')
      }
    } catch (error) {
      console.error('Error updating testimonial:', error)
    }
  }

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })

      if (response.ok) {
        setTestimonials(prev => prev.filter(t => t.id !== id))
        loadDashboardData() // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  const updateContactStatus = async (id, status, replied) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contact-messages/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, replied })
      })

      if (response.ok) {
        setContactMessages(prev =>
          prev.map(m => m.id === id ? { ...m, status, replied } : m)
        )
        loadDashboardData() // Refresh stats
      }
    } catch (error) {
      console.error('Error updating contact message:', error)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isVisible || user?.role !== 'admin') return null

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'shop', label: 'Shop Inquiries', icon: ShoppingBag }
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-800 w-full h-full overflow-hidden flex"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 border-r border-orange-500/20 p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-orange-400">Admin Panel</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-800 rounded-lg">
            <p className="text-sm text-gray-400">Logged in as:</p>
            <p className="text-orange-400 font-medium">{user.email}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {isLoading && (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-700 p-6 rounded-xl border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Testimonials</p>
                      <p className="text-2xl font-bold text-white">{stats.totalTestimonials || 0}</p>
                      <p className="text-green-400 text-sm">{(stats.totalTestimonials || 0) - (stats.pendingTestimonials || 0)} approved</p>
                    </div>
                    <Star className="h-8 w-8 text-orange-400" />
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-xl border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Messages</p>
                      <p className="text-2xl font-bold text-white">{stats.contactMessages?.total || 0}</p>
                      <p className="text-blue-400 text-sm">{stats.contactMessages?.replied || 0} replied</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-xl border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Shop Inquiries</p>
                      <p className="text-2xl font-bold text-white">{stats.shopInquiries?.total || 0}</p>
                      <p className="text-purple-400 text-sm">{stats.shopInquiries?.completed || 0} completed</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-purple-400" />
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-xl border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-white">1</p>
                      <p className="text-green-400 text-sm">Admin active</p>
                    </div>
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-700 rounded-xl p-6 border border-orange-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {stats.recentActivity?.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-600/50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'testimonial' ? 'bg-orange-400' :
                        activity.type === 'contact' ? 'bg-blue-400' : 'bg-purple-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.name} submitted a {activity.type}</p>
                        <p className="text-gray-400 text-xs">{formatDate(activity.created_at)}</p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-400 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Manage Testimonials</h3>
              
              <div className="space-y-4">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-slate-700 rounded-xl p-6 border border-slate-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                          {testimonial.status === 'approved' ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                        <p className="text-gray-400">{testimonial.position} {testimonial.company && `at ${testimonial.company}`}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                          <span className="text-sm text-gray-400">({testimonial.rating}/5)</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => toggleTestimonialVerification(testimonial.id, testimonial.status !== 'approved')}
                          size="sm"
                          className={testimonial.status === 'approved' 
                            ? 'bg-yellow-500 hover:bg-yellow-600' 
                            : 'bg-green-500 hover:bg-green-600'
                          }
                        >
                          {testimonial.status === 'approved' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          onClick={() => deleteTestimonial(testimonial.id)}
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <blockquote className="text-gray-300 italic mb-4">
                      "{testimonial.message}"
                    </blockquote>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <div className="flex space-x-4">
                        {testimonial.project_type && (
                          <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded">
                            {testimonial.project_type}
                          </span>
                        )}
                        <span>{formatDate(testimonial.created_at)}</span>
                      </div>
                      <span>{testimonial.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Messages</h3>
              
              <div className="space-y-4">
                {contactMessages.map(message => (
                  <div key={message.id} className="bg-slate-700 rounded-xl p-6 border border-slate-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{message.name}</h4>
                        <p className="text-gray-400">{message.email}</p>
                        {message.subject && <p className="text-sm text-gray-300 mt-1">Subject: {message.subject}</p>}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          message.status === 'new' ? 'bg-blue-500/20 text-blue-300' :
                          message.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300' 
                        }`}>
                          {message.status}
                        </span>
                        
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => updateContactStatus(message.id, 'in-progress', message.replied)}
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600"
                          >
                            In Progress
                          </Button>
                          <Button
                            onClick={() => updateContactStatus(message.id, 'completed', 1)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Mark Replied
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-600/30 rounded-lg p-4 mb-4">
                      <p className="text-gray-300">{message.message}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{formatDate(message.created_at)}</span>
                      <div className="flex items-center space-x-4">
                        <a 
                          href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`}
                          className="flex items-center space-x-1 text-orange-400 hover:text-orange-300"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Reply</span>
                        </a>
                        {message.replied && (
                          <span className="text-green-400 text-xs">✓ Replied</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shop Inquiries Tab */}
          {activeTab === 'shop' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Shop Inquiries</h3>
              
              <div className="space-y-4">
                {shopInquiries.map(inquiry => (
                  <div key={inquiry.id} className="bg-slate-700 rounded-xl p-6 border border-slate-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{inquiry.name}</h4>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm mt-1">
                          <span>{inquiry.email}</span>
                          {inquiry.phone && (
                            <span className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{inquiry.phone}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'new' ? 'bg-blue-500/20 text-blue-300' :
                          inquiry.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {inquiry.status}
                        </span>
                        {inquiry.budget_range && (
                          <p className="text-sm text-gray-400 mt-1">Budget: {inquiry.budget_range}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Service Type:</p>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                          {inquiry.service_type}
                        </span>
                      </div>
                      {inquiry.timeline && (
                        <div>
                          <p className="text-sm font-medium text-gray-300">Timeline:</p>
                          <p className="text-sm text-gray-400">{inquiry.timeline}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-600/30 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-gray-300 mb-2">Project Description:</p>
                      <p className="text-gray-300">{inquiry.project_description}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{formatDate(inquiry.created_at)}</span>
                      <a 
                        href={`mailto:${inquiry.email}?subject=Re: Your ${inquiry.service_type} inquiry`}
                        className="flex items-center space-x-1 text-orange-400 hover:text-orange-300"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Contact Client</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminPanel