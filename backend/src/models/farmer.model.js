import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

import bcrypt from "bcrypt"
const FarmerSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "Dont say to prefer"],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        match: [/^\+?[0-9]{10,15}$/, "Invalid contact number"],
        required: true,
        unique: [true,"Enter different contact"]
    },
    soiltype: {
        type: String,
        required: true
    },
    cropgrown: {
        type: [String],
        required: true
      },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "passord is required"]
    },
    conversation:{
       type:[String]
    },
    refreshToken: {
        type: String
        
    }
}, { timestamps: true })



FarmerSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,7)
    next();
})

FarmerSchema.methods.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

FarmerSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        //payload
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        contact: this.contact
    },//generate token
        process.env.access_token_farmer,
        {
            expiresIn: process.env.expiry_access_farmer
        })
}
FarmerSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.refresh_token_farmer,
        {
            expiresIn: process.env.expiry_refresh_farmer
        })
}
const farmer = mongoose.model("farmer", FarmerSchema)
export { farmer }