const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema
const schema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["מה קורה ברגע המוות ואחרי", "ספרי השראה", "הגיל השלישי", "ליווי ילדים"],
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
const Reading = mongoose.model("Reading", schema);

// joi schema
const joiSchema = Joi.object({
  category: Joi.string().valid("מה קורה ברגע המוות ואחרי", "ספרי השראה", "הגיל השלישי", "ליווי ילדים").required(),
  imgUrl: Joi.string().required(),
});

module.exports = { Reading, joiSchema };
