import { api } from './api'

export const AuthService = {
  async login(role) {
    const response = await api.login(role)
    return response.data
  },
}
