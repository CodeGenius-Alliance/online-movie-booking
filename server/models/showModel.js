const mongoose=require('mongoose');

const ShowSchema=mongoose.Schema({
    show_id:{
        type:String,
        required:{true:"Please mention the show id"},
        unique:true
    },
    screen_id:{
        type:String,
        required:{true:"Please mention the screen id"}
    },
    movie_id:{
        type:String,
        required:{true:"Please mention the movie id"}
    },
    status:{
        type:Boolean
    },
    seats:{
        type:Array,
    },
    date:{
        type:Date,
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

module.exports=mongoose.model("Shows",ShowSchema);