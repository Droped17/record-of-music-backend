const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");

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

      
    }

    res.status(200).json({ msg: "success", createOrder });
  } catch (error) {
    next(error);
  }
});

router.get("/bill", async (req, res, next) => {
  try {
    const ordersWithRecordOrders = await prisma.order.findMany({
      include: {
        recordOrder: true,
      },
    });
    
    console.log("Orders with associated RecordOrders:", ordersWithRecordOrders);
    res.status(200).json({msg: "success"});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
