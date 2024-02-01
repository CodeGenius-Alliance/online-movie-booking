const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const connectDb=require('./config/db');
const adminRoutes=require('./routes/adminRoutes');
const movieRouter = require('./routes/movieRoutes');

const port=process.env.port
connectDb(); //Database connection
app.use(express.json());

app.use('/admins/',adminRoutes)
app.use("/movie", movieRouter )

// console.log(adminId)
//server creation
app.listen(port,()=>{
    console.log(`Server listening on the port:${port}`);
}) 
