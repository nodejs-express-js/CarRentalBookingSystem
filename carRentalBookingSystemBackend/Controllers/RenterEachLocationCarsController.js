
const {Car,Location}=require("../models/index")
require("dotenv").config()
const {S3Client,PutObjectCommand, GetObjectCommand ,DeleteObjectCommand}=require("@aws-sdk/client-s3")
const {getSignedUrl }=require("@aws-sdk/s3-request-presigner")
const s3 = new S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    },
});

const MAX_SIZE = 2 * 1024 * 1024;



const getLocationCars=async(req,res)=>{
    try{
        const {num1,num2,locationId}=req.body;
        if (num1 == null || num2 == null || num1 === '' || num2 === '') {
            return res.status(400).send({ message: "All fields are required" });
        }
        if( parseInt(num1)>parseInt(num2)){
            return res.status(400).send({message:"Invalid range"});
        }
        const range=parseInt(num2)-parseInt(num1);

        const cars=await Car.findAll({
            where: {
                locationId: locationId
            },
            limit: range + 1,
            offset: parseInt(num1),
            order: [["id", "ASC"]]
        })
        for(let i=0;i<cars.length;i++){
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_RENTAL_CAR_BUCKET_NAME,
                Key: cars[i].photo,
            });
            const url = await getSignedUrl(s3, command, { expiresIn: 3600*24 });
            cars[i].photo=url
        }
        res.status(200).json({ cars: cars,locationId: locationId});
    }
    catch{
        res.status(500).send({message:"something went wrong with the response"});
    }
}


const createLocationCars=async(req,res)=>{
try{
    if(req.file.size>MAX_SIZE){
        return res.status(400).json({ message: "File size exceeds 2MB limit!" });
    }
    const {make,model,year,pricePerDay,locationId}=req.body;
    if(!make || !model || !year || !pricePerDay || !locationId){
        return res.status(400).send({message:"All fields are required"});
    }
    const location=await Location.findByPk(locationId);
    if(!location) return res.status(404).send({message:"Location not found"});
    if(location.carRentalId!=req.renter.id){
        return res.status(403).send({message:"Unauthorized to create a car for this location"});
    }
    const uuid = crypto.randomUUID().replace(/-/g, "");
    const params = {
        Bucket: process.env.AWS_RENTAL_CAR_BUCKET_NAME,
        Key: uuid+".jpg",
        Body: req.file.buffer
    };
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    const CarCreated=await Car.create({
        locationId:locationId,
        photo:uuid+".jpg",
        make:make,
        model:model,
        year:year,
        pricePerDay:pricePerDay,
    })
    const command2 = new GetObjectCommand({
        Bucket: process.env.AWS_RENTAL_CAR_BUCKET_NAME,
        Key: uuid+".jpg",
      });
      const url = await getSignedUrl(s3, command2, { expiresIn: 3600*24 });
      res.status(200).json({
        photo:url,
        make:make,
        model:model,
        year:year,
        pricePerDay:pricePerDay,
        locationId:locationId,
      })
}
catch{
    res.status(500).json({message: 'something went wrong with server input'})
}
}


const deleteLocationCars=async(req,res)=>{
try{
    const cartodelete=await Car.findByPk(req.params.id)
    if(!cartodelete) return res.status(200).send({message:"Car not found"});
    const location=await Location.findByPk(cartodelete.locationId);
    if(!location) return res.status(404).send({message:"Location not found"});
    if(location.carRentalId!=req.renter.id){
        return res.status(403).send({message:"Unauthorized to create a car for this location"});
    }
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_RENTAL_CAR_BUCKET_NAME,
        Key: cartodelete.photo,
      });
      await s3.send(command);
      await cartodelete.destroy();
      res.status(200).json({message:"Car deleted successfully"})
}
catch{
    res.status(500).json({message: 'something went wrong with server input'})
}
}



module.exports={getLocationCars,createLocationCars,deleteLocationCars}