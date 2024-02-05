const express = require("express");
const validateTokenHanlder = require("../middlewares/adminTokenHandler");
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

userRouter.route("/getOneMovie").get(getOneMovie);
userRouter.route("/login").get(login);

userRouter.post("/signup", signup);
// userRouter.use(validateTokenHanlder);
//apply middleware of user to authenticate user and set user in req.user

userRouter.route("/bookMovie").post(bookMovie);
userRouter.route("/getBookedMovie").get(getBookedMovie);
userRouter.route("/cancelTickets").post(cancelticket);
userRouter.route("/getAllMovies").get(getAllMovies);

module.exports = userRouter;
