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
  //Status
  featured: {
    type: Boolean,
  },
  bookings: [{ type: String }],

  admin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
