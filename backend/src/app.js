import express from "express"
import dotenv from "dotenv"
import cookie from "cookie-parser"
import {farmer} from "./models/farmer.model.js"
import { retailer } from "./models/retailer.model.js"
import { admin } from "./models/admin.model.js"
import farmerrouter from "./routes/farmer.Route.js"
import retailrouter from "./routes/retailer.Route.js"
import adminrouter from "./routes/admin.Route.js"
dotenv.config({
    path:'./.env'
})
const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookie())

app.use('/admin',adminrouter)
app.use('/farmer',farmerrouter)
app.use('/retailer',retailrouter)

export {app}