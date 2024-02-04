const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bookedmovie:[{
    movie_id:{type:String},seats:{type:Array}
    
  }]
});

const userModel=mongoose.model("User", userSchema);
module.exports=userModel
