const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const movieRouter = require("./routes/movieRoutes");
const screenRouter = require("./routes/screenRoutes");
const userRouter = require("./routes/userRoutes");
const showRouter = require("./routes/showRoutes");
const cors=require('cors') //cross-origin-resource-sharing for integrating backend/frontend
const port = process.env.port;
connectDb(); //Database connection
app.use(express.json());
app.use(cors())
app.use("/admins/", adminRoutes); //working fine

app.use("/movie", movieRouter);//working fine

app.use("/shows",showRouter);
app.use("/screens", screenRouter);//working fine

app.use("/users", userRouter);
// console.log(adminId)
//server creation
app.listen(port, () => {
  console.log(`Server listening on the port:${port}`);
});
