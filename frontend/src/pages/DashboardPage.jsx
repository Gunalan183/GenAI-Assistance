import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiMail, FiTrendingUp, FiMessageSquare, FiArrowRight } from 'react-icons/fi'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import { analyticsService } from '../services/analyticsService'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsService.getDashboard()
      setAnalytics(response.data.analytics)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      name: 'Profiles Analyzed',
      value: analytics?.totalProfiles || 0,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Emails Generated',
      value: analytics?.totalEmails || 0,
      icon: FiMail,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      name: 'Avg Match Score',
      value: analytics?.avgMatchingScore || 0,
      icon: FiTrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      name: 'Chat Sessions',
      value: '12',
      icon: FiMessageSquare,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ]

  const emailTypeData = {
    labels: Object.keys(analytics?.emailsByType || {}),
    datasets: [{
      data: Object.values(analytics?.emailsByType || {}),
      backgroundColor: [
        '#0A66C2',
        '#00A0DC',
        '#38B2AC',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6'
      ]
    }]
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Here's what's happening with your AI assistant.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    {stat.name}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Email Types Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Email Types Distribution
                </h3>
                <div className="h-64 flex items-center justify-center">
                  {analytics?.emailsByType && Object.keys(analytics.emailsByType).length > 0 ? (
                    <Doughnut data={emailTypeData} options={{ maintainAspectRatio: false }} />
                  ) : (
                    <p className="text-gray-500">No data yet</p>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {analytics?.recentActivity?.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`${
                        activity.type === 'profile' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      } p-2 rounded-lg`}>
                        {activity.type === 'profile' ? <FiUsers className="w-4 h-4" /> : <FiMail className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!analytics?.recentActivity || analytics.recentActivity.length === 0) && (
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/profile-analysis"
                  className="group p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <FiUsers className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Analyze Profile
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Analyze a new LinkedIn profile
                  </p>
                  <span className="text-sm text-primary group-hover:underline flex items-center">
                    Get started <FiArrowRight className="ml-1" />
                  </span>
                </Link>

                <Link
                  to="/email-generator"
                  className="group p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <FiMail className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Generate Email
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Create personalized emails
                  </p>
                  <span className="text-sm text-primary group-hover:underline flex items-center">
                    Create now <FiArrowRight className="ml-1" />
                  </span>
                </Link>

                <Link
                  to="/chatbot"
                  className="group p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <FiMessageSquare className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    AI Assistant
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Chat with AI assistant
                  </p>
                  <span className="text-sm text-primary group-hover:underline flex items-center">
                    Start chat <FiArrowRight className="ml-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
