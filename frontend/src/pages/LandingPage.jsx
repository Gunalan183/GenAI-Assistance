import { Link } from 'react-router-dom'
import { FaLinkedin, FaEnvelope, FaRobot, FaChartLine } from 'react-icons/fa'
import Navbar from '../components/common/Navbar'

const LandingPage = () => {
  const features = [
    {
      icon: FaLinkedin,
      title: 'AI Profile Analysis',
      description: 'Extract and analyze professional profiles with advanced NLP and AI technology.'
    },
    {
      icon: FaEnvelope,
      title: 'Smart Email Generation',
      description: 'Generate personalized emails for recruitment, networking, and business outreach.'
    },
    {
      icon: FaRobot,
      title: 'AI Chatbot Assistant',
      description: 'Get intelligent recommendations and communication strategies from our AI assistant.'
    },
    {
      icon: FaChartLine,
      title: 'Analytics Dashboard',
      description: 'Track performance metrics and gain insights into your outreach campaigns.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Professional Profiles into
          <span className="text-primary block mt-2">Personalized Outreach</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          AI-powered platform that analyzes professional profiles and generates highly personalized
          emails for recruitment, networking, and business development.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-primary rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Outreach?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals using AI to enhance their professional communications.
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 CarrierGPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
