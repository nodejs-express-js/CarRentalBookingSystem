
const {CarRental}=require("../models/index")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const validator = require("validator")
const { options } = require("../Routers/RenterRoutes")


const signup=async(req,res)=>{
try{
    const {firstName,lastName,email,password,phone,address,profilePicture}=req.body;
    console.log(firstName,lastName,email,password)
    if(!firstName || !lastName || !email || !profilePicture || !address || !password) {
        return res.status(400).send("All fields are required");
    }
    if(!validator.isEmail(email)) {
        return res.status(400).send("Invalid email format");
    }
    if(!validator.isStrongPassword(password,{ minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })){
        return res.status(400).send("Password must be at least 8 characters long, include a number, an uppercase letter, and a special character.");
    }
    const existingUser=await CarRental.findOne({where:{email}});
    if(existingUser) return res.status(400).send("Renter already exists");

    const hashpassword=await HashPassword(password);
    const carUser=await CarRental.create({
        firstName,
        lastName,
        email,
        password:hashpassword,
        phone,
        address,
        profilePicture
    })
    res.status(200).send({
        email: carUser.email,
        token: token(carUser.id),
        profilePicture: carUser.profilePicture
    })
}
catch(err){
    res.status(500).send("signup request failed ");
}
}


const login=async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email ||!password) {
            return res.status(400).send("All fields are required");
        }
        const carUser=await CarRental.findOne({where:{email}});
        if(!carUser) return res.status(404).send("Renter not found");
        const isMatch=await bcrypt.compare(password,carUser.password);
        if(!isMatch) return res.status(400).send("Invalid credentials");
        res.status(200).send({
            email: carUser.email,
            token: token(carUser.id),
            profilePicture: carUser.profilePicture
        })
    }
    catch{
        res.status(500).send("login request failed ");
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