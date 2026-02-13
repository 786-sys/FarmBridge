const express = require('express')
const { getSnapshot } = require('../controllers/retailer.controller')

const router = express.Router()
router.get('/snapshot', getSnapshot)

module.exports = router
