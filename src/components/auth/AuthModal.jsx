import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'

const AuthModal = ({ isVisible, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData

      console.log('🔐 Auth attempt:', endpoint, payload)

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log('📡 Auth response:', response.status, data)

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        console.log('✅ Login successful:', data.user.username)
        
        // Notify parent component
        if (onLogin) {
          onLogin(data.user)
        }
        
        // Close modal
        onClose()
        
        // Reset form
        setFormData({ username: '', email: '', password: '' })
        
        // Success notification
        const welcomeMsg = `Welcome ${data.user.username}! ${data.user.role === 'admin' ? '(Admin Access)' : ''}`
        setTimeout(() => alert(welcomeMsg), 100)
      } else {
        console.log('❌ Auth failed:', data.error)
        setError(data.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      setError('Cannot connect to server. Make sure backend is running on port 5000.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({ username: '', email: '', password: '' })
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-orange-500/20 shadow-2xl"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-orange-400">
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <motion.div
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
                required={!isLogin}
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="auth-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 pr-12 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-orange-500 focus:ring-orange-500 focus:outline-none transition-all duration-300 text-white"
                required
                minLength="6"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {!isLogin && (
              <p className="text-gray-400 text-xs mt-1">Minimum 6 characters</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white py-3 rounded-lg glow-button"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
              disabled={isLoading}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AuthModal