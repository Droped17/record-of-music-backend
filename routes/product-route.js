const express = require("express");
const router = express.Router();
const prisma = require("../models/prisma");
const { upload } = require("../utility/cloudinary-service");
const fs = require("fs/promises");
const uploadMiddleware = require("../middlewares/upload");

// Get All Product
router.get("/", async (req, res, next) => {
  const product = await prisma.record.findMany({
    select: {
      id: true,
      albumName: true,
      price: true,
      recordInfo: true,
      image: true,
      artistName: true,
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
  // console.log(product);

  res.status(201).json({ msg: "get item success", product });
});

// Create Product
router.post("/", uploadMiddleware.single("image"), async (req, res, next) => {
  try {
    const { albumName, genreType, price, file, recordInfo, score, artistName } =
      req.body;

    // console.log(genreType);

    const data = {
      image: file,
      albumName: albumName,
      genreType: genreType || "1",
      price: Number(price),
      artistName: artistName,
      recordInfo: recordInfo,
      score: Number(score),
    };

    if (!req.file) {
      console.log("err");
    }

    if (req.file) {
      data.image = await upload(req.file.path);
    }

    // console.log(`data: ${data}`);

    const newProduct = await prisma.record.create({
      data: data,
    });

    // console.log(newProduct);

    res.status(200).json({ msg: "add product success", data });
  } catch (error) {
    next(error);
  } finally {
    if (fs.file) {
      fs.unlink(req.file.path);
    }
  }
});

router.patch(
  "/:id",
  uploadMiddleware.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        albumName,
        genreName,
        price,
        file,
        recordInfo,
        score,
        artistName,
      } = req.body;

      const data = {
        image: file,
        albumName: albumName,
        genreName: genreName,
        price: Number(price),
        artistName: artistName,
        recordInfo: recordInfo,
        score: Number(score),
      };

      if (!req.file) {
        console.log("err");
      }

      if (req.file) {
        data.image = await upload(req.file.path);
      }

      console.log(`data: ${data}`);
      const result = await prisma.record.update({
        where: {
          id: Number(id),
        },
        data: data,
      });
      console.log(result);
      res.status(200).json({ msg: "update successfully", result });
    } catch (error) {
      next(error);
    }
  }
);

// delete product
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prisma.record.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(result);
    res.status(200).json({ msg: `delete id: ${id} success` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
