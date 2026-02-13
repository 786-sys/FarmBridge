import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthService } from '../services/AuthService'

export const Login = ({ onSuccess }) => {
  const [loadingRole, setLoadingRole] = useState('')
  const { loginAsRole } = useAuth()

  const login = async (role) => {
    setLoadingRole(role)
    await AuthService.login(role)
    loginAsRole(role)
    onSuccess(role)
    setLoadingRole('')
  }

  return (
    <section className="card login-card">
      <h2>Sign in to FarmBridge</h2>
      <p>Select role to preview full platform experience.</p>
      <div className="role-grid">
        {['farmer', 'retailer', 'admin'].map((role) => (
          <button key={role} type="button" onClick={() => login(role)} disabled={Boolean(loadingRole)}>
            {loadingRole === role ? 'Signing in...' : `Continue as ${role}`}
          </button>
        ))}
      </div>
    </section>
  )
}
