const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    min: 10,
    max: 10,
    required: true,
  },
  email: {
    type: String,
    match: /.+\@.+\..+/,
    required: true,
  },
  subject: {
    type: String,
    min: 3,
    required: true,
  },
  content: {
    type: String,
    min: 3,
    required: true,
  },
});

// wrapper of the Mongoose schema
const ContactUs = mongoose.model("ContactUs", schema);

// joi schema
const joiSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  email: Joi.string().required().email(),
  subject: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = { ContactUs, joiSchema };
