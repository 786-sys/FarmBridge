const { askAdvisoryQuestion } = require('../services/chatbot.Service')

const ask = (req, res, next) => {
  try {
    const { question } = req.body
    const data = askAdvisoryQuestion(question)
    res.status(200).json({ success: true, data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  ask,
}
