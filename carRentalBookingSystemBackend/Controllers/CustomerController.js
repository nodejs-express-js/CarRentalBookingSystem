
const {Customer}=require("../models/index")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const validator=require("validator")
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
  

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email ||!password) {
            return res.status(400).send({message:"All fields are required"});
        }
        const customer=await Customer.findOne({where:{email}});
        if(!customer) return res.status(404).send({message:"Customer not found"});
        const isMatch=await bcrypt.compare(password,customer.password);
        if(!isMatch) return res.status(400).send({message:"Invalid credentials"});
        const url = await getSignedUrl(s3, new GetObjectCommand({Bucket: process.env.AWS_CUSTOMER_PROFILE_BUCKET_NAME, Key: customer.profilePicture}));
        const token=jwttoken(customer.id)
        res.status(200).send({email: customer.email,token: token,profilePicture: url})
    }
    catch{
        res.status(500).send({message:"signup request failed"});
    }
}

const signup=async(req,res)=>{
    try{
        const {firstName,lastName,email,password,address,phoneNumber}=req.body;
        if(req.file.size>MAX_SIZE){
            return res.status(400).json({ message: "File size exceeds 2MB limit!" });
        }
        if(!firstName ||!lastName ||!email ||!password ||!address ||!phoneNumber) {
            return res.status(400).send({message:"All fields are required"});
        }
        
        if(!validator.isEmail(email)) return res.status(409).send({message:"not valid email"});
        if(!validator.isStrongPassword(password,{ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })){
            return res.status(400).send({message:"Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."});
        }
        const customerExist=await Customer.findOne({where:{email}});
        if(customerExist) return res.status(409).send({message:"Email already exists"});
        const hashpassword=await bcrypt.hash(password,12);
        const uuid = crypto.randomUUID().replace(/-/g, "");

        const uploadParams = {
            Bucket: process.env.AWS_CUSTOMER_PROFILE_BUCKET_NAME,
            Key: uuid+".jpg", 
            Body: req.file.buffer,
          };
        const command1=new PutObjectCommand(uploadParams)
        const storeobject=await s3.send(command1)
        const customer=await Customer.create({firstName,lastName,email,password:hashpassword,profilePicture:uuid+".jpg",address,phoneNumber});
        const command2=new GetObjectCommand({Bucket: process.env.AWS_CUSTOMER_PROFILE_BUCKET_NAME,Key: uuid+".jpg",})
        const url = await getSignedUrl(s3, command2, { expiresIn: 3600*24 }); 
        res.status(201).send({email: customer.email,token: jwttoken(customer.id),profilePicture: url});
    }
    catch
    {
        res.status(500).send({message:"signup request failed"});
    }
}
module.exports={login,signup}
const jwttoken=(id)=>{
    return jwt.sign({id:id},process.env.CUSTOMER_SECRET_KEY,{expiresIn:"1d"})
}
