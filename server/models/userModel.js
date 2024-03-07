const mongoose = require("mongoose");
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
  bookedmovie: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      screen: { type: String },
      movie: {
        movie_id: { type: String },
        title: { type: String },
      },
      seats: { type: Array },
      show: {
        show_id: { type: String, sparse: true },
        date: { type: Date },
        show_time: { type: String },
        price: { type: String },
      },
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
