const mongoose=require('mongoose')

const screenSchema=new mongoose.Schema({
    
    screen_name:{
        type:String
    },
    no_of_rows:{
        type:Number,
        required:{true:"Please mention the number of rows available in the screen"},
    },
    no_of_columns:{
        type:Number,
        required:{true:"Please mention the number of columns available in the screen"},
    },
    
},
{
    timeStamps:true
})
const screenModel=mongoose.model("Screens",screenSchema)

module.exports=screenModel;