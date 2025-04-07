const jwt=require("jsonwebtoken")
const {Customer}=require("../models/index")
const customerMiddleware=async(req,res,next)=>{
    const headers=req.headers;
    const Bearer=headers["authorization"].split(" ")[0]
    
    if(!headers["authorization"] || Bearer!=="Bearer"){
        return res.status(401).json({error:"You must be logged in to access this resource."})
    }
    
    const token=headers["authorization"].split(" ")[1]
    try{
        const customerId=jwt.verify(token,process.env.CUSTOMER_SECRET_KEY)
        const customer=await Customer.findOne({id:customerId})
        if(!customer){
            return res.status(403).json({error:"Invalid token."})
        }
        
        req.customer=customer
       
    }
    catch(error){
        console.log(error)
        return res.status(403).json({error:"Invalid token."})
    }
    next()
}
module.exports=customerMiddleware