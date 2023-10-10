const { PrismaClient } = require("@prisma/client");
const { registerSchema } = require("../validate/auth-validator");
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
  try {
    // ต้องชื่อ value เท่านั้น ไม่งั้นเป็น undefined
    const { value,error } = registerSchema.validate(req.body); 
    if (error) {
        next(error);
    }
    // console.log(value);

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
