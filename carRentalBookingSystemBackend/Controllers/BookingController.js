const createABooking=async(req,res)=>{
try{
    const {date}=req.body;
    const currdate=new Date(date)
    console.log(req.customer.id,currdate)
    res.status(200).json({message:"hello world"})

}
catch(err){
    console.log(err)
    res.status(500).json({message:"something went wrong with server"})
}
}
module.exports={createABooking}