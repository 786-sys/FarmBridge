const { getFarmerSnapshot } = require('../services/farmer.Service')

const getSnapshot = (_req, res) => {
  res.status(200).json({ success: true, data: getFarmerSnapshot() })
}

module.exports = {
  getSnapshot,
}
