const jwt = require("jsonwebtoken");

// authentication function for user token
module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token"); // define the token from the request
  console.log(token);

  // check if token has sent
  if (!token) return res.status("401").send("access denide no token provied");

  // check if the token is valid
  try {
    req.user = jwt.verify(token, "sof-hadereh");
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
