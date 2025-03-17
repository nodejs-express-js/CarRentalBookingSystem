const express=require("express")
const HomeRouter=express.Router();
const {createALocation,geAllLocation,deleteALocation}=require("../Controllers/RenterHomeController")
const multer=require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });

HomeRouter.post("/createlocation",upload.single("carRentalPhoto"),createALocation)
HomeRouter.post("/getalllocations",geAllLocation)
HomeRouter.delete("/delete/:id",deleteALocation)

module.exports=HomeRouter;