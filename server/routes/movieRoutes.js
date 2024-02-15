const express = require("express");
const {addMovie , getAllMovies,getMovieById} = require("../controllers/movieController")
const validateTokenHandler=require('../middlewares/adminTokenHandler')

const movieRouter = express.Router()

movieRouter.use(validateTokenHandler)
movieRouter.post("/addMovie",addMovie)

movieRouter.get("/getMovies",getAllMovies )

movieRouter.get("/getMovie/:id",getMovieById )

module.exports = movieRouter