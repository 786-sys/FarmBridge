const { state, getMarketplaceStats } = require('../utils/dbHelper')

const getListings = () => state.listings

const getOverview = () => ({
  marketplace: getMarketplaceStats(),
  operations: {
    uptime: '99.97%',
    orderFulfillment: '97.2%',
    activeFarmers: 12480,
    activeRetailers: 1320,
  },
})

module.exports = {
  getListings,
  getOverview,
}
