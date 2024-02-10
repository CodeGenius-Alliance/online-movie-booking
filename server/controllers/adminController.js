const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const screenModel = require("../models/screenModel");
const movieModel = require("../models/MovieModule");


//admin login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res.status(200).send("Admin id not found");
    } else if (existingAdmin.password == password) {
      
      const accessToken = jwt.sign(
        {
          id: existingAdmin._id,
        },
        process.env.ACCESS_TOKEN_ADMIN,
        { expiresIn: "40m" }
      );
      return res
        .status(200)
        .send({
          message: "Authentication completed",
          accessToken,
          id: existingAdmin._id,
        });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
  }
});

//add a new screen -- frontend form ready
const add_screen=async(req,res)=>{
  const {screen_name,seats}=req.body;
  try {
    const new_screen=await screenModel.create({screen_name,seats});
    res.status(201).json({message:"screen is added",screen:new_screen})
  } catch (error) {
    console.log(error)
    res.status(404).json({message:"some error occur"})
  }
}

//delete a screen
const delete_screen=async(req,res)=>{
  try {
    screenModel.findByIdAndDelete(req.body._id)
    res.status(200).json({"messege":"screen has been deleted"})
  } catch (error) {
    console.log(error)
    res.json({message:"error occur at server"})
  }
}

//edit screen
const edit_screen=async(req,res)=>{
  const {screen_id,screen_name,seats}=req.body;
  try {
    screenModel.findByIdAndUpdate(screen_id,{screen_name,seats})
    res.status(200).json({"messege":"screen has been updated"})
  } catch (error) {
    console.log(error)
    res.json({message:"error occur at server"})
  }
}

//addshow -- frontend form ready
const add_show=async(req,res)=>{
  const {date,
  start_time,
  end_time,
  price,screen_id,movie_id}=req.body;

  try {
    //alot screen to movie
    await movieModel.findByIdAndUpdate(movie_id,{
      screen_id:screen_id,
    })
    //push show data to that screen
    await movieModel.findAndUpdate({_id:movie_id,screen:{screen_id:{$eq:screen_id}}},{
      $push:{show:{date,start_time,end_time,price}}
    })
    res.status(201).json({"messege":"show has been added"})
  } catch (error) {
    res.status(404).json({"messege":"error occured"})
  }
}
//deleteshow
const delete_show=async(req,res)=>{
  const {show_id,screen_id,movie_id}=req.body;

  try {
    const new_show=await movieModel.findAndUpdate({_id:movie_id,screen:{screen_id:{$eq:screen_id}}},{
      $pull:{show:{_id:{$eq:show_id}}}
    })
    res.status(201).json({"messege":"show has been added"})
  } catch (error) {
    res.status(404).json({"messege":"error occured"})
  }
}
//editshow
const edit_show=async(req,res)=>{
  const {show_id,screen_id,movie_id,start_time,end_time,date}=req.body;

  try {
    const new_show=await movieModel.findAndUpdate({_id:movie_id,screen:{screen_id:{$eq:screen_id}}},{
      $pull:{show:{_id:{$eq:show_id}}}
    })
    res.status(201).json({"messege":"show has been added"})
  } catch (error) {
    res.status(404).json({"messege":"error occured"})
  }
}


//addmovie -- forntend form ready
const add_movie=async(req,res)=>{
  const {movie_id,
    title,
    description,
    releaseDate,
    featured,
    actors,
    posterUrl}= req.body;
    let admin= req.admin._id
  try {
    movie = new movieModel({
      movie_id,
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin,
      posterUrl,
    });
    movie = await movie.save();
    res.status(200).json({"messege":"movie has been created",movie:movie})
  } catch (err) {
    res.status(400).send({err})
  }

}
//deletemovie
const delete_movie=async(req,res)=>{
  try {
    const {movie_id}=req.body
    await movieModel.findByIdAndDelete(movie_id)
    res.status(200).json({"messege":"movie has been deleted"})
  } catch (err) {
    res.status(400).send({err})
  }

}
//editmovie


//getBookings


module.exports = { login };
