const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema
const schema = new mongoose.Schema({
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
const Bio = mongoose.model("Bio", schema);

// joi schema
const joiSchema = Joi.object({
  content: Joi.string().max(1024).required(),
  imgUrl: Joi.string().required(),
});
module.exports = { Bio, joiSchema };
