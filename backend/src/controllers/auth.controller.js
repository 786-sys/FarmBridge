const { loginByRole } = require('../services/auth.Service')

const login = (req, res, next) => {
  try {
    const { role } = req.body
    const session = loginByRole(role)
    res.status(200).json({ success: true, data: session })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
}
