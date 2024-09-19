const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel.js")

const getContacts=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({userId:req.user.userId})
    res.status(200).json({contacts})
})

const createContact=asyncHandler(async (req,res)=>{
    const {name,email,phone}=req.body
    console.log("The body is",req.body)
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name,email,phone,userId:req.user.userId
    })
    res.status(200).json(contact)
})

const getContact=asyncHandler(async (req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id)
        res.status(200).json(contact)
    }
    catch(err){
        console.log("Not found")
        res.status(404)
        throw new Error("Contact not found")
    }    
})

const updateContact=asyncHandler(async (req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id)
        if(contact.userId.toString() !== req.params.id)
        {
            res.status(403)
            throw new Error("Users don't have permission to update other user contacts")
        }
        const updated_contact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updated_contact)
    }
    catch(err){
        console.log("Not found")
        res.status(404)
        throw new Error("Contact not found")
    }  
})

const deleteContact=asyncHandler(async (req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id)
        if(contact.userId.toString() !== req.params.id)
        {
            res.status(403)
            throw new Error("Users don't have permission to delete other user contacts")
        }
        const deleted_contact=await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted_contact)
    }
    catch(err){
        console.log("Not found")
        res.status(404)
        throw new Error("Contact not found")
    }  
})

module.exports={getContacts,createContact,getContact,updateContact,deleteContact}