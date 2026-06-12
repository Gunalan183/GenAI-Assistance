import api from './api'

export const chatService = {
  async sendMessage(data) {
    const response = await api.post('/chatbot/message', data)
    return response
  },

  async getHistory(sessionId) {
    const response = await api.get(`/chatbot/history/${sessionId}`)
    return response
  },

  async getSessions() {
    const response = await api.get('/chatbot/sessions')
    return response
  },

  async deleteSession(sessionId) {
    const response = await api.delete(`/chatbot/session/${sessionId}`)
    return response
  }
}

export default chatService
