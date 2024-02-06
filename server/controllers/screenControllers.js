const asyncHandler=require('express-async-handler');
const Screens=require('../models/showModel');

const addScreen=asyncHandler(async(req,res)=>{ //fine
    const {screen_id,no_of_seats}=req.body;
    if(!screen_id||!no_of_seats){
        return res.status(400).send("All fields are mandatory")
    }
    try{
        await Screens.create({"screen_id":screen_id,"no_of_seats":no_of_seats})
        res.status(200).send("Screen added succesfully")
    }
    catch(e){
        res.status(400).send({e})
    }
})

module.exports={addScreen}