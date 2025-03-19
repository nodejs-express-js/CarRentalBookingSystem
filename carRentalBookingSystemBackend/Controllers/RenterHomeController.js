const {Location}=require("../models/index")
require("dotenv").config()
const validator = require("validator")

const {S3Client,PutObjectCommand, GetObjectCommand ,DeleteObjectCommand}=require("@aws-sdk/client-s3")
const {getSignedUrl }=require("@aws-sdk/s3-request-presigner")

const MAX_SIZE = 2 * 1024 * 1024;

const s3 = new S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    },
});

const createALocation=async(req,res)=>{
try{
const {name,city,state,country,latitude,longitude}=req.body;
if(req.file.size>MAX_SIZE){
    return res.status(400).json({ message: "File size exceeds 2MB limit!" });
}

if(!name || !city || !state || !country ||!latitude ||!longitude) {
    return res.status(400).send({message:"All fields are required"});
}
if(!validator.isNumeric(latitude) && !validator.isNumeric(longitude)){
    return res.status(400).send({message:"Invalid latitude or longitude"});
}


const uuid = crypto.randomUUID().replace(/-/g, "");
const uploadParams = {
    Bucket: process.env.AWS_RENTAL_PHOTO_BUCKET_NAME,
    Key: uuid+".jpg", 
    Body: req.file.buffer,
  };
const command = new PutObjectCommand(uploadParams);
const response = await s3.send(command);


const location=await Location.create({
    name:name,city:city,state:state,country:country,latitude:latitude,longitude:longitude,
    carRentalId:req.renter.id,
    carRentalPhoto:uuid+".jpg",
})

const command2 = new GetObjectCommand({
    Bucket: process.env.AWS_RENTAL_PHOTO_BUCKET_NAME,
    Key: uuid+".jpg",
  });
  const url = await getSignedUrl(s3, command2, { expiresIn: 3600*24 });
res.status(200).send({
    name:name,city:city,state:state,country:country,latitude:latitude,longitude:longitude,
    carRentalPhoto:url
})
}
catch{
    res.status(500).send({message:"something went wrong with the response"});
}
}





const geAllLocation=async(req,res)=>{
    try{
        const {num1,num2}=req.body;

        if (num1 == null || num2 == null || num1 === '' || num2 === '') {
            return res.status(400).send({ message: "All fields are required" });
        }

        if( parseInt(num1)>parseInt(num2)){
            
            return res.status(400).send({message:"Invalid range"});
        }

        const range=parseInt(num2)-parseInt(num1);
        
        const locations = await Location.findAll({
            where: {
                carRentalId: req.renter.id
            },
            limit: range + 1,
            offset: parseInt(num1),
            order: [["id", "ASC"]]
        });
       
          for(let i=0;i<locations.length;i++){
            const command2 = new GetObjectCommand({
                Bucket: process.env.AWS_RENTAL_PHOTO_BUCKET_NAME,
                Key: locations[i].carRentalPhoto,
              });
              const url = await getSignedUrl(s3, command2, { expiresIn: 3600*24 });
            locations[i].carRentalPhoto=url
        }
        res.status(200).send(locations)
    }
    catch{
        res.status(500).send({message:"something went wrong with the response"});
    }
}



const deleteALocation=async(req,res)=>{
    try{
       
        const location=await Location.findByPk(req.params.id);
        if(!location){
            return res.status(404).send({message:"Location not found"});
        }
        if(location.carRentalId!=req.renter.id){
            return res.status(403).send({message:"Unauthorized to delete this location"});
        }
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_RENTAL_PHOTO_BUCKET_NAME,
            Key: location.carRentalPhoto,
          });
          await s3.send(command);
        await location.destroy();
        res.status(200).send({message:"Location deleted successfully"})
    }
    catch{
        res.status(500).send({message:"something went wrong with the response"});
    }
}


module.exports={createALocation,geAllLocation,deleteALocation}