const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_id:{
    type: String,
    required: true,
    unique:[true,"Please mention unique id"]
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  
  screen:[
    {
      screen_id:{type:String},
      show:[{
        show_id:{
          type:String,
          unique:true
        },
        date:{type:Date},
        show_time:{type:String},
        price:{type:String},
        bookings:[{
            user_id:{type:String},
            seats:{type:Array}
        }]
    }]
    }
  ],

});

const movieModel=mongoose.model("Movie", movieSchema);

module.exports = movieModel
