const express=require("express")
const RenterEachLocationCarRouter= express.Router()
const {getLocationCars,createLocationCars,deleteLocationCars}=require("../Controllers/RenterEachLocationCarsController")
const multer=require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });


RenterEachLocationCarRouter.post("/getLocationcars",getLocationCars)
RenterEachLocationCarRouter.post("/createlocationcars",upload.single("photo"),createLocationCars)
RenterEachLocationCarRouter.delete("/deletelocationcars/:id",deleteLocationCars)

module.exports=RenterEachLocationCarRouter;


