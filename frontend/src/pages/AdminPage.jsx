import { useState, useEffect } from 'react'
import { FiUsers, FiActivity, FiBarChart2, FiTrendingUp } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import StatCard from '../components/admin/StatCard'
import UserTable from '../components/admin/UserTable'
import api from '../services/api'

export default function AdminPage() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, activityRes] = await Promise.all([
        api.get('/admin/system-stats'),
        api.get('/admin/users?limit=10'),
        api.get('/admin/recent-activity?limit=10')
      ])

      setStats(statsRes.data.stats)
      setUsers(usersRes.data.users)
      setRecentActivity(activityRes.data.activity)
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/user/${userId}`, {
        isActive: !currentStatus
      })
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      ))
      
      toast.success('User status updated')
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const statCards = [
    {
      name: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: FiActivity,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      name: 'Total Profiles',
      value: stats?.totalProfiles || 0,
      icon: FiBarChart2,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      name: 'Total Emails',
      value: stats?.totalEmails || 0,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      change: '+20%'
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage users and monitor system activity
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => (
                <StatCard
                  key={stat.name}
                  title={stat.name}
                  value={loading ? '...' : stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  change={stat.change}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Users Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Users
                </h2>
                <UserTable
                  users={users}
                  onToggleStatus={handleToggleUserStatus}
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  System Activity
                </h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b dark:border-gray-700 last:border-0">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'profile' 
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {activity.type === 'profile' ? <FiUsers className="w-4 h-4" /> : <FiActivity className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {recentActivity.length === 0 && (
                    <p className="text-center py-8 text-gray-500">No recent activity</p>
                  )}
                </div>
              </div>
            </div>

            {/* API Usage Stats */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                API Usage
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Today's Usage</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats?.apiUsage?.today || 0} <span className="text-lg text-gray-500">requests</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Month</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stats?.apiUsage?.thisMonth || 0} <span className="text-lg text-gray-500">requests</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
