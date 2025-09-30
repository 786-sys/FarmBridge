import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    username:{
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
    refreshToken:{
        type:String
    }
},{timestamps:true})
adminSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,20)
    next();
})

adminSchema.methods.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

adminSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        //payload
        _id: this._id,
        username: this.username,
        fullname: this.fullname
    },//generate token
        process.env.access_token_admin,
        {
            expiresIn: process.env.expiry_access_admin
        })
}
adminSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.refresh_token_admin,
        {
            expiresIn: process.env.expiry_refresh_admin
        })
}
const admin=mongoose.model("admin",adminSchema)
export {admin}