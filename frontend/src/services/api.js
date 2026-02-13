const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const api = {
  async getHealth() {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error('Backend health check failed')
    }
    return response.json()
  },
}

export { API_BASE_URL }
