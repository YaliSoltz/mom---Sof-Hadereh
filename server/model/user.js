const mongoose = require("mongoose");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// mongoose schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    max: 55,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    required: true,
  },
  password: {
    type: String,
    max: 1024,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    required: true,
  },
});

// wrapper of the Mongoose schema
const User = mongoose.model("User", schema);

// func that takes name + role of the user and generate it to token
function generateJWT(name, role) {
  const token = jwt.sign({ name, role }, "sof-hadereh");
  return token;
}

// joi schema
const joiSchema = Joi.object({
  name: Joi.string().max(55).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(55).required(),
  role: Joi.string().valid("admin").required(),
});

module.exports = { User, joiSchema, generateJWT };
