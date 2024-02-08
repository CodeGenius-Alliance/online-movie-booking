const jwtToken = require("jsonwebtoken");

const validateTokenHanlder = (req, res, next) => {
  try {
    let token;
    let authHeader = req.header.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      jwtToken.verify(token, process.env.ACCESS_TOKEN_USER, (err, decode) => {
        if (err)
          res
            .status(400)
            .send("User is not Authorized OR Token is already Expired");
        req.user = decode.user;
        next();
      });

      if (!token) res.status(400).send("Token Not passed");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = validateTokenHanlder;
