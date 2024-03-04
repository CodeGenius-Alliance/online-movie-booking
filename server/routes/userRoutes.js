const express = require("express");
const validateTokenHanlder = require("../middlewares/userTokenHandler");
const userRouter = express.Router();
const {
  getOneMovie,
  bookMovie,
  getBookedMovie,
  cancelticket,
  login,
  signup,
  getAllMovies,
  getSeats,
  bookMovieDetail
} = require("../controllers/userController");

userRouter.post("/signup", signup);
userRouter.route("/login").post(login);

userRouter.route("/getOneMovie").get(getOneMovie);
userRouter.route("/getAllMovies").get(getAllMovies);
userRouter.route("/bookMovieDetail").get(bookMovieDetail)

//MiddleWare --> verify user
userRouter.use(validateTokenHanlder);
userRouter.route('/getseats/:movie_id/:screen_id/:show_id').get(getSeats)

userRouter.route("/bookMovie").post(bookMovie);
userRouter.route("/cancelTickets").post(cancelticket);
userRouter.route("/getBookedMovie").get(getBookedMovie);


module.exports = userRouter;
 