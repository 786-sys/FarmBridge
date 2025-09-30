import express from "express";
import { getHello } from "../controllers/admin.controller.js";
const adminrouter=express.Router()
adminrouter.route('/getHello',getHello)
export default adminrouter