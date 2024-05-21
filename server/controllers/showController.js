const asyncHandler = require("express-async-handler");
const movieModel = require("../models/MovieModule");

const addShows = asyncHandler(async (req, res) => {
  //fine
  const { date, screen, show_time, show_id, price, movie_id } = req.body;

  const sc = screen.split(",");
  const screen_id = sc[0];
  const screen_name = sc[1];
  //console.log(sc)
  try {
    let flag = 1;
    let info = await movieModel.findOne({ _id: movie_id });
    let atr = info.screen;
    atr.map((x) => {
      if (x.screen_id == screen_id) {
        flag = 0;
      }
    });

    if (flag) {
      let updatedMovie = await movieModel.updateOne(
        { _id: movie_id },
        { $push: { screen: { screen_id, screen_name } } }
      );
    }

    let my_movie = await movieModel.findOne({ _id: movie_id });

    let my_screen = my_movie.screen.find(
      (screen) => screen.screen_id == screen_id
    );
    let showexist;

    const dateObject = new Date(date);
    const timestampToSearch = dateObject.getDate();
    //console.log(dateObject,"     heheh ")

    if (my_screen)
      showexist = my_screen.show.find((show) => {
        // Convert the show date to timestamp for comparison
        const showTimestamp = new Date(show.date).getDate();
        return showTimestamp === timestampToSearch;
      });

    // let screenexist=await movieModel.findOne( { _id: movie_id ,"screen.screen_id":screen_id})
    // let showexist= screenexist.screen.find((show)=>((show.show_time == show_time ) && (show.date == date)))

    // console.log("   show exist at that time ",showexist,"       ,      ",my_screen)
    if (showexist) {
      return res.status(404).json({
        message: "already have some show please choose another date or time",
      });
    }

    let chk = await movieModel.updateOne(
      { _id: movie_id, "screen.screen_id": screen_id },
      { $push: { "screen.$.show": { date, show_time, price } } }
    );

    if (!chk) {
      return res.status(404).json({ message: "Movie not found" });
    } else return res.status(201).json({ message: "Show has been added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const viewBookings = asyncHandler(async (req, res) => {
  //fine
  const { movie_id, screen_id, show_id } = req.body;
  console.log(req.body);
  try {
    const movie = await movieModel.findOne({ _id: movie_id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const screen = movie.screen.find((screen) => screen.screen_id == screen_id);

    if (!screen) {
      return res
        .status(404)
        .json({ message: "Screen not found for the movie" });
    }

    const show = screen.show.find((show) => show._id == show_id);

    if (!show) {
      return res.status(404).json({ message: "Show not found for the screen" });
    }

    const bookings = show.bookings;

    res
      .status(200)
      .json({ bookings: bookings, message: "sucessfully loaded data" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

const getShowbyMovieId = async (req, res) => {
  try {
    const id = req.params.movieid;
    console.log(id);
    const movies = await movieModel.find({ _id: id }, { "screen.show": 1 });
    console.log(movies);
    res.status(200).json({ movies: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteShow = async (req, res) => {
  const { screen_id, show_id, movie_id } = req.body;

  //console.log(sc)
  try {
    let chk = await movieModel.findOneAndUpdate(
      {
        _id: movie_id,
        "screen.screen_id": screen_id,
        "screen.show._id": show_id,
      },
      {
          "screen.$[screenElem].show.$[showElem].deleted":true,
      },
      {
        arrayFilters: [
          { "screenElem.screen_id": screen_id },
          { "showElem._id": show_id },
        ],
      }
    );
    res.status(200).json({"message":"movie Deteted",movie:movie})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchShow=async(req,res)=>{
  const {movie_id,screen_id,show_id}=req.body;
  try {
    let movie = await movieModel.findOne(
      {
        _id: movie_id,
        "screen.screen_id": screen_id,
        "screen.show._id": show_id,
      })
      const screen = movie.screen.find((screen) => screen.screen_id == screen_id);
      const show = screen.show.find((show) => show._id == show_id);
     // console.log(show)
    res.status(200).json({"message":"fetech successfully",show:show})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const editShow = async (req, res) => {
  const { screen_id, show_id, movie_id,show} = req.body;
  

  //console.log(sc)
  try {
    let chk = await movieModel.findOneAndUpdate(
      {
        _id: movie_id,
        "screen.screen_id": screen_id,
        "screen.show._id": show_id,
      },
      {
          "screen.$[screenElem].show.$[showElem].price":show.price,
      },
      {
        arrayFilters: [
          { "screenElem.screen_id": screen_id },
          { "showElem._id": show_id },
        ],
      }
    );
    const movie= await movieModel.find({ _id: movie_id})
    res.status(200).json({"message":"show edited",movie:movie})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addShows, viewBookings, getShowbyMovieId ,deleteShow,editShow,fetchShow};
