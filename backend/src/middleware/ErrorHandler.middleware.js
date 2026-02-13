const logger = require('../utils/logger')

const notFoundHandler = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
  error.status = 404
  next(error)
}

const errorHandler = (error, req, res, _next) => {
  const status = error.status || 500
  logger.error('Request failed', {
    path: req.originalUrl,
    method: req.method,
    status,
    error: error.message,
  })

  res.status(status).json({
    success: false,
    message: error.message || 'Internal server error',
  })
}

module.exports = {
  errorHandler,
  notFoundHandler,
}
