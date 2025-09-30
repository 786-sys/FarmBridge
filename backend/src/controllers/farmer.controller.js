
import { farmer } from "../models/farmer.model.js"
import asynchandler from "../utils/asynhandler.js"
const generateRefreshandAccessToken = async (user) => {
    const User = await farmer.findById(user?._id)
    if (!User) {
        return res.status(401).json({ message: "Unauthorized Farmer" })
    }
    const accesstoken_f = await User.generateAccessToken();
    const refreshtoken_f = await User.generateRefreshToken();
    User.refreshToken = refreshtoken_f
    await user.save({ validateBeforeSave: false })
    return { accesstoken_f, refreshtoken_f }
}

const FarmerRegister = asynchandler(async (req, res) => {
    try{
        console.log(req.body.fullname+" "+req.body.username)
    const { fullname, gender, age, contact, soiltype, cropgrown, username, password } = req.body

    if ([fullname, gender,contact,soiltype, cropgrown,username, password].some((field) => field?.trim() === "")) {
        console.log("hello")
        throw new Error("All field are compulsory or required")
    }
    // if(cropgrown.length === 0){
    //     console.log("length zero")
    //     return res.status(200).json({message:"Crop grown has atleast one value"})
    // }
    const copyarray=cropgrown.split(',')
    const ispresentfarmer = await farmer.findOne({ username: `${username}` })
    if (ispresentfarmer) {
        return res.status(200).json({ message: "Already a farmer exist with this Username" })
    }
    const newfarmer = await new farmer({
        fullname,
        gender,
        age,
        contact,
        soiltype,
        "cropgrown":copyarray,
        username,
        password
    })
    await newfarmer.save()
    const createfarmer = await farmer.findById(newfarmer?._id).select("-password -refreshToekn")
    if (!createfarmer) {
        return res.status(102).json({ message: "new Farmer not created Yet please register again" })
    }
    return res.status(200).json({ message: "Successfully register", Farmer: createfarmer })
    }
    catch(err){
        console.log(err)
    }
})
const FarmerLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(301).json({ message: "Enter the required fields" })
    }
    const isavail = await farmer.findOne({username})
    if (!isavail) {
        return res.status(200).json({ message: "Not exist Farmer , so please register first" })
    }
    const hashedpassword = await isavail.ispasswordcorrect(password)

    if (!hashedpassword) {
        return res.status(401).json({ message: "Given password not correct " })
    }
    const { accesstoken_f, refreshtoken_f } = await generateRefreshandAccessToken(isavail)
    const options = {
        httpOnly: true,
        secure: false,   // must be false for http://
        sameSite: "lax" // allows cross-site (different port)
    };
    const signinfarmer = await farmer.findById(isavail._id).select("-password -refreshToken")
    res.status(200)
        .cookie("accesstoken_f", accesstoken_f, options)
        .cookie("refreshtoken_f", refreshtoken_f, options)
        .json({ message: "U hvae been successfully  loged in farmer ", farmer: signinfarmer })
}
const FarmerLogout = async (req, res) => {
    const FARMER = await farmer.findById(req.farmer?._id)
    if (!FARMER) {
        return res.status(200).json({ message: "Unauthorized Farmer after the mathcing the access token" })
    }
    const clearToken=await farmer.findByIdAndUpdate(FARMER?._id,{
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
    .clearCookie("accesstoken_f",options)
    .clearCookie("refreshtoken_f",options)
    .json({message:"successfull log out"})
}

export { FarmerRegister, FarmerLogin, FarmerLogout }