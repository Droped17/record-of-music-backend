const { customError } = require("../utility/custom-error");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(customError("unauthenticated", 401));
    }
    const token = authorization.split(" ")[1];
    const payload =
      jwt.verify(token, process.env.JWT_SECRET_KEY) || "asdvcddfs";

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      return next(customError("unauthenticated", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      error.statusCode = 401; 
    }
    next(error);
  }
};
