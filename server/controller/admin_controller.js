//admin controller
//import the schema of admin
const admin_model = require("../database/Admin");

//login constroller
export const admin_login = async () => {
  //some task of login
  try {
    const { email, password } = req.body;
    const check_admin =await admin_model.findOne({
      email: email,
      password: password,
    });
    if (check_admin) {
      //make token and send it to the admin and set cookie so we can use it for authentication
      res.status(200).json({"messege": "login successfull" });
    }
    else{
        res.status(404).json({"messege":"authentication failed"})
    }
  } catch (error) {
    res.status(404).json({"messege":"there is some server error"})
  }
};
