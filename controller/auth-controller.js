const {PrismaClient} = require('@prisma/client');

exports.register = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        profileImage: "",
      },
    });

    console.log(req.body);
    res.status(201).json({message: 'register success',user});
    
  } catch (error) {
    next(error);
  }
};
