import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { farmer } from "../models/farmer.model.js"
import {retailer} from "../models/retailer.model.js"
import {admin} from "../models/admin.model.js"
dotenv.config({ path: './.env' })
const VerifyJwtFarmer = async (req,res,next) => {
    try {
        const token = req.cookies?.accesstoken_f || req.headers["Authorization"]?.replace("Bearer", "");
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: "Unauthorized User trying to access req" })
        }
        const decodedtoken = await jwt.verify(token, process.env.access_token_farmer);

        const finduser = await farmer.findById(decodedtoken?._id).select("-password -refreshToken")
        if (!finduser) {
            return res.status(402).json({ error: "Invalid Access token" })
        }
        req.farmer = finduser
        next()
    } catch (err) {
        return res.status(500).json({ message: error })

    }
}
const VerifyJwtRetailer = async (req,res,next) => {
    try {
        const token = req.cookies?.accesstoken_r || req.headers["Authorization"]?.replace("Bearer", "");
        if (!token) {
            return res.status(401).json({ error: "Unauthorized User trying to access req" })
        }
        const decodedtoken = await jwt.verify(token, process.env.access_token_retailer);

        const finduser = await retailer.findById(decodedtoken?._id).select("-password -refreshToken")
        if (!finduser) {
            return res.status(402).json({ error: "Invalid Access token" })
        }
        req.retailer = finduser
        next()
    } catch (err) {
        return res.status(500).json({ message: error })

    }
}
const VerifyJwtAdmin = async (req,res,next) => {
    try {
        const token = req.cookies?.accesstoken_a || req.headers["Authorization"]?.replace("Bearer", "");
        if (!token) {
            return res.status(401).json({ error: "Unauthorized User trying to access req" })
        }
        const decodedtoken = await jwt.verify(token, process.env.access_token_admin);

        const finduser = await admin.findById(decodedtoken?._id).select("-password -refreshToken")
        if (!finduser) {
            return res.status(402).json({ error: "Invalid Access token" })
        }
        req.admin = finduser
        next()
    } catch (err) {
        return res.status(500).json({ message: error })

    }
}
export {VerifyJwtFarmer,VerifyJwtRetailer,VerifyJwtAdmin}