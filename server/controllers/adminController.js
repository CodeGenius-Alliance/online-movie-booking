const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");


//admin login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res.status(200).send("Admin id not found");
    } else if (existingAdmin.password == password) {
      
      const accessToken = jwt.sign(
        {
          id: existingAdmin.email,
        },
        process.env.ACCESS_TOKEN_ADMIN,
        { expiresIn: "40m" }
      );

      res.status(200).cookie("token", accessToken, {
        expires: new Date(Date.now() + 6000000),
      });
    
      return res
        
        .json({
          message: "Authentication completed",
          accessToken,
          id: existingAdmin._id,
          admin:existingAdmin
        });
      
    } else {
      
      res.status(400).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e)
    console.log(e);
  }
});



module.exports = { login };
