const express=require("express")
const HomeRouter=express.Router();


HomeRouter.get("/", (req, res) => {
    res.send(req.renter)
})


module.exports =HomeRouter;