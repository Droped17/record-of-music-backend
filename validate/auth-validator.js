const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email : Joi.string().email().required(),
    password: Joi.string().trim().pattern(/^[a-zA-Z0-9]{6,30}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).trim().strip().required(), //strip() คือการตัดออก ไม่ให้ value เอาไปใช้งาน
    mobile: Joi.string().trim().required(),
    profileImage: '',
    isAdmin: '',
    addressId: ''
})

exports.registerSchema = registerSchema;


const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password: Joi.string().trim().pattern(/^[a-zA-Z0-9]{6,30}$/).required(),
})

exports.loginSchema = loginSchema;