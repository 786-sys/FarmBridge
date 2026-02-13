const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const API_PREFIX = '/api/v1'

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload.message || 'Request failed')
  }
  return payload
}

export const api = {
  getHealth: () => request('/health'),
  login: (role) =>
    request(`${API_PREFIX}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ role }),
    }),
  getListings: () => request(`${API_PREFIX}/marketplace/listings`),
  getFarmerSnapshot: () => request(`${API_PREFIX}/farmer/snapshot`),
  getRetailerSnapshot: () => request(`${API_PREFIX}/retailer/snapshot`),
  getAdminOverview: () => request(`${API_PREFIX}/admin/overview`),
  askChatbot: (question) =>
    request(`${API_PREFIX}/chatbot/ask`, {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),
}

export { API_BASE_URL }
