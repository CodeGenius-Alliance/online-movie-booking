const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const showRouter=express.Router();
const {addShows,viewBookings,getShowbyMovieId, deleteShow,editShow,fetchShow}=require('../controllers/showController')

showRouter.route("/getShowbyMovieId/:movieid").get(getShowbyMovieId);//Get show information movie id



showRouter.use(validateTokenHanlder);

//showcontrollers

showRouter.route('/addShow').post(addShows)//Add show information
showRouter.route('/viewBookings').post(viewBookings);//View Bookings in a show
showRouter.route('/deleteShow').post( deleteShow)
showRouter.route('/editShow').post( editShow)
showRouter.route('/fetchShow').post( fetchShow)


module.exports=showRouter;