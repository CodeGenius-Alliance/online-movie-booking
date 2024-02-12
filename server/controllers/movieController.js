const jwt = require("jsonwebtoken");
const MovieModule = require("../models/MovieModule");

const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let adminId;

  //verify token
  jwt.verify(
    extractedToken, 
    process.env.ACCESS_TOKEN_ADMIN,
    (err, decrypted) => {
      if (err) {
        return res.status(400).json({ message: `${err.message}` });
      } else {
        adminId = decrypted.id;
        return;
      }
    }
  );

  //create new movie
  const { movie_id,title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }

  let movie;
  try {
    movie = new MovieModule({
      movie_id,
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
    });
    movie = await movie.save();
  } catch (err) {
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
