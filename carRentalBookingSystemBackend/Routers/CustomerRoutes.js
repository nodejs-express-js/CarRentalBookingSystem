
const express=require("express")
const customerRouter=express.Router()
const {login,signup}=require("../Controllers/CustomerController")
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

customerRouter.post("/login",login)
customerRouter.post("/signup",upload.single('profilePicture'),signup)

module.exports=customerRouter