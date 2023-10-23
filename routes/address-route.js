const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");

router.post("/", async (req, res, next) => {
  try {
    const { province, district, subdistrict, zipcode } = req.body;
    const address = await prisma.address.create({
      data: {
        province: province,
        district: district,
        subdistrict: subdistrict,
        zipcode: zipcode,
      },
    });
    res.status(200).json({ msg: "success", address });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
