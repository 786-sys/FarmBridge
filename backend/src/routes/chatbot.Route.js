const express = require('express')
const { ask } = require('../controllers/chatbot.controller')

const router = express.Router()
router.post('/ask', ask)

module.exports = router
