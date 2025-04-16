const express=require("express");
const app = express();
const cors=require("cors");
const renterMiddleware=require("./MiddleWare/RenterMiddleWare");
const customerMiddleware=require("./MiddleWare/CustomerMiddleWare");
const renterRouter=require("./Routers/RenterRoutes")
const renterHomeRouter=require("./Routers/RenterHomeRoutes")
const RenterEachLocationCarRouter=require("./Routers/RenterEachLocationCarsRoutes")

const customerRouter=require("./Routers/CustomerRoutes")
const customerHomeRoutes=require("./Routers/CustomerHomeRoutes")
const BookingRoutes=require("./Routers/BookingRoutes")
require("dotenv").config()
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.sendStatus(200);  // Root health check for load balancer
  });
  app.get('/healthz', (req, res) => {
    res.sendStatus(200);  // Additional readiness probe endpoint
  });
  


app.use(process.env.ROUTES_PATH_PREFIX+"/renter",renterRouter)
app.use(process.env.ROUTES_PATH_PREFIX+"/protected",renterMiddleware)
app.use(process.env.ROUTES_PATH_PREFIX+"/protected/renterhome",renterHomeRouter)
app.use(process.env.ROUTES_PATH_PREFIX+"/protected/rentereachlocationcars",RenterEachLocationCarRouter)

// app.use(process.env.ROUTES_PATH_PREFIX+"/customerprotected",)

app.use(process.env.ROUTES_PATH_PREFIX+"/customer",customerRouter)
app.use(process.env.ROUTES_PATH_PREFIX+"/protectedcustomer",customerMiddleware)
app.use(process.env.ROUTES_PATH_PREFIX+"/protectedcustomer/customerhome",customerHomeRoutes)
app.use(process.env.ROUTES_PATH_PREFIX+"/protectedcustomer/booking",BookingRoutes)
app.listen(process.env.PORT||8080, ()=>{
    console.log("Server is running on port",process.env.PORT||8080);
});