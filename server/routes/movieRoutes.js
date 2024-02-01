const express = require("express");
const {addMovie , getAllMovies,getMovieById} = require("../controllers/movieController")



const movieRouter = express.Router()

movieRouter.post("/",addMovie)

movieRouter.get("/",getAllMovies )

movieRouter.get("/:id",getMovieById )

module.exports = movieRouter