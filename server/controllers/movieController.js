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
  
    movie=await MovieModule.create({
      title,
      description,
      releaseDate:new Date(release_date),
      actors,
      posterUrl:poster_url,
      screen: []
      });
     
  } catch (err) {
    console.log("error hai",err)
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed" });
  }
  return res.status(201).json({ movie:movie });
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
    console.log(req.params.id)
    let movie;
    try{
        movie = await MovieModule.findOne({"_id":id})
    }catch(err){
        return console.log(err)
    }

    if(!movie){
        return res.status(404).json({message:"Invalid movie ID"})
    }
    return res.status(200).json({movie})
}

const deleteMovie= async(req,res,next)=>{
 const {movie_id}=req.body;
  try{
      movie = await MovieModule.findOneAndDelete({"_id":movie_id})
      res.status(200).json({"message":"movie has been deleted"})
  }catch(err){
      return console.log(err)
  }

}
module.exports = {addMovie , getAllMovies , getMovieById,deleteMovie};
