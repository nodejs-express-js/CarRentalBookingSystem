const {Car,Booking,Location}=require("../models/index")
const {S3Client, GetObjectCommand }=require("@aws-sdk/client-s3")
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
    const {date,carId,cardType,cardNumber,cardCVV,cardHolderName}=req.body;
    if(!date || !carId || !cardType || !cardNumber || !cardCVV || !cardHolderName){
        res.status(400).json({message:"all fields are required date,carId,cardType,cardNumber,cardCVV,cardHolderName"})
        return;
    }
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
        cardType:cardType,
        cardNumber:cardNumber,
        cardCVV:cardCVV,
        cardHolderName:cardHolderName,
        bookingDate: currdate,
        carId: car.dataValues.id,
        customerId: req.customer.id,
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


const getAllBookings=async(req,res)=>{
try{
    const {num1,num2}=req.body;
    if (num1 == null || num2 == null || num1 === '' || num2 === '') {
        return res.status(400).send({ message: "All fields are required" });
      }
      if( parseInt(num1)>parseInt(num2)){
          return res.status(400).send({message:"Invalid range"});
      }
      const range=parseInt(num2)-parseInt(num1);
      const bookings=await Booking.findAll({
      where:{
        customerId:req.customer.id
      },
      include: [
        {
          model: Car,
          as:'car',
          include: [
            {
              model: Location,
              as:'location',
                
            },
          ],
        },
      ],
      limit: range + 1,
      offset: parseInt(num1),
      order: [["createdAt", "DESC"]]
      })
      for(let i=0;i<bookings.length;i++){
        const url = await getSignedUrl(s3, new GetObjectCommand({Bucket: process.env.AWS_RENTAL_CAR_BUCKET_NAME, Key: bookings[i].car.photo}))
        bookings[i].car.photo=url;
      }

      const bookingsWithoutCVV = bookings.map(booking => {
        const bookingObject = booking.get({ plain: true }); // Convert Sequelize instance to a plain JavaScript object
        delete bookingObject.cardCVV;
        delete bookingObject.carId;
        delete bookingObject.customerId;
        delete bookingObject.createdAt;
        delete bookingObject.updatedAt;
        delete bookingObject.car.createdAt;
        delete bookingObject.car.updatedAt;
        delete bookingObject.car.locationId;
        delete bookingObject.car.location.createdAt;
        delete bookingObject.car.location.updatedAt;
        delete bookingObject.car.location.carRentalId;
        delete bookingObject.car.location.carRentalPhoto;
        return bookingObject;
      });
    res.status(200).json(bookingsWithoutCVV)
}
catch{
    res.status(500).json({message:"something went wrong with server"})
}

}


module.exports={createABooking,getAllBookings}