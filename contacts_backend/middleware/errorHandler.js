const {constants}=require("../constants")

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode :500
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Error",message:err.message,stackTrace:err.stack})
            break
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break
        case constants.SERVER_ERROR:
            res.json({title:"server issue",message:err.message,stackTrace:err.stack})
            break
        case constants.UNAUTHORIZED:
            res.json({title:"Not authorized",message:err.message,stackTrace:err.stack})
            break
        case constants.FORBIDDEN:
            res.json({title:"forbidden",message:err.message,stackTrace:err.stack})
            break

        default:
            console.log("No error")
            break
    }
}

module.exports=errorHandler