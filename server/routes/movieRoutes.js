const express = require("express");
const {addMovie , getAllMovies,getMovieById} = require("../controllers/movieController")
const adminTokenHandler=require('../middlewares/adminTokenHandler');


const movieRouter = express.Router()
movieRouter.post("/",addMovie)

movieRouter.get("/",getAllMovies )

movieRouter.get("/:id",getMovieById )

module.exports = movieRouter