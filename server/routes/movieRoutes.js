const express = require("express");
const {addMovie , getAllMovies,getMovieById} = require("../controllers/movieController")


const movieRouter = express.Router()

movieRouter.post("/addMovie",addMovie)

movieRouter.get("/getMovies",getAllMovies )

movieRouter.get("/getMovie/:id",getMovieById )

module.exports = movieRouter