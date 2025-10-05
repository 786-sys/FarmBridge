import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">FarmBridge</Link>
        <nav className="nav-links">
          <Link to="/register/farmer">Farmer</Link>
          <Link to="/register/retailer">Retailer</Link>
        </nav>
      </div>
    </header>
  )
}