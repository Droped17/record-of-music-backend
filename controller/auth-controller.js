const { PrismaClient } = require("@prisma/client");
const { registerSchema, loginSchema } = require("../validate/auth-validator");
const bcrypt = require('bcryptjs');
const { customError } = require("../utility/custom-error");

exports.register = async (req, res, next) => {
  try {
    // ต้องชื่อ value เท่านั้น ไม่งั้นเป็น undefined
    const { value,error } = registerSchema.validate(req.body); 
    // console.log(value);
    if (error) {
        next(error);
    }

    const prisma = new PrismaClient();
    value.password = await bcrypt.hash(value.password,12) //hash password
    const user = await prisma.user.create({
      data: value,
    });

    res.status(201).json({ message: "register success" ,user});
  } catch (error) {
    next(error);
  }
};

exports.login = async (req,res,next) => {
    try {
    const {value,error} = loginSchema.validate(req.body);
    if (error) {
        next(error);
    }    
    // console.log(value);
    const prisma = new PrismaClient();
    // find email
    const user = await prisma.user.findFirst({
        where: {
            email: value.email,
        }
    });
    // not found user
    if (!user) {
        return next(customError('invalid login'),400);
    }

    res.status(200).json({message: "login success",user});
    } catch (error) {
        next(error);
    }
}
