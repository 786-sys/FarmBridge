import { api } from './api'

export const MarketPlaceService = {
  async getListings() {
    const response = await api.getListings()
    return response.data
  },
}
