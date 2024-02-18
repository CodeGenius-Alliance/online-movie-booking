const express = require("express");
const {addMovie , getAllMovies,getMovieById} = require("../controllers/movieController")
const validateTokenHandler=require('../middlewares/adminTokenHandler')

const movieRouter = express.Router()
movieRouter.get("/getMovies",getAllMovies )
movieRouter.get("/getMovie/:id",getMovieById )
movieRouter.use(validateTokenHandler)
movieRouter.post("/addMovie",addMovie)





module.exports = movieRouter