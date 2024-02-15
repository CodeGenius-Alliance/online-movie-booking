const asyncHandler=require('express-async-handler');
const Screens=require('../models/screenModel');

const addScreen=asyncHandler(async(req,res)=>{ //fine
    const {screen_id,screen_name,no_of_rows,no_of_columns}=req.body; 
    if(!screen_id||!screen_name||!no_of_rows||!no_of_columns){
        return res.status(400).send("All fields are mandatory")
    }
    try{
        await Screens.create({"screen_id":screen_id,'screen_name':screen_name,"no_of_rows":no_of_rows,"no_of_columns":no_of_columns})
        res.status(200).send("Screen added succesfully")
    }
    catch(e){
        res.status(400).send({e})
    }
})

const getScreen=asyncHandler(async(req,res)=>{
    try{
        const screen_id=req.params.screenid
        const info=await Screens.find({'screen_id':screen_id});
        res.status(200).send(info[0]);
    }
    catch(e){
        res.status(400).send({e})
    }
})

module.exports={addScreen,getScreen}