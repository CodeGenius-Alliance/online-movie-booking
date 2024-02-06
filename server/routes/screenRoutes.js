const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const screenRouter=express.Router();
const {addScreen}=require('../controllers/screenControllers')

//screencontrollers
screenRouter.route('/addScreen').post(addScreen);//Add Screen information

module.exports=screenRouter;