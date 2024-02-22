const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const movieRouter = require("./routes/movieRoutes");
const screenRouter = require("./routes/screenRoutes");
const userRouter = require("./routes/userRoutes");
const showRouter = require("./routes/showRoutes");

const cors=require('cors')

 //cross-origin-resource-sharing for integrating backend/frontend
const port = process.env.port;
connectDb(); //Database connection
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use("/admins", adminRoutes); //working fine
app.use("/movies", movieRouter);//working fine
app.use("/shows",showRouter);
app.use("/screens", screenRouter);//working fine
app.use("/users", userRouter);
// console.log(adminId)
//server creation
app.listen(port, () => {
  console.log(`Server listening on the port:${port}`);
});
