import { useState } from "react";
import { AuthService } from "../services/AuthService";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function RetailerRegister() {
  const [form, setForm] = useState({
    fullname: "",
    gender: "",
    age: "",
    contact: "",
    shopname: "",
    shoplocation: "",
    goodpurchase: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = { ...form };
      const res = await AuthService.retailerSignup(payload);
      setSuccess(res?.message || "Registered successfully");
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h2>Register as Retailer</h2>
      <form onSubmit={onSubmit}>
        <TextField label="Full name" name="fullname" placeholder="Jane Smith" value={form.fullname} onChange={onChange} required />
        <label className="field">
          <span className="field-label">Gender</span>
        <select name="gender" value={form.gender} onChange={onChange} required>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Dont say to prefer">Dont say to prefer</option>
        </select>
        </label>
        <TextField label="Age" name="age" type="number" placeholder="30" value={form.age} onChange={onChange} required />
        <TextField label="Contact" name="contact" placeholder="+919999999999" value={form.contact} onChange={onChange} required />
        <TextField label="Shop name" name="shopname" placeholder="AgriMart" value={form.shopname} onChange={onChange} required />
        <TextField label="Shop location" name="shoplocation" placeholder="Hyderabad" value={form.shoplocation} onChange={onChange} required />
        <TextField label="Goods to purchase" name="goodpurchase" placeholder="Seeds, Tools" value={form.goodpurchase} onChange={onChange} required />
        <TextField label="Email" name="email" type="email" placeholder="retail@example.com" value={form.email} onChange={onChange} required />
        <TextField label="Username" name="username" placeholder="retailer_pro" value={form.username} onChange={onChange} required />
        <TextField label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} required />
        <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Register"}</Button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}


