
import User from "../models/userModel";
import bcrypt from "bcryptjs";
const MovieModule = require("../models/MovieModule");
const { default: userModel } = require("../models/userModel");



// User Registration

export const singup = async (res, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  )
    return res.status(422).json({ message: "Invalid Input" });

  const hashPassword = bcrypt.hashSync(password);

  let user;

  try {
    user = new User({ name, email, password: hashPassword });
    user = await user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res
      .status(500)
      .json({ message: "Error Ocurred at user registration" });
  }
  return res.status(201).json({ id: user._id });
};

// Login user

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "")
    return res.status(422).json({ message: "Invalid Input" });
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ message: "Login Successfull", id: existingUser._id });
};



//get one movie
const getOneMovie = async (req, res) => {
  try {
    const movie_id = req.body._id;
    const Movie = await MovieModule.findById(movie_id);
    res.status(200).json({ movie: Movie, messege: "movie fetch successfully" });
  } catch (error) {
    res.status(404).json({ messege: "server errorn occur" });
  }
};

//book a movie

const bookMovie = async (req, res) => {
  try {
    const {movie_id,moviedetail,seats}= req.body;
    const Movie = await MovieModule.findById(movie_id);

    if(user && Movie)
    {
        await userModel.findByIdAndUpdate(req.user._id,{bookedmovie:{$set:{movie_id:movie_id,seats:seats}}})
        await MovieModule.findByIdAndUpdate(movie_id,{booking:{$set:{seatnumbers:seats,user:req.user._id}}})
        res.status(201).json({"messege":"your movieticket has been booked"})
    }
    else{
        res.staus(404).json({"messege":"user or movie not exist "})
    }
    
  } catch (error) {}
};

//cancel movie
const cancelticket=async(req,res)=>{
    const {movie_id}= req.body;
    const Movie = await MovieModule.findById(movie_id);
    try {
        await userModel.findByIdAndUpdate(req.user._id,{bookedmovie:
            {$unset:{$eq:{movie_id:movie_id}}}

        })
        await MovieModule.findByIdAndUpdate(movie_id,{booking:{$unset:{$eq:{user:req.user._id}}}})
    } catch (error) {
        res.json({"messege":"some error occur"})
    }
}

//get booked movies
const getBookedMovie=async (req,res)=>{
    try {
        const moviesbooked=userModel.findById(req.user._id)
        res.status(200).json({"bookedmovies":moviesbooked.bookedmovie})
    } catch (error) {
        res.status(404).json({"bookedmovies":"server error"})
    }
}

module.exports = {getOneMovie,bookMovie,cancelticket,getBookedMovie};

