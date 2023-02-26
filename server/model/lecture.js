const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema
const schema = new mongoose.Schema({
  title: {
    type: String,

    max: 55,
    required: true,
  },
  content: {
    type: String,

    max: 1024,
    required: true,
  },
  imgUrl: {
    type: Object,
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    required: true,
  },
});

// wrapper of the Mongoose schema
const Lecture = mongoose.model("Lecture", schema);

// joi schema
const joiSchema = Joi.object({
  title: Joi.string().max(55).required(),
  content: Joi.string().max(1024).required(),
  imgUrl: Joi.string().required(),
});

module.exports = { Lecture, joiSchema };
