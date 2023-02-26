const { Router } = require("express");
const bcrypt = require("bcrypt");
const { joiSchema } = require("../model/login");
const { User, generateJWT } = require("../model/user");
const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  // check if user exist
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("invalid email or password");

  // check if password is correct
  const decode = await bcrypt.compare(password, user.password);
  if (!decode) return res.status(400).send("invalid email or password");

  const { name, role } = user;
  const token = generateJWT(name, role); // gnerate the token with name and role of the user
  res.status(200).send(token);
});

module.exports = router;
