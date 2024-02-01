const express=require('express');
const router=express.Router();
const {login}=require('../controllers/adminController');
const validateTokenHanlder = require('../middlewares/validateTokenHandler');

router.route('/login').post(login);

router.use(validateTokenHanlder);//validating Token


module.exports=router