const jwt = require("jsonwebtoken");
const MovieModule = require("../models/MovieModule");

const addMovie = async (req, res, next) => {

  //create new movie
  console.log("add movies")
  const { title, description, release_date, poster_url, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !poster_url &&
    poster_url.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }

  let movie;
  try {
    movie = new MovieModule({
      title,
      description,
      releaseDate:new Date(release_date),
      actors,
      posterUrl:poster_url,
    });
    movie = await movie.save();

  } catch (err) {
    console.log(err)
    res.status(400).send({err})
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed" });
  }
  return res.status(201).json({ movie });
};

const getAllMovies = async(req,res,next)=>{
   let movies;
   
   try{
        movies = await MovieModule.find();
   }catch(err){
         return console.log(err)
   }
   if(!movies){
    return res.status(500).json({message:"Request Failed"})
   }
   return res.status(200).json({movies})
}

const getMovieById = async(req,res,next)=>{
    const id = req.params.id;
    let movie;
    try{
        movie = await MovieModule.findOne({"movie_id":id})
    }catch(err){
        return console.log(err)
    }

    if(!movie){
        return res.status(404).json({message:"Invalid movie ID"})
    }
    return res.status(200).json({movie})
}


module.exports = {addMovie , getAllMovies , getMovieById};
