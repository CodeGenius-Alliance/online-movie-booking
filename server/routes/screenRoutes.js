const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const screenRouter=express.Router();
const {addScreen,getScreen,getAllScreens}=require('../controllers/screenControllers')

// //screencontrollers
screenRouter.use(validateTokenHanlder)
screenRouter.route('/addScreen').post(addScreen);//Add Screen information
screenRouter.route('/getScreen/:screenid').get(getScreen)
screenRouter.route('/allscreens').get(getAllScreens)

module.exports=screenRouter;