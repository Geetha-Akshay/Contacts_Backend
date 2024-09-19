const express=require("express")
const dotenv=require("dotenv").config()
const errorHandler=require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection.js")
const port=process.env.PORT

connectDb()
const app=express()

app.use(express.json())

app.use("/api/contact",require("./routes/contactRoutes.js"))//middleware
app.use("/user",require("./routes/userRoutes.js"))
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})