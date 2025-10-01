import express from "express"
import { admin } from "../models/admin.model.js"
import { AdminRegister,AdminLogin,AdminLogout } from "../controllers/admin.controller.js"
import { VerifyJwtAdmin } from "../middleware/auth.Middleware.js"
const adminrouter=express.Router()
adminrouter.route('/signup').post(AdminRegister)
adminrouter.route('/login').post(AdminLogin)
adminrouter.route('/logout').post(VerifyJwtAdmin,AdminLogout)

export default adminrouter