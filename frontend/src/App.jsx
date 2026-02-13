import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Chatbox } from './components/Chatbox'
import { MarketPlaceCard } from './components/MarketPlaceCard'
import { Login } from './pages/Login'
import { FarmerDashboard } from './pages/FarmerDashboard'
import { RetailerDashboard } from './pages/RetailerDashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { ContactUs } from './pages/ContactUs'
import { api } from './services/api'
import { MarketPlaceService } from './services/MarketPlaceService'
import { useAuth } from './hooks/useAuth'

function App() {
  const [tab, setTab] = useState('home')
  const [health, setHealth] = useState({ status: 'checking' })
  const [listings, setListings] = useState([])
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    api
      .getHealth()
      .then((result) => setHealth({ status: result.status, time: result.timestamp }))
      .catch(() => setHealth({ status: 'offline' }))

    MarketPlaceService.getListings().then(setListings)
  }, [])

  const dashboard = useMemo(() => {
    if (!isAuthenticated) return null
    if (user.role === 'farmer') return <FarmerDashboard />
    if (user.role === 'retailer') return <RetailerDashboard />
    return <AdminDashboard />
  }, [isAuthenticated, user])

  const renderMain = () => {
    if (tab === 'login') return <Login onSuccess={() => setTab('home')} />
    if (tab === 'contact') return <ContactUs />

    return (
      <>
        <section className="hero card">
          <h1>FarmBridge Unified Agri Platform</h1>
          <p>
            Integrated marketplace, advisory AI, role-based workflows, and backend health telemetry
            in one operational cockpit.
          </p>
          <p className={`status ${health.status === 'ok' ? 'ok' : 'bad'}`}>
            Backend status: {health.status}
          </p>
        </section>

        {dashboard}

        {(tab === 'home' || tab === 'marketplace') && (
          <section>
            <h2>Live Marketplace</h2>
            <div className="grid">
              {listings.map((listing) => (
                <MarketPlaceCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )}

        <Chatbox />
      </>
    )
  }

  return (
    <div className="app-shell">
      <Navbar onNavigate={setTab} currentTab={tab} />
      <main>{renderMain()}</main>
      <Footer />
    </div>
  )
}

export default App
