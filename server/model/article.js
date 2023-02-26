
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
const Article = mongoose.model("Article", schema);

// joi schema
const joiSchema = Joi.object({

  title: Joi.string().max(55).required(),
  content: Joi.string().required(),
  imgUrl: Joi.string().required(),
});

module.exports = { Article, joiSchema };