const mongoose=require('mongoose');

const ScreenSchema=mongoose.Schema({
    screen_id:{
        type:String,
        unique:[true,"Please mention unique id for screen"],
        required:{true:"Please mention the screen id"}
    },
    movie_id:{
        type:String,
        unique:[true,"Please mention unique id for screen"],
        required:{true:"Please mention the movie id"}
    },
    no_of_seats:{
        type:String,
        required:{true:"Please mention the no of seats available in screen"}
    },
    status:{
        type:Boolean
    },
    seats:{
        type:Array,
    },
    date:{
        type:String,
        required:{true:"Please mention date"}
    },
    time:{
        type:String,
        required:{true:"Please mention time"}
    }
},
{
    timeStamps:true,
}
)

module.exports=mongoose.model("Screens",ScreenSchema);