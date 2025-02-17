
const jwt=require("jsonwebtoken");
const {CarRental}=require("../models/index")
const renterMiddleware =async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({error:"You must be logged in to rent a car."});
    }
    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];
    try{
        const renterId=jwt.verify(token,process.env.SECRET_KEY)
        const renter=await CarRental.findOne({id:renterId})
        req.renter=renter;
        if(!renter){
            return res.status(403).json({error:"Invalid token."});
        }
    }
    catch(error){
        return res.status(403).json({error:"Invalid token."});
    }
    next();
}

module.exports=renterMiddleware;