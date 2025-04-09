const express=require("express")
const customerHomeRoutes=express.Router()
const {getCustomerLocations,getLocationCars}=require("../Controllers/CustomerHomeController")
customerHomeRoutes.post("/fetchlocations",getCustomerLocations)
customerHomeRoutes.post("/fetchcars",getLocationCars)
module.exports=customerHomeRoutes