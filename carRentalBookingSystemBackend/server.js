const express=require("express");
const app = express();
const cors=require("cors");
const renterMiddleware=require("./MiddleWare/RenterMiddleWare");

const renterRouter=require("./Routers/RenterRoutes")
const renterHomeRouter=require("./Routers/RenterHomeRoutes")
const RenterEachLocationCarRouter=require("./Routers/RenterEachLocationCarsRoutes")

const customerRouter=require("./Routers/CustomerRoutes")


require("dotenv").config()
app.use(express.json());
app.use(cors())

app.use(process.env.ROUTES_PATH_PREFIX+"/renter",renterRouter)
app.use(process.env.ROUTES_PATH_PREFIX+"/protected",renterMiddleware)
app.use(process.env.ROUTES_PATH_PREFIX+"/protected/renterhome",renterHomeRouter)
app.use(process.env.ROUTES_PATH_PREFIX+"/protected/rentereachlocationcars",RenterEachLocationCarRouter)

// app.use(process.env.ROUTES_PATH_PREFIX+"/customerprotected",)

app.use(process.env.ROUTES_PATH_PREFIX+"/customer",customerRouter)

app.listen(process.env.PORT||8080, ()=>{
    console.log("Server is running on port",process.env.PORT||8080);
});