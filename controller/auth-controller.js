const { PrismaClient } = require("@prisma/client");
const { registerSchema, loginSchema } = require("../validate/auth-validator");
const { customError } = require("../utility/custom-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    // ต้องชื่อ value เท่านั้น ไม่งั้นเป็น undefined
    const { value, error } = registerSchema.validate(req.body);
    // console.log(value);
    if (error) {
      next(error);
    }

    const prisma = new PrismaClient();
    value.password = await bcrypt.hash(value.password, 12); //hash password
    const user = await prisma.user.create({
      data: value,
    });

    // const payload = { userId: user.id };
    // const accessToken = jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET_KEY || qwerty17xsdfg22,
    //   {
    //     expiresIn: process.env.JWT_EXPIRE_DATE
    //   }
    // );

    // console.log(accessToken);
    res.status(201).json({ message: "register success", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      next(error);
    }
    // console.log(value);
    const prisma = new PrismaClient();
    // find email
    const user = await prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });

    // not found user
    if (!user) {
      return next(customError("invalid login"), 400);
    }

    // req.password(req) === user.password(db)
    // warn: ถ้า pass ไม่ได้ bcrypt จะ error
    const isMatchPass = await bcrypt.compare(value.password, user.password);

    if (!isMatchPass) {
      return next(customError("invalid login", 400));
    }

    res.status(200).json({ message: "login success", user });
  } catch (error) {
    next(error);
  }
};
