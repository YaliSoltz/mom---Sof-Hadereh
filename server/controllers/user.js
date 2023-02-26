const { User, joiSchema } = require("../model/user");
const bcrypt = require("bcrypt");

// get all the users
const getAllUsers = async (req, res) => {
  const user = await User.find();
  res.status(200).send(user);
};
// add new user
const addNewUser = async (req, res) => {
  const body = req.body;
  let { name, email, password, role } = body;

  //joi validation
  const { error } = joiSchema.validate(body);
  if (error) return res.status(400).send(error.message);

  const salt = await bcrypt.genSalt(10); // generate the salt
  password = await bcrypt.hash(password, salt); // change the password to hashing password

  // define the new user
  let user = new User({
    name,
    email,
    password,
    role,
  });

  // add the user to database
  try {
    user = await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete user by id
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(201).send("deleted");
  } catch (error) {
   res.status(400).send(error.message)
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  deleteUser,
};
