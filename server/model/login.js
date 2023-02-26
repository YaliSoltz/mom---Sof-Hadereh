const Joi = require("joi");

// joi schema
const joiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(55).required(),
});

module.exports = { joiSchema };
