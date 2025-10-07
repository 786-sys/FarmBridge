import { api } from "./api";

export const AuthService = {
  // Farmer endpoints
  farmerSignup(payload) {
    return api.post("/farmer/signup", payload);
  },
  farmerLogin(payload) {
    return api.post("/farmer/login", payload);
  },

  // Retailer endpoints
  retailerSignup(payload) {
    return api.post("/retailer/signup", payload);
  },
  retailerLogin(payload) {
    return api.post("/retailer/login", payload);
  },
};

export default AuthService;


