const {Car}=require("../models/index")
const {Booking}=require("../models/index")
const {S3Client,PutObjectCommand, GetObjectCommand }=require("@aws-sdk/client-s3")
const {getSignedUrl }=require("@aws-sdk/s3-request-presigner")
require("dotenv").config()
const s3 = new S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    },
});


const createABooking=async(req,res)=>{
try{
    const {date,carId}=req.body;
    const currdate=new Date(date)
    const car=await Car.findOne({
        where:{
            id:carId
        }
    })
    if(!car){
        res.status(400).json({message:"car does not exist"})
        return;
    }
    const booking=await Booking.create({
        bookingDate: currdate,
        carId: car.dataValues.id,
        customerId: req.customer.id
      })
    const url = await getSignedUrl(s3, new GetObjectCommand({Bucket: process.env.AWS_RENTAL_CAR_BUCKET_NAME, Key: car.photo}));
    car.photo=url;
    res.status(200).json({booking,car})
}
catch(err){
    try{
        res.status(500).json({message:err.errors[0].message})
        return;
    }
    catch{
        res.status(500).json({message:"something went wrong with server"})
        return;
    }
}
}





module.exports={createABooking}