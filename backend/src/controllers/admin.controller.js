const { getOverview } = require('../services/marketplace.Service')

const getPlatformOverview = (_req, res) => {
  res.status(200).json({ success: true, data: getOverview() })
}

module.exports = {
  getPlatformOverview,
}
