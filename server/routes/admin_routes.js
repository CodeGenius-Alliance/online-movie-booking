const express=require("express");
const route= express.Router();
const admin_controller=require('../controller/admin_controller')

route.post('/login',admin_controller.admin_login)

module.exports=route;