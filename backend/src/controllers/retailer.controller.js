const { getRetailerSnapshot } = require('../services/retailer.Service')

const getSnapshot = (_req, res) => {
  res.status(200).json({ success: true, data: getRetailerSnapshot() })
}

module.exports = {
  getSnapshot,
}
