import { useState, useEffect } from 'react'
import { FiTrendingUp, FiUsers, FiMail, FiActivity } from 'react-icons/fi'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import { analyticsService } from '../services/analyticsService'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null)
  const [trends, setTrends] = useState(null)
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [days])

  const fetchData = async () => {
    try {
      const [statsRes, trendsRes] = await Promise.all([
        analyticsService.getUserStats(),
        analyticsService.getTrends(days)
      ])
      setStats(statsRes.data.stats)
      setTrends(trendsRes.data.trends)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const lineChartData = {
    labels: trends?.map(t => new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) || [],
    datasets: [
      {
        label: 'Profiles Analyzed',
        data: trends?.map(t => t.profiles) || [],
        borderColor: '#0A66C2',
        backgroundColor: 'rgba(10, 102, 194, 0.1)',
        tension: 0.4
      },
      {
        label: 'Emails Generated',
        data: trends?.map(t => t.emails) || [],
        borderColor: '#00A0DC',
        backgroundColor: 'rgba(0, 160, 220, 0.1)',
        tension: 0.4
      }
    ]
  }

  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Activity',
        data: [12, 19, 15, 25],
        backgroundColor: '#0A66C2'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your activity and performance
                </p>
              </div>
              
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Profiles Analyzed
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.profilesAnalyzed || 0}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FiMail className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Emails Generated
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.emailsGenerated || 0}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Avg Match Score
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.avgMatchingScore || 0}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <FiActivity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Most Used Type
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {stats?.mostUsedEmailType || 'N/A'}
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Activity Trends
                </h3>
                <div className="h-80">
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Activity
                </h3>
                <div className="h-80">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Performance Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak Activity Day</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Monday</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Best Match Score</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">92/100</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Rate</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">78%</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
