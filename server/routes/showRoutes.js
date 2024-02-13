const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const showRouter=express.Router();
const {addShows,viewBookings,getShows}=require('../controllers/showController')

showRouter.route("/getShows").get(getShows);//Get show information

showRouter.use(validateTokenHanlder);

//showcontrollers

showRouter.route('/addShow').post(addShows)//Add show information
showRouter.route('/viewBookings').get(viewBookings); //View Bookings in a show


module.exports=showRouter;