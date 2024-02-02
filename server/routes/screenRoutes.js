const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const screenRouter=express.Router();

screenRouter.use(validateTokenHanlder);
screenRouter.route('/addScreen').post(addScreen);
screenRouter.route('/getScreen').get(getScreen);
screenRouter.route('/editScreen').put(editScreen);
screenRouter.route('/removeScreen').put(removeScreen);

module.exports=screenRouter;