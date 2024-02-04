const express=require('express');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');
const userRouter=express.Router();
const {getOneMovie,bookMovie,getBookedMovie,cancelticket}=require('../controllers/userController')

userRouter.route('/getOneMovie').get(getOneMovie)
// userRouter.use(validateTokenHanlder);
//apply middleware of user to authenticate user and set user in req.user

userRouter.route('/bookMovie').post(bookMovie);
userRouter.route('/getBookedMovie').get(getBookedMovie);
userRouter.route('/cancelTickets').put(cancelticket);

module.exports=userRouter;