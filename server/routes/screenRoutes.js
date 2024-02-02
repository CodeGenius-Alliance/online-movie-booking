const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const screenRouter=express.Router();
const {addScreen,getScreen,editScreen,removeScreen}=require('../controllers/screenControllers')

screenRouter.use(validateTokenHanlder);
screenRouter.route('/addScreen').post(addScreen);
screenRouter.route('/getScreen').get(getScreen);
screenRouter.route('/editScreen').put(editScreen);
screenRouter.route('/removeScreen').put(removeScreen);

module.exports=screenRouter;