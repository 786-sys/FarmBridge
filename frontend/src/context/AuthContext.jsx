import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

const seedUsers = {
  farmer: { role: 'farmer', name: 'Maya Farmer', email: 'farmer@farmbridge.app' },
  retailer: { role: 'retailer', name: 'Ravi Retailer', email: 'retailer@farmbridge.app' },
  admin: { role: 'admin', name: 'Asha Admin', email: 'admin@farmbridge.app' },
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loginAsRole = (role) => {
    const selected = seedUsers[role]
    if (!selected) {
      throw new Error('Unsupported role')
    }
    setUser(selected)
    return selected
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), loginAsRole, logout }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
