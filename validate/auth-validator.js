const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email : Joi.string().email().required(),
    password: Joi.string().trim().pattern(/^[a-zA-Z0-9]{6,30}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
    mobile: Joi.string().trim().required(),
})

exports.registerSchema = registerSchema;

