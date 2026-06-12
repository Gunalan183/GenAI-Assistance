import api from './api'

export const analyticsService = {
  async getDashboard() {
    const response = await api.get('/analytics/dashboard')
    return response
  },

  async getUserStats() {
    const response = await api.get('/analytics/user-stats')
    return response
  },

  async getTrends(days = 30) {
    const response = await api.get(`/analytics/trends?days=${days}`)
    return response
  }
}

export default analyticsService
