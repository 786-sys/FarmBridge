
import { retailer } from "../models/retailer.model.js"
import asynchandler from "../utils/asynhandler.js"
const generateRefreshandAccessToken = async (user) => {
    const User = await retailer.findById(user?._id)
    if (!User) {
        return res.status(401).json({ message: "Unauthorized Farmer" })
    }
    const accesstoken_r = await User.generateAccessToken();
    const refreshtoken_r = await User.generateRefreshToken();
    User.refreshToken = refreshtoken_r
    await user.save({ validateBeforeSave: false })
    return { accesstoken_r, refreshtoken_r }
}
const RetailerRegister = asynchandler(async (req, res) => {
    try{
        console.log(req.body.fullname+" "+req.body.username)
    const { fullname, gender, age, contact,shopname,shoplocation,goodpurchase,email, username, password } = req.body

    if ([fullname, gender,contact,shopname,shoplocation,goodpurchase,email,username, password].some((field) => field?.trim() === "")) {
        console.log("hello")
        throw new Error("All field are compulsory or required")
    }
    const ispresentretailer = await retailer.findOne({ username: `${username}` })
    if (ispresentretailer) {
        return res.status(200).json({ message: "Already a retailer exist with this Username" })
    }
    const newRetailer = await new retailer({
        fullname,
        gender,
        age,
        contact,
        shopname,
        shoplocation,
        goodpurchase,
        email,
        username,
        password
    })
    await newRetailer.save()
    const createretailer = await retailer.findById(newRetailer?._id).select("-password -refreshToekn")
    if (!createretailer) {
        return res.status(102).json({ message: "new retailer not created Yet please register again" })
    }
    return res.status(200).json({ message: "Successfully register", retailer: createretailer })
    }
    catch(err){
        console.log(err)
    }
})
const RetailerLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(301).json({ message: "Enter the required fields" })
    }
    const isavail = await retailer.findOne({username})
    if (!isavail) {
        return res.status(200).json({ message: "Not exist Retailer , so please register first" })
    }
    const hashedpassword = await isavail.ispasswordcorrect(password)

    if (!hashedpassword) {
        return res.status(401).json({ message: "Given password not correct " })
    }
    const { accesstoken_r, refreshtoken_r } = await generateRefreshandAccessToken(isavail)
    console.log("accesstoken_r  "+accesstoken_r)
    const options = {
        httpOnly: true,
        secure: false,   // must be false for http://
        sameSite: "lax" // allows cross-site (different port)
    };
    const signinretailer = await retailer.findById(isavail._id).select("-password -refreshToken")
    res.status(200)
        .cookie("accesstoken_r", accesstoken_r, options)
        .cookie("refreshtoken_r", refreshtoken_r, options)
        .json({ message: "U hvae been successfully  loged in retailer ", retailer: signinretailer })
}
const RetailerLogout = async (req, res) => {
    const RETAILER = await retailer.findById(req.retailer?._id)
    if (!RETAILER) {
        return res.status(200).json({ message: "Unauthorized Retailer after the mathcing the access token" })
    }
    const clearToken=await retailer.findByIdAndUpdate(RETAILER?._id,{
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
    .clearCookie("accesstoken_r",options)
    .clearCookie("refreshtoken_r",options)
    .json({message:"successfull log out"})
}

export { RetailerRegister, RetailerLogin,RetailerLogout }