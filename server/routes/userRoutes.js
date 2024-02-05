const express = require("express");
// const validateTokenHanlder = require("../middlewares/adminTokenHandler");
const userRouter = express.Router();
const {
  getOneMovie,
  bookMovie,
  getBookedMovie,
  cancelticket,
  login,
  signup,
  getAllMovies,
} = require("../controllers/userController");

userRouter.route("/login").get(login);
userRouter.post("/signup", signup);

module.exports = userRouter;
