const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");

// Get All Product
router.get("/", async (req, res, next) => {
  const product = await prisma.record.findMany({
    select: {
      id: true,
      albumName: true,
      price: true,
      recordInfo: true,
      image: true,
    },
  });

  res.status(201).json({ msg: "get item success", product });
});

// Get Product By Id
router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const product = await prisma.record.findFirst({
    where: {
      id: Number(id),
    },
  });
  console.log(product);

  res.status(201).json({ msg: "get item success", product });
});

// Create Product
router.post("/", async (req, res, next) => {
  try {
    const { albumName, genreName, price, image, recordInfo, score, artistId } =
      req.body;
    const newProduct = await prisma.record.create({
      data: {
        albumName: albumName,
        genreName: genreName,
        price: Number(price),
        image: image,
        recordInfo: recordInfo,
        score: Number(score),
        artistId: Number(artistId),
      },
    });

    // console.log(newProduct);

    res.status(200).json({ msg: "add product success", newProduct });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req,res, next) => {
  try {
    const {id} = req.params;
    const result = await prisma.record.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(result);
    res.status(200).json({msg:`delete id: ${id} success`})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
