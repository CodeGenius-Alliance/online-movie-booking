const mongoose = require("mongoose");
const screenModel=require('./screenModel')

// const movieSchema = new mongoose.Schema({
//   movie_id:{
//     type: String,
//     required: true,
//     unique:[true,"Please mention unique id"]
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   actors: [{ type: String, required: true }],
//   releaseDate: {
//     type: String,
//     required: true,
//   },
//   posterUrl: {
//     type: String,
//     required: true,
//   },
//   //Status
//   featured: {
//     type: Boolean,
//   },
//   bookings: [{
//     user:{type:String},
//     seatnumbers:{type:Array}
//   }],

//   admin: {
//     type: String,
//     required: true,
//   },
// });

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
  //Status
  featured: {
    type: Boolean,
  },

  screen:[
    {
      screen_id:{type:String},
      show:[{
        show_id:{type:String},
        date:{type:Date},
        start_time:{type:String},
        end_time:{type:String},
        price:{type:String},
        bookings:[{
            user_id:{type:String},
            seats:{type:Array}
        }]
    }]
    }
  ],

  admin: {
    type: String,
    required: true,
  },
});

const movieModel=mongoose.model("Movie", movieSchema);

module.exports = movieModel
