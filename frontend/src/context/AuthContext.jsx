import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loginAsRole = (profile) => {
    setUser(profile)
    return profile
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), loginAsRole, logout }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
