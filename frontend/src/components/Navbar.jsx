import { useAuth } from '../hooks/useAuth'

export const Navbar = ({ onNavigate, currentTab }) => {
  const { isAuthenticated, user, logout } = useAuth()

  const items = [
    { key: 'home', label: 'Home' },
    { key: 'marketplace', label: 'Marketplace' },
    { key: 'contact', label: 'Contact' },
  ]

  return (
    <header className="nav-shell">
      <div className="brand" onClick={() => onNavigate('home')}>
        🌾 FarmBridge
      </div>
      <nav>
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`nav-item ${currentTab === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="user-pill">{user.name}</span>
            <button type="button" onClick={logout} className="secondary-btn">
              Logout
            </button>
          </>
        ) : (
          <button type="button" onClick={() => onNavigate('login')} className="primary-btn">
            Login
          </button>
        )}
      </div>
    </header>
  )
}
