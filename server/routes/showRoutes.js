const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const showRouter=express.Router();
const {addShows,getShows,getShow,viewTicket}=require('../controllers/showController')

showRouter.use(validateTokenHanlder);

//showcontrollers
showRouter.route('/addShow').post(addShows)//Add show information
showRouter.route('/getShows').get(getShows)//Get all shows information
showRouter.route('/getShow').get(getShow);//Get show information
showRouter.route('/viewTickets').get(viewTicket); //View Bookings in a show

module.exports=showRouter;