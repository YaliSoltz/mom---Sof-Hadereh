const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema
const schema = new mongoose.Schema({
  content: {
    type: String,
    max: 1024,
    required: true,
  },
});

// wrapper of the Mongoose schema
const Sentence = mongoose.model("Sentence", schema);

// joi schema
const joiSchema = Joi.object({
  content: Joi.string().max(1024).required(),
});

module.exports = { Sentence, joiSchema };
