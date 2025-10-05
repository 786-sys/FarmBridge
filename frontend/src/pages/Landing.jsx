import { Link } from "react-router-dom";
import "../App.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <h1>Grow. Connect. Prosper.</h1>
      <p>Premium marketplace bridging Farmers and Retailers with insight and speed.</p>
      <div className="landing-actions">
        <Link className="btn" to="/register/farmer">Register as Farmer</Link>
        <Link className="btn secondary" to="/register/retailer">Register as Retailer</Link>
      </div>
    </div>
  );
}


