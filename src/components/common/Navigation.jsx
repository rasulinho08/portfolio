import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  Settings, 
  User,
  Shield,
  ChevronDown
} from 'lucide-react'
import AuthModal from '../auth/AuthModal'
import AdminPanel from '../admin/AdminPanel'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check for existing login on component mount
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setShowUserMenu(false)
    setShowAdminPanel(false)
  }

  const navItems = [
    { name: 'Home', link: '/#home', type: 'anchor' },
    { name: 'Skills', link: '/#skills', type: 'anchor' },
    { name: 'Contact', link: '/contact', type: 'route' }
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-40 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-b border-yellow-500/30 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <div className="text-xl font-bold text-yellow-400 glow-text">
                  Rasul Mamishov
                </div>
                <div className="text-xs text-orange-400">Software Engineer</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => {
                if (item.type === 'route') {
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.link}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group"
                      >
                        {item.name}
                        <motion.div
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"
                        />
                      </Link>
                    </motion.div>
                  )
                } else {
                  return (
                    <motion.a
                      key={item.name}
                      href={item.link}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"
                      />
                    </motion.a>
                  )
                }
              })}
            </div>

            {/* Right Side - Auth & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block">{user.username}</span>
                    {user.role === 'admin' && <Shield className="h-4 w-4" />}
                    <ChevronDown className="h-4 w-4" />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 bg-slate-800 border border-orange-500/20 rounded-xl shadow-xl py-2"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 py-2 border-b border-slate-600">
                          <p className="text-sm text-white font-medium">{user.username}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                            user.role === 'admin' 
                              ? 'bg-red-500/20 text-red-300' 
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {user.role}
                          </span>
                        </div>

                        {user.role === 'admin' && (
                          <button
                            onClick={() => {
                              setShowAdminPanel(true)
                              setShowUserMenu(false)
                            }}
                            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 hover:text-orange-400 transition-colors flex items-center space-x-2"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </button>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 hover:text-red-400 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white px-4 py-2 rounded-full glow-button hidden md:flex items-center space-x-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-700 text-gray-300 hover:text-orange-400 hover:bg-slate-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="lg:hidden bg-slate-800/95 backdrop-blur-xl border-t border-orange-500/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item, index) => {
                    if (item.type === 'route') {
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={item.link}
                            className="block px-4 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      )
                    } else {
                      return (
                        <motion.a
                          key={item.name}
                          href={item.link}
                          className="block px-4 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {item.name}
                        </motion.a>
                      )
                    }
                  })}
                  
                  {!user && (
                    <div className="px-4 pt-2">
                      <Button
                        onClick={() => {
                          setShowAuthModal(true)
                          setIsMenuOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white py-2 rounded-lg glow-button flex items-center justify-center space-x-2"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal
        isVisible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      {/* Admin Panel */}
      <AdminPanel
        isVisible={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        user={user}
      />
    </>
  )
}

export default Navigation