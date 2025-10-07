import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import FarmerRegister from './pages/FarmerRegister'
import RetailerRegister from './pages/RetailerRegister'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register/farmer" element={<FarmerRegister />} />
        <Route path="/register/retailer" element={<RetailerRegister />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
