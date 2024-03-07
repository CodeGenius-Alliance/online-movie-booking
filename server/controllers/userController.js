const bcrypt = require("bcrypt");
const MovieModule = require("../models/MovieModule");
const userModel = require("../models/userModel");
const jwtToken = require("jsonwebtoken");
const screenModel = require("../models/screenModel");

//get all the movies  -- working
const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModule.screen.show.find({
      date: { $gte: new Date() },
    });
    console.log(new Date());
    res.status(200).json({ movies: movies });
  } catch (error) {}
};

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

// Login user -> working

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //console.log(req.body)
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
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
      id: existingUser.email,
    },
    process.env.ACCESS_TOKEN_USER,
    {
      expiresIn: "40m",
    }
  );
  //set the cookies in response
  res.status(200).cookie("token", accessToken, {
    expires: new Date(Date.now() + 6000000),
  });

  return res
    .status(200)
    .json({
      message: "Login Successfull",
      user: existingUser,
      id: existingUser._id,
      token: accessToken,
    });
};

//get one movie -- working
const getOneMovie = async (req, res) => {
  try {
    //displaying shows with date> (in future)
    const movie_id = req.body.movie_id;
    console.log(req);
    const Movie = await MovieModule.findOne({ _id: movie_id });
    // console.log("Movie",Movie)
    res.status(200).json({ movie: Movie, messege: "movie fetch successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ messege: "server error occur" });
  }
};

//get all the seats for a show
const getSeats = async (req, res) => {
  const { movie_id, screen_id, show_id } = req.params;
  console.log("here ", movie_id, " screen ", screen_id, " show ", show_id);
  try {
    const movie = await MovieModule.findOne({ _id: movie_id });
    const screen = await movie.screen.find(
      (screen) => screen.screen_id === screen_id
    );
    // console.log("screen ",screen)
    if (!screen) {
      res.status(404).json({ messege: "out of date" });
    }
    const show = screen.show.find((show) => show._id == show_id);
    //console.log("show ",show)
    res.status(200).json({ messege: "show ready", show: show });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};
//book a movie -- working
const bookMovie = async (req, res) => {
  try {
    const { movie_id, screen_id, show_id, seats } = req.body;
    console.log(req.body);
    if (!seats) {
      return res.status(400).send("No seats booked");
    }
    const user_id = req.id;
    console.log(user_id);
    const fmovie = await MovieModule.findOne({ _id: movie_id });
    const screen = await fmovie.screen.find(
      (screen) => screen.screen_id === screen_id
    );
    // console.log("screen ",screen)
    if (!screen) {
      res.status(404).json({ messege: "out of date" });
    }
    const show = screen.show.find((show) => show._id == show_id);

    const user = await userModel.updateOne(
      { email: user_id },
      {
        $push: {
          bookedmovie: {
            movie_id: movie_id,
            seats: seats,
            screen_id: screen_id,
            show_id: show_id,
          },
        },
      }
    );

    // Update the movie document to add the booking
    const movie = await MovieModule.updateOne(
      {
        _id: movie_id,
        "screen.screen_id": screen_id,
        "screen.show._id": show_id,
      },
      {
        $push: {
          "screen.$[screenElem].show.$[showElem].bookings": {
            user_id: user_id,
            seats: seats,
          },
        },
      },
      {
        arrayFilters: [
          { "screenElem.screen_id": screen_id },
          { "showElem._id": show_id },
        ],
      }
    );

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
  const { movie_id } = req.body;
  const user_id = req.id;
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
    const user_id = req.id;

    const moviesbooked = await userModel.find({ email: user_id });
    const ans = moviesbooked[0].bookedmovie;
    res.status(200).json({ bookedmovies: ans });
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
  getSeats,
};
