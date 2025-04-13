const express=require("express")
const BookingRoutes=express.Router()
const {createABooking,getAllBookings}=require("../Controllers/BookingController")
BookingRoutes.post("/createabooking",createABooking)
BookingRoutes.post("/getallbookings",getAllBookings)

module.exports=BookingRoutes