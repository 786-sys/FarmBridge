const { findUserByRole } = require('../utils/dbHelper')

const loginByRole = (role) => {
  if (!role) {
    const error = new Error('Role is required')
    error.status = 400
    throw error
  }

  const user = findUserByRole(role)
  if (!user) {
    const error = new Error('Invalid role')
    error.status = 400
    throw error
  }

  return {
    token: `farmbridge-token-${role}`,
    user,
  }
}

module.exports = {
  loginByRole,
}
