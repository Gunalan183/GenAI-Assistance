import { Link } from 'react-router-dom'
import { FaLinkedin, FaEnvelope, FaRobot, FaChartLine } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      icon: FaLinkedin,
      title: 'AI Profile Analysis',
      description: 'Extract and analyze professional profiles with advanced NLP and AI technology.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaEnvelope,
      title: 'Smart Email Generation',
      description: 'Generate personalized emails for recruitment, networking, and business outreach.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaRobot,
      title: 'AI Chatbot Assistant',
      description: 'Get intelligent recommendations and communication strategies from our AI assistant.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: FaChartLine,
      title: 'Analytics Dashboard',
      description: 'Track performance metrics and gain insights into your outreach campaigns.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '50%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * 0.03}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            bottom: '10%',
            left: '20%',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * -0.025}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '2s'
          }}
        />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
        <div 
          className="transform transition-all duration-700"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            <span className="inline-block hover:scale-110 transition-transform duration-300">Transform</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300">Professional</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300">Profiles</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300">into</span>
            <span className="block mt-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Personalized Outreach
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AI-powered platform that analyzes professional profiles and generates highly personalized
            emails for recruitment, networking, and business development.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/register"
              className="group relative bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/login"
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* 3D Floating Cards Preview */}
        <div className="mt-20 relative" style={{ perspective: '1000px' }}>
          <div 
            className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105"
            style={{
              transform: `rotateX(${mousePosition.y * 0.01 - 5}deg) rotateY(${mousePosition.x * 0.01 - 5}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Profiles Analyzed</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Emails Generated</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Powerful Features
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Everything you need to supercharge your outreach
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  perspective: '1000px'
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon with 3D effect */}
                <div className={`relative bg-gradient-to-br ${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  <Icon className="text-white text-3xl" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500"></div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center relative z-10">
        <div 
          className="relative bg-gradient-to-br from-primary via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Animated Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
            Ready to Transform Your Outreach?
          </h2>
          <p className="text-xl text-blue-100 mb-8 relative z-10">
            Join thousands of professionals using AI to enhance their professional communications.
          </p>
          <Link
            to="/register"
            className="relative inline-block bg-white hover:bg-gray-100 text-primary px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 group"
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 CarrierGPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
