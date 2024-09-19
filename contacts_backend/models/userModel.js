const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please add the user"] 
    },
    userEmail:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"mail already exists"] 
    },
    password:{
        type:String,
        required:[true,"Please add the user password"] 
    }
},{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema)