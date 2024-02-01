const asyncHandler=require('express-async-handler');
const Admin=require('../models/adminModel');
const jwt=require('jsonwebtoken')
const login=asyncHandler(async(req,res)=>{
    try{
        const {email,password}=req.body;
        const chk=await Admin.findOne({"email":email});
        if(!chk){
            return res.status(200).send("Admin id not found");
        }
        else if(chk.password==password){
            const accessToken=jwt.sign({
                user:{
                    adminname:email
                }
            },process.env.ACCESS_TOKEN_ADMIN,{expiresIn:"40m"});
            return res.status(200).send(accessToken);
        }
        else{ 
            res.status(400).send("Invalid credentials");
        }
    }
    catch(e){
        console.log(e);
    }
})

module.exports={login};