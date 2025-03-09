
const {CarRental}=require("../models/index")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const validator = require("validator")
const {S3Client,PutObjectCommand, GetObjectCommand }=require("@aws-sdk/client-s3")
const {getSignedUrl }=require("@aws-sdk/s3-request-presigner")
require("dotenv").config()
const MAX_SIZE = 2 * 1024 * 1024;

const s3 = new S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    },
  });
  
const signup=async(req,res)=>{
try{
    const {firstName,lastName,email,password,phone,address}=req.body;
    if(req.file.size>MAX_SIZE){
        return res.status(400).json({ message: "File size exceeds 2MB limit!" });
    }
    if(!firstName || !lastName || !email || !req.file || !address || !password) {
        return res.status(400).send({message:"All fields are required"});
    }
    if(!validator.isEmail(email)) {
        return res.status(400).send({message:"Invalid email format"});
    }
    if(!validator.isStrongPassword(password,{ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })){
        return res.status(400).send({message:"Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."});
    }
    const existingUser=await CarRental.findOne({where:{email}});
    if(existingUser) return res.status(400).send({message:"Renter email already exists"});

    const hashpassword=await HashPassword(password);
    const uuid = crypto.randomUUID().replace(/-/g, "");
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uuid+".jpg", 
        Body: req.file.buffer,
      };
    const command = new PutObjectCommand(uploadParams);
    const response = await s3.send(command);

    const carUser=await CarRental.create({
        firstName,
        lastName,
        email,
        password:hashpassword,
        phone,
        address,
        profilePicture:uuid+".jpg"
    })
    const command2 = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uuid+".jpg",
      });
      const url = await getSignedUrl(s3, command2, { expiresIn: 3600*24 }); 
    res.status(200).send({
        email: carUser.email,
        token: token(carUser.id),
        profilePicture: url
    })
}
catch(err){
    console.log(err);
    res.status(500).send({message:"signup request failed"});
}
}


const login=async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email ||!password) {
            return res.status(400).send({message:"All fields are required"});
        }
        const carUser=await CarRental.findOne({where:{email}});
        if(!carUser) return res.status(404).send({message:"Renter not found"});
        const isMatch=await bcrypt.compare(password,carUser.password);
        if(!isMatch) return res.status(400).send({message:"Invalid credentials"});
        const command2 = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: carUser.profilePicture,
        });
        const url = await getSignedUrl(s3, command2, { expiresIn: 3600*24 }); // Expires in 1 hour (3600 sec)
    
      
        res.status(200).send({
            email: carUser.email,
            token: token(carUser.id),
            profilePicture: url
        })
    }
    catch{
        res.status(500).send({message:"login request failed "});
    }
}

module.exports={signup,login}



const HashPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
const token=(id)=>{
    return jwt.sign({id:id},process.env.SECRET_KEY,{expiresIn:"1d"})
}