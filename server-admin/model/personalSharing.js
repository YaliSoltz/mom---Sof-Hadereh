const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    max: 55,
    required: true,
  },

  age: {
    type: Number,
    min: 1,
    required: true,
  },

  status: {
    type: String,
    enum: ["נשוי/נשואה", "רווק/ה", "גרוש/ה", "אלמן/ה", "ערירי/ת"],
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
});

// wrapper of the Mongoose schema
const PersonalSharing = mongoose.model("PersonalSharing", schema);

// joi schema
const joiSchema = Joi.object({
  name: Joi.string().max(55),
  age: Joi.number().min(1).required(),
  status: Joi.string()
    .valid("נשוי/נשואה", "רווק/ה", "גרוש/ה", "אלמן/ה", "ערירי/ת")
    .required(),
  content: Joi.string().required(),
});

module.exports = { PersonalSharing, joiSchema };
