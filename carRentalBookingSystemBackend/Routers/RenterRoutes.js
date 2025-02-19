const express=require("express")
const renterRouter=express.Router();
const {signup,login}=require("../Controllers/RenterController")
const multer=require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });

renterRouter.post("/signup",upload.single("profilePicture"),signup)
renterRouter.post("/login",login)

module.exports=renterRouter;