import api from './api'

export const profileService = {
  async analyzeProfile(data) {
    const response = await api.post('/profile/analyze', data)
    return response
  },

  async listProfiles() {
    const response = await api.get('/profile/list')
    return response
  },

  async getProfile(profileId) {
    const response = await api.get(`/profile/${profileId}`)
    return response
  },

  async deleteProfile(profileId) {
    const response = await api.delete(`/profile/${profileId}`)
    return response
  }
}

export default profileService
