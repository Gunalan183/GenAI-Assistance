import api from './api'

export const authService = {
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  async getProfile() {
    const response = await api.get('/auth/profile')
    return response.data.user
  },

  async updateProfile(data) {
    const response = await api.put('/auth/profile', data)
    return response.data
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
  }
}

export default authService
