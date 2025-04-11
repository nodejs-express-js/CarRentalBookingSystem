const express=require("express")
const BookingRoutes=express.Router()
const {createABooking}=require("../Controllers/BookingController")
BookingRoutes.post("/createabooking",createABooking)


module.exports=BookingRoutes