const express=require("express");
const app = express();
const renterRouter=require("./Routers/RenterRoutes")
require("dotenv").config()
app.use(express.json());

app.use(process.env.ROUTES_PATH_PREFIX+"/renter",renterRouter)
app.listen(process.env.PORT||8080, ()=>{
    console.log("Server is running on port",process.env.PORT||8080);
});