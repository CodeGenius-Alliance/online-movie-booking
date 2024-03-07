const jwt = require("jsonwebtoken");

const validateTokenHanlder = (req, res, next) => {
  try {
    let token;
    let authHeader = req.cookies.token||req.headers.authorization;
    
    if (authHeader ) {
      token = authHeader
      jwt.verify(authHeader, process.env.ACCESS_TOKEN_USER, (err, decode) => {
        if (err) {
         // console.log(err)
          return res.status(400).send("Admin is not authorized");
        }
        req.id = decode.id;

        next();
      });
      if (!token) {
        res.status(400).send("Token is not available");
      }
    }
    else res.status(400).send("Token is not available");
  } catch (err) {
    console.log(err);
  }
};

module.exports = validateTokenHanlder;
