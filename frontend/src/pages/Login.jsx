import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthService } from '../services/AuthService'

export const Login = ({ onSuccess }) => {
  const [loadingRole, setLoadingRole] = useState('')
  const [error, setError] = useState('')
  const { loginAsRole } = useAuth()

  const login = async (role) => {
    setLoadingRole(role)
    setError('')
    try {
      const session = await AuthService.login(role)
      loginAsRole(session.user)
      onSuccess(role)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoadingRole('')
    }
  }

  return (
    <section className="card login-card">
      <h2>Sign in to FarmBridge</h2>
      <p>Select role to preview full platform experience.</p>
      {error && <p className="status bad">{error}</p>}
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
