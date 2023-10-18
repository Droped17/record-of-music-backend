const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const authenMiddleware = require("../middlewares/authenticate");
const prisma = require("../models/prisma");
const uploadMiddleWare = require("../middlewares/upload");

// Authen
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenMiddleware, authController.getMe);

// // Get All Product
// router.get("/product/", async (req, res, next) => {
//   const product = await prisma.record.findMany({
//     select: {
//       id: true,
//       albumName: true,
//       price: true,
//       recordInfo: true,
//       image: true,
//     },
//   });

//   res.status(201).json({ msg: "get item success", product });
// });

// // Get Product By Id
// router.get("/product/:id", async (req, res, next) => {
//   console.log(req.params);
//   const { id } = req.params;
//   const product = await prisma.record.findFirst({
//     where: {
//       id: Number(id),
//     },
//   });
//   console.log(product);

//   res.status(201).json({ msg: "get item success", product });
// });

// // Create Product
// router.post("/product/", async (req, res, next) => {
//   try {
//     const { albumName, genreName, price, image, recordInfo, score, artistId } =
//       req.body;
//     const newProduct = await prisma.record.create({
//       data: {
//         albumName: albumName,
//         genreName: genreName,
//         price: Number(price),
//         image: image,
//         recordInfo: recordInfo,
//         score: Number(score),
//         artistId: Number(artistId),
//       },
//     });

//     console.log(newProduct);

//     res.status(200).json({ msg: "add product success", newProduct });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id",(req,res,next)=>{
//   try {
//     console.log(req.params);
//   } catch (error) {
//     next(error);
//   }
// });









//Upload Image
// router.post("/upload",authenMiddleware,uploadMiddleWare.single("auto"),(req,res,next)=>{

// });

module.exports = router;
