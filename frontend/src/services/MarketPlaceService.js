const inventory = [
  { id: 1, crop: 'Tomato', quantityKg: 1200, pricePerKg: 34, location: 'Nashik', quality: 'A' },
  { id: 2, crop: 'Onion', quantityKg: 2800, pricePerKg: 26, location: 'Pune', quality: 'A+' },
  { id: 3, crop: 'Millet', quantityKg: 1600, pricePerKg: 48, location: 'Nagpur', quality: 'Premium' },
  { id: 4, crop: 'Potato', quantityKg: 3400, pricePerKg: 21, location: 'Indore', quality: 'A' },
]

export const MarketPlaceService = {
  async getListings() {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return inventory
  },
}
