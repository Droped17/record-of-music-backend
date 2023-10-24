const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");
const { upload } = require("../utility/cloudinary-service");
const fs = require("fs/promises");
const uploadMiddleware = require("../middlewares/upload");

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    const { userId, amount, date } = req.body;

    console.log(userId);
    console.log(date);

    for (const element of amount) {
      console.log(element);

      const createOrder = await prisma.order.create({
        data: {
          userId: userId,
          createAt: date,
          totalCost: element.quantity,
          recId: element.id,
          paymentStatus: "pending",
        },
      });

      return createOrder;
    }

    res.status(200).json({ msg: "success", createOrder });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/createPayment",
  uploadMiddleware.single("image"),
  async (req, res, next) => {
    try {
      const { file, currentDate } = req.body;
      
      const data = {
        userId: 1,
        amount: 1,
        date: currentDate,
        recId: 1,
        orderId: 2,
        slipImage:"image.jpg",
      };

      if (!req.file) {
        console.log("err");
      }

      if (req.file) {
        data.slipImage = await upload(req.file.path);
      }

      console.log(`data: ${data}`);

      const slip = await prisma.recordOrder.create({
        data: data,
      });

      console.log(slip);

      res.status(200).json({ msg: "create success" });
    } catch (error) {
      next(error);
    } finally {
      if (fs.file) {
        fs.unlink(req.file.path);
      }
    }
  }
);

router.post("/bill", async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const ordersWithRecordOrders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        recordOrder: true,
      },
    });

    // console.log("Orders with associated RecordOrders:", ordersWithRecordOrders);
    // res.status(200).json({msg: "success",ordersWithRecordOrders});
    res.status(200).json({ msg: "success", ordersWithRecordOrders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
