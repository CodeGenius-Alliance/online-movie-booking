const mongoose=require("mongoose");

const AdminSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"Please add the email"]
        },
        password:{
            type:String,
            required:[true,"Please add the password"]
        },
        addedMovies:[
            {
                type:String,
            }
        ]
    }
)

module.exports=mongoose.model("Admins",AdminSchema);