//npm install mongoose
const mongoose=require("mongoose");

const admin_schema=new mongoose.Schema({
    "name":{type:String,default:'',require:true},
    "email":{type:String,default:'',require:true},
    "password":{type:String,default:'',require:true}
})

const admin_model=mongoose.model("admin",admin_schema)

module.exports=admin_model;