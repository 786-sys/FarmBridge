import express from "express"
import { FarmerRegister } from "../controllers/farmer.controller.js"
import { FarmerLogin } from "../controllers/farmer.controller.js"
import { FarmerLogout ,FarmerConversation} from "../controllers/farmer.controller.js"
import { VerifyJwtFarmer } from "../middleware/auth.Middleware.js"

import { farmer } from "../models/farmer.model.js"

const farmerrouter=express.Router()
farmerrouter.route('/signup').post(FarmerRegister)
farmerrouter.route('/login').post(FarmerLogin)
farmerrouter.route('/logout').post(VerifyJwtFarmer,FarmerLogout)
farmerrouter.route('/conversation').post(VerifyJwtFarmer,FarmerConversation)

export default farmerrouter