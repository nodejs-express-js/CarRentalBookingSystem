const express=require("express")
const customerHomeRoutes=express.Router()
const {getCustomerLocations}=require("../Controllers/CustomerHomeController")
customerHomeRoutes.post("/fetchlocations",getCustomerLocations)

module.exports=customerHomeRoutes