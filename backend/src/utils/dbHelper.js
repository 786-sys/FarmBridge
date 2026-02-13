const state = {
  users: [
    { id: 'u1', role: 'farmer', name: 'Maya Farmer', email: 'farmer@farmbridge.app' },
    { id: 'u2', role: 'retailer', name: 'Ravi Retailer', email: 'retailer@farmbridge.app' },
    { id: 'u3', role: 'admin', name: 'Asha Admin', email: 'admin@farmbridge.app' },
  ],
  listings: [
    { id: 1, crop: 'Tomato', quantityKg: 1200, pricePerKg: 34, location: 'Nashik', quality: 'A' },
    { id: 2, crop: 'Onion', quantityKg: 2800, pricePerKg: 26, location: 'Pune', quality: 'A+' },
    { id: 3, crop: 'Millet', quantityKg: 1600, pricePerKg: 48, location: 'Nagpur', quality: 'Premium' },
    { id: 4, crop: 'Potato', quantityKg: 3400, pricePerKg: 21, location: 'Indore', quality: 'A' },
  ],
}

const findUserByRole = (role) => state.users.find((user) => user.role === role)

const getMarketplaceStats = () => {
  const totalVolumeKg = state.listings.reduce((sum, item) => sum + item.quantityKg, 0)
  const averagePricePerKg =
    state.listings.reduce((sum, item) => sum + item.pricePerKg, 0) / state.listings.length

  return {
    activeListings: state.listings.length,
    totalVolumeKg,
    averagePricePerKg: Number(averagePricePerKg.toFixed(2)),
  }
}

module.exports = {
  state,
  findUserByRole,
  getMarketplaceStats,
}
