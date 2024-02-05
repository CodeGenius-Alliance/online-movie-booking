const bcrypt = require("bcrypt");
const MovieModule = require("../models/MovieModule");
const userModel = require("../models/userModel");
const jwtToken = require("jsonwebtoken");

// User Registration -- working

const signup = async (req, res) => {
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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  let user;

  try {
    user = new userModel({ name, email, password: hashPassword });
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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "")
    return res.status(422).json({ message: "Invalid Input" });
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID" });
  }
  const salt = await bcrypt.genSalt(10);
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingUser.password,
    salt
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  // Access Token Creation --> jwtToken --> sign(obj[data of encryption] , encryption key , {expires of that token})

  const accessToken = jwtToken.sign(
    {
      id: existingUser._id,
    },
    process.env.ACCESS_TOKEN_USER,
    {
      expiresIn: "40m",
    }
  );

  return res
    .status(200)
    .json({ message: "Login Successfull", id: existingUser._id, accessToken });
};

//get all the movies  -- working
const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModule.find();
    res.status(200).json({ movies: movies });
  } catch (error) {}
};

//get one movie -- working
const getOneMovie = async (req, res) => {
  try {
    const movie_id = req.body._id;
    const Movie = await MovieModule.findById(movie_id);
    res.status(200).json({ movie: Movie, messege: "movie fetch successfully" });
  } catch (error) {
    res.status(404).json({ messege: "server errorn occur" });
  }
};

//book a movie -- working
const bookMovie = async (req, res) => {
  try {
    const { movie_id, seats, user_id } = req.body;
    const Movie = await MovieModule.findById(movie_id);

    console.log(req.body);

    const user = await userModel.findByIdAndUpdate(user_id, {
      $push: { bookedmovie: { movie_id: movie_id, seats: seats } },
    });

    const movie = await MovieModule.findByIdAndUpdate(movie_id, {
      $push: { bookings: { user: user_id, seatnumbers: seats } },
    });
    res.status(200).json({
      messege: "your movieticket has been booked",
      user: user,
      movie: movie,
    });
  } catch (error) {
    console.log(error);
  }
};

//cancel movie -- working
const cancelticket = async (req, res) => {
  const { movie_id, user_id } = req.body;

  try {
    let user = await userModel.findByIdAndUpdate(user_id, {
      $pull: { bookedmovie: { movie_id: { $eq: movie_id } } },
    });
    let movie = await MovieModule.findByIdAndUpdate(movie_id, {
      $pull: { bookings: { user: { $eq: user_id } } },
    });
    res.json({ user: user, movie: movie });
  } catch (error) {
    console.log(error);
    res.json({ messege: error });
  }
};

//get booked movies  -- working
const getBookedMovie = async (req, res) => {
  try {
    const moviesbooked = userModel.findById(req.user._id);
    res.status(200).json({ bookedmovies: moviesbooked.bookedmovie });
  } catch (error) {
    res.status(404).json({ bookedmovies: "server error" });
  }
};

module.exports = {
  getOneMovie,
  bookMovie,
  cancelticket,
  getBookedMovie,
  login,
  signup,
  getAllMovies,
};
