const express = require('express')
const authRoutes = require('./routes/auth.Route')
const farmerRoutes = require('./routes/farmer.Route')
const retailerRoutes = require('./routes/retailer.Route')
const adminRoutes = require('./routes/admin.Route')
const chatbotRoutes = require('./routes/chatbot.Route')
const { getListings } = require('./services/marketplace.Service')
const { errorHandler, notFoundHandler } = require('./middleware/ErrorHandler.middleware')
const logger = require('./utils/logger')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  logger.info('Incoming request', { method: req.method, path: req.originalUrl })
  return next()
})

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'farmbridge-backend',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/v1/marketplace/listings', (_req, res) => {
  res.status(200).json({ success: true, data: getListings() })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/farmer', farmerRoutes)
app.use('/api/v1/retailer', retailerRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/chatbot', chatbotRoutes)

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'FarmBridge backend API is running',
    version: 'v1',
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
