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

module.exports = router;
