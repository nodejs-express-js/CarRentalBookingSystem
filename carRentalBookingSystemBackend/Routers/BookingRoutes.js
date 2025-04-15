const express=require("express")
const BookingRoutes=express.Router()
const {createABooking,getAllBookings,getAllDisabledDates}=require("../Controllers/BookingController")


BookingRoutes.post("/createabooking",createABooking)
BookingRoutes.post("/getallbookings",getAllBookings)
BookingRoutes.post("/datestodisable",getAllDisabledDates)


module.exports=BookingRoutes