const express=require("express")
const app=express();


//import cors module so we can get data from the frontend
const cors=require('cors');
app.use(cors());

//use json format to sent data in json
app.use(express.json())

//import cookie-parcer(step1 to install it using npm i cookie-parser)
var cookieParser = require('cookie-parser')
app.use(cookieParser())



app.listen('3000',()=>{console.log(`website backend is running in http://localhost:3000`)})