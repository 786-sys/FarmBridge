import express from "express"
import { retailer } from "../models/retailer.model.js"
import { RetailerRegister,RetailerLogin ,RetailerLogout} from "../controllers/retailer.controller.js"
import { VerifyJwtRetailer } from "../middleware/auth.Middleware.js"
const retailrouter=express.Router()
retailrouter.route('/signup').post(RetailerRegister)
retailrouter.route('/login').post(RetailerLogin)
retailrouter.route('/logout').post(VerifyJwtRetailer,RetailerLogout)

export default retailrouter