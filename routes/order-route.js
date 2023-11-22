const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");
const { upload } = require("../utility/cloudinary-service");
const fs = require("fs/promises");
const uploadMiddleware = require("../middlewares/upload");

router.get("/cart/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const result = await prisma.order.findMany({
      where: {
        userId: Number(orderId),
      },
      include: {
        rec: true,
      },
    });
    res.status(200).json({ msg: "success", result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, amount, recId, price } = req.body;

    const data = {
      userId: userId,
      amount: amount,
      recId: recId,
      totalCost: price,
    };

    console.log(`ID===:`, data);

    // Create the recordOrder with the related Record
    const result = await prisma.order.create({
      data: data,
    });

    res.status(200).json({ msg: "success" });
  } catch (error) {
    next(error);
  }
});

router.post("/createPayment", async (req, res, next) => {
  try {
    const results = req.body.map(async (el) => {
      const { userId, totalCost, recId } = el;

      const createdRecordOrderPending = await prisma.recordOrderPending.create({
        data: {
          userId: userId,
          price: totalCost,
          orderId: recId,
        },
      });
    });

    res.status(200).json({ msg: "success", results });
  } catch (error) {
    console.error("Error processing payments:", error);
    next(error);
  }
});

router.get("/payment/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prisma.recordOrderPending.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        order: {
          include: {
            rec: true,
          },
        },
        user: true,
      },
    });

    res.status(200).json({ msg: "success", result });
  } catch (error) {
    next(error);
  }
});

router.get("/all-payment", async (req, res, next) => {
  try {
    const result = await prisma.recordOrderPending.findMany({
      include: {
        order: {
          include: {
            rec: true,
          },
        },
        user: true,
      },
    });
    console.log(result);

    res.status(200).json({ msg: "get all-payment success", result });
  } catch (error) {
    console.log(error);
  }
});

router.patch(
  "/uploadImage",
  uploadMiddleware.single("image"),
  async (req, res, next) => {
    const { file, userId } = req.body;

    console.log(`UserID====>`,userId)
    const data = {
      slipImage: file
    }

    if (!req.file) {
      console.log("err");
    }

    if (req.file) {
      data.slipImage = await upload(req.file.path);
    }
    try {
      const result = await prisma.recordOrderPending.updateMany({
        where: {
          userId: Number(userId),
        },
        data: data
      });
      res.status(200).json({msg:"success",result});
    } catch (error) {
      next(error);
    } finally {
      if (fs.file) {
        fs.unlink(req.file.path);
      }
    }
  }
);


module.exports = router;
