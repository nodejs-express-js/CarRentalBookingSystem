const express=require("express")
const renterRouter=express.Router();
const {signup,login}=require("../Controllers/RenterController")

renterRouter.post("/signup",signup)
renterRouter.post("/login",login)

module.exports=renterRouter;