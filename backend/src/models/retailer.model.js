import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const RetailerSchema = mongoose.Schema({
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
        required: true,
        min:18
    },
    contact: {
        type: String,
        match: [/^\+?[0-9]{10,15}$/, "Invalid contact number"],
        required: true,
        unique: true
    },
    shopname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    shoplocation: {
        type: String,
        required:true
    },
    goodpurchase:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true 
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required:[true,"passord is required"]
    },
    conversation:{
        type:[String]
     },
    refreshToken: {
        type: String
    }

},{timestamps:true})

RetailerSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,8)
    next();
})

RetailerSchema.methods.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

RetailerSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        //payload
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        email: this.email
    },//generate token
        process.env.access_token_retailer,
        {
            expiresIn: process.env.expiry_access_retailer
        })
}
RetailerSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.refresh_token_retailer,
        {
            expiresIn: process.env.expiry_refresh_retailer
        })
}
const retailer = mongoose.model("retailer", RetailerSchema)
export { retailer }