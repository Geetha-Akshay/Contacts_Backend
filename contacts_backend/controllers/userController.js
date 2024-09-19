const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async(req,res)=>{
    const {userName,userEmail,password} = req.body
    if(!userName || !userEmail || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    try{
        const user=await User.findOne({userEmail})
        //user exists
        res.status(400)
        throw new Error("User already exists")
    }
    catch{
        //hashing the password
        const hashed_password = await bcrypt.hash(password,10)
        console.log("Hashed password:",hashed_password)
        const user =await User.create({
            userName,
            userEmail,
            password:hashed_password
        })
        res.status(200).json({_id: user.id,userEmail})
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {userEmail,password} = req.body
    if(!userEmail || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    try{
        const user = await User.findOne({userEmail})
        try{
            const verification = await bcrypt.compare(password,user.password)
            
            const accessToken = jwt.sign(
                {
                    user:{
                        userName:user.userName,
                        userEmail:user.userEmail,
                        userId:user._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"15m"}
            )
            res.status(200).json({accessToken})
        }
        catch{
            res.status(401)
            throw new Error("Wrong password")
        }
    }
    catch{
        res.status(401)
        throw new Error("Invalid user")
    }
    res.json({message:"login page of the user"})
})

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}