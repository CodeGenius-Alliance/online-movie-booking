const mongoose=require('mongoose')

const screenSchema=new mongoose.Schema({
    screen_id:{
        type:String,
        required:{true:"Please mention the screen id"},
        unique:{true:"Screen id already exists,please mention unique screen id"}
    },
    screen_name:{
        type:String
    },
    no_of_seats:{
        type:Number,
        required:{true:"Please mention the number of seats available in the screen"},
    },
    
},
{
    timeStamps:true
})
const screenModel=mongoose.model("Screens",screenSchema)

module.exports=screenModel;