import api from './api'

export const emailService = {
  async generateEmail(data) {
    const response = await api.post('/email/generate', data)
    return response
  },

  async regenerateEmail(emailId, tone, customPrompt) {
    const response = await api.post(`/email/regenerate/${emailId}`, { tone, customPrompt })
    return response
  },

  async getEmailHistory(page = 1, limit = 20) {
    const response = await api.get(`/email/history?page=${page}&limit=${limit}`)
    return response
  },

  async getEmail(emailId) {
    const response = await api.get(`/email/${emailId}`)
    return response
  },

  async updateEmail(emailId, subject, body) {
    const response = await api.put(`/email/${emailId}`, { subject, body })
    return response
  },

  async deleteEmail(emailId) {
    const response = await api.delete(`/email/${emailId}`)
    return response
  },

  async exportEmailPDF(emailId) {
    const response = await api.get(`/email/export/${emailId}`, {
      responseType: 'blob'
    })
    return response
  },

  async getTemplates() {
    const response = await api.get('/email/templates')
    return response
  },

  async sendEmail(emailId, receiverEmail) {
    const response = await api.post(`/email/send/${emailId}`, { receiverEmail })
    return response
  }
}

export default emailService
