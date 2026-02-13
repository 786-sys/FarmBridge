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
  const [adminOverview, setAdminOverview] = useState(null)
  const [farmerSnapshot, setFarmerSnapshot] = useState(null)
  const [retailerSnapshot, setRetailerSnapshot] = useState(null)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    api
      .getHealth()
      .then((result) => setHealth({ status: result.status, time: result.timestamp }))
      .catch(() => setHealth({ status: 'offline' }))

    MarketPlaceService.getListings().then(setListings).catch(() => setListings([]))
    api.getAdminOverview().then((res) => setAdminOverview(res.data)).catch(() => setAdminOverview(null))
    api.getFarmerSnapshot().then((res) => setFarmerSnapshot(res.data)).catch(() => setFarmerSnapshot(null))
    api
      .getRetailerSnapshot()
      .then((res) => setRetailerSnapshot(res.data))
      .catch(() => setRetailerSnapshot(null))
  }, [])

  const dashboard = useMemo(() => {
    if (!isAuthenticated) return null
    if (user.role === 'farmer') return <FarmerDashboard data={farmerSnapshot} />
    if (user.role === 'retailer') return <RetailerDashboard data={retailerSnapshot} />
    return <AdminDashboard data={adminOverview} />
  }, [adminOverview, farmerSnapshot, isAuthenticated, retailerSnapshot, user])

  const askAssistant = async (question) => {
    const response = await api.askChatbot(question)
    return response.data.answer
  }

  const renderMain = () => {
    if (tab === 'login') return <Login onSuccess={() => setTab('home')} />
    if (tab === 'contact') return <ContactUs />

    return (
      <>
        <section className="hero card">
          <h1>FarmBridge Unified Agri Platform</h1>
          <p>
            Enterprise-grade workflows for farmers, retailers, and administrators with integrated
            marketplace intelligence and advisory operations.
          </p>
          <p className={`status ${health.status === 'ok' ? 'ok' : 'bad'}`}>
            Backend status: {health.status}
          </p>
          {adminOverview && (
            <div className="kpi-row">
              <div className="kpi-card">
                <h4>Active Listings</h4>
                <p>{adminOverview.marketplace.activeListings}</p>
              </div>
              <div className="kpi-card">
                <h4>Total Volume</h4>
                <p>{adminOverview.marketplace.totalVolumeKg} kg</p>
              </div>
              <div className="kpi-card">
                <h4>Avg Price</h4>
                <p>₹{adminOverview.marketplace.averagePricePerKg}/kg</p>
              </div>
            </div>
          )}
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

        <Chatbox onAsk={askAssistant} />
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
