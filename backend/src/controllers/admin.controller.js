
import { admin } from "../models/admin.model.js"
import asynchandler from "../utils/asynhandler.js"
const generateRefreshandAccessToken = async (user) => {
    const User = await admin.findById(user?._id)
    if (!User) {
        return res.status(401).json({ message: "Unauthorized Farmer" })
    }
    const accesstoken_a = await User.generateAccessToken();
    const refreshtoken_a = await User.generateRefreshToken();
    User.refreshToken = refreshtoken_a
    await user.save({ validateBeforeSave: false })
    return { accesstoken_a, refreshtoken_a }
}
const AdminRegister = asynchandler(async (req, res) => {
    try{
        console.log(req.body.fullname+" "+req.body.username)
    const { fullname,username, password } = req.body

    if ([fullname,username, password].some((field) => field?.trim() === "")) {
        console.log("hello")
        throw new Error("All field are compulsory or required")
    }
    const ispresentadmin = await admin.findOne({ username: `${username}` })
    if (ispresentadmin) {
        return res.status(200).json({ message: "Already a admin exist with this Username" })
    }
    const newAdmin = await new admin({
        fullname,
        username,
        password
    })
    await newAdmin.save()
    const createAdmin = await admin.findById(newAdmin?._id).select("-password -refreshToekn")
    if (!createAdmin) {
        return res.status(102).json({ message: "new admin not created Yet please register again" })
    }
    return res.status(200).json({ message: "Successfully register", admin: createretailer })
    }
    catch(err){
        console.log(err)
    }
})
const AdminLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(301).json({ message: "Enter the required fields" })
    }
    const isavail = await admin.findOne({username})
    if (!isavail) {
        return res.status(200).json({ message: "Not exist admin , so please register first" })
    }
    const hashedpassword = await isavail.ispasswordcorrect(password)

    if (!hashedpassword) {
        return res.status(401).json({ message: "Given password not correct " })
    }
    const { accesstoken_a, refreshtoken_a } = await generateRefreshandAccessToken(isavail)
    console.log("accesstoken_a  "+accesstoken_a)
    const options = {
        httpOnly: true,
        secure: false,   // must be false for http://
        sameSite: "lax" // allows cross-site (different port)
    };
    const signinadmin = await admin.findById(isavail._id).select("-password -refreshToken")
    res.status(200)
        .cookie("accesstoken_a", accesstoken_a, options)
        .cookie("refreshtoken_a", refreshtoken_a, options)
        .json({ message: "U hvae been successfully  loged in admin ", admin: signinadmin })
}
const AdminLogout = async (req, res) => {
    const ADMIN = await admin.findById(req.admin?._id)
    if (!ADMIN) {
        return res.status(200).json({ message: "Unauthorized ADMIN after the mathcing the access token" })
    }
    const clearToken=await admin.findByIdAndUpdate(ADMIN?._id,{
        $set:{refreshToken:undefined}
    })
    if(!clearToken){
        return res.status(200).json({message:"Still u dont have been logout please try again"})
    }
    const options={
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    }
    return res.status(200)
    .clearCookie("accesstoken_a",options)
    .clearCookie("refreshtoken_a",options)
    .json({message:"successfull log out"})
}



export { AdminRegister, AdminLogin,AdminLogout }