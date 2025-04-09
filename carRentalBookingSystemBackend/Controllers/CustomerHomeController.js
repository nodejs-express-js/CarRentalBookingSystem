const {Location}=require("../models/index")
const { Sequelize, DataTypes, Op } = require('sequelize');

const {S3Client,PutObjectCommand,GetObjectCommand}=require("@aws-sdk/client-s3")
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")
require("dotenv").config()
const s3 = new S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    },
});

const getCustomerLocations=async(req,res)=>{
try{
    const {latitude,longitude}=req.body;
    const locations = await Location.findAll({
        attributes: [
          'id',
          'name',
          'city',
          'carRentalPhoto',
          'state',
          'country',
          'latitude',
          'longitude',
          [
            Sequelize.literal(`(
              (latitude - ${latitude}) * (latitude - ${latitude}) +
              (longitude - ${longitude}) * (longitude - ${longitude})
            )`),
            'distancesquared', // Calculate squared distance for efficiency
          ],
        ],
        order: Sequelize.literal('distancesquared ASC'),
        limit: 3,
        raw: true, 
      });
  
      const results = locations.map(location => ({
        ...location,
        distance: Math.sqrt(location.distancesquared),
      }));
      for(let i = 0; i < results.length; i++){
      
     const command2 = new GetObjectCommand({
        Bucket: process.env.AWS_RENTAL_PHOTO_BUCKET_NAME,
        Key: results[i].carRentalPhoto,
      });
    
      results[i].carRentalPhoto = await getSignedUrl(s3, command2, { expiresIn: 3600*24 });
    }

    res.status(200).json({results})
}
catch(err){
    console.log(err);
    res.status(500).send({message:"Error retrieving locations"});
}
}
module.exports={getCustomerLocations}