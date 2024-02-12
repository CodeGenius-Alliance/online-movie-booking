const asyncHandler = require("express-async-handler");
const movieModel = require("../models/MovieModule");

const addShows = asyncHandler(async (req, res) => {
  //fine
  const { date, show_time, show_id, price, screen_id, movie_id } = req.body;

  try {
    let updatedMovie = await movieModel.updateOne(
      { movie_id: movie_id, "screen.screen_id": screen_id },
      { $push: { "screen.$.show": { show_id, date, show_time, price } } }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let info = await movieModel.findOne({ movie_id: movie_id });

    const screenIndex = info.screen.findIndex(
      (screen) => screen.screen_id === screen_id
    );

    if (screenIndex === -1) {
      return res
        .status(404)
        .json({ message: "Screen not found for the movie" });
    }

    res.status(201).json({ message: "Show has been added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const viewBookings = asyncHandler(async (req, res) => {
  //fine
  const { movie_id, screen_id, show_id } = req.body;
  try {
    const movie = await movieModel.findOne({ movie_id: movie_id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const screen = movie.screen.find(
      (screen) => screen.screen_id === screen_id
    );

    if (!screen) {
      return res
        .status(404)
        .json({ message: "Screen not found for the movie" });
    }

    const show = screen.show.find((show) => show.show_id === show_id);

    if (!show) {
      return res.status(404).json({ message: "Show not found for the screen" });
    }

    const bookings = show.bookings;

    res.status(200).json({ bookings: bookings });
  } catch (e) {
    res.status(500).json(e);
  }
});

//fine
const getShows = async (req, res) => {
  try {
    const movies = await movieModel.aggregate([
      { $unwind: "$screen" },
      { $unwind: "$screen.show" },
      {
        $match: {
          "screen.show.date": { $gte: new Date() } 
        }
      },
      {
        $group: {
          _id: "$_id",
          movie_id: { $first: "$movie_id" },
          title: { $first: "$title" },
          description: { $first: "$description" },
          actors: { $first: "$actors" },
          releaseDate: { $first: "$releaseDate" },
          posterUrl: { $first: "$posterUrl" },
          screen: { $push: "$screen" }
        }
      }
    ]);
    res.status(200).json({ movies: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  
  
};


module.exports = { addShows, getShows,viewBookings };
