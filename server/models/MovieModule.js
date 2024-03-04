const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
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
    type: Date,
  },
  posterUrl: {
    type: String,
    required: true,
  },

  screen: [
    {
      // row , col --> add
      screen_id: { type: String },
      show: [
        {
          show_id: { type: String, sparse: true },
          date: { type: Date },
          show_time: { type: String },
          price: { type: String },
          bookings: [
            
            {
              _id: mongoose.Schema.Types.ObjectId,
              user_id: { type: String },
              seats: { type: Array },
            },
          ],
        },
      ],
    },
  ],
});
movieSchema.index({ "screen.show.show_id": 1 }, { unique: false });
const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;
