const asyncHandler = require("express-async-handler");
const movieModel = require("../models/MovieModule");

const addShows = asyncHandler(async (req, res) => {
  //fine
  const { date, show_time,  price, screen_id, movie_id } = req.body;
  console.log(req.body)
  try {
    let flag=1;
    let info = await movieModel.findOne({ _id: movie_id });
    if(!info.screen ){
      await movieModel.findOneAndUpdate({ _id: movie_id },{
        screen:[]
      });
    }
    let atr=info.screen;
    atr?.map((x=>{
      if(x.screen_id===screen_id){
        flag=0;
      }}
    ))

    if(flag){
      let updatedMovie = await movieModel.updateOne(
        { _id: movie_id},
         { $push: {"screen":{screen_id}} }
      );
    } 
   
    let chk = await movieModel.updateOne(
      { "_id": movie_id, "screen.screen_id": screen_id }, 
      { $push:{"screen.$.show":  {  date, show_time, price } } } 
    );

    if (!chk) {
      return res.status(404).json({ message: "Movie not found" });
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
    const movie = await movieModel.findOne({ _id: _id });

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


const getShowbyMovieId = async (req, res) => {
  try {
    const id=req.params.movieid;
    console.log(id);
    const movies = await movieModel.find({'_id':id},{"screen.show": 1});
    console.log(movies)
    res.status(200).json({ movies: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { addShows, viewBookings ,getShowbyMovieId};
