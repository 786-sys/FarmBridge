const express = require('express')
const { getPlatformOverview } = require('../controllers/admin.controller')

const router = express.Router()
router.get('/overview', getPlatformOverview)

module.exports = router
