const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const screenRouter=express.Router();
const {addScreen,getScreen}=require('../controllers/screenControllers')

//screencontrollers
screenRouter.use(validateTokenHanlder)
screenRouter.route('/addScreen').post(addScreen);//Add Screen information
screenRouter.route('/getScreen/:screenid').get(getScreen)

module.exports=screenRouter;