const jwt = require("jsonwebtoken");
const validateTokenHanlder = (req, res, next) => {
  try {
    //str="123 nfuirf uiewh" str.split(" ") [Bearer, token$%^&*jhghhhgfhjbgfyyhy == user.id, uiewh]
    let token;
    let authHeader = req.cookies.token || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN, (err, decode) => {
        if (err) {
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
  } catch (e) {
    console.log(e);
  }
};

module.exports = validateTokenHanlder;
