const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public"); //no error
  },
  filename: (req, file, cb) => {
    console.log(file);
    const split = file.originalname.split(".");
    cb(
      null,
      " " + Date.now() +
        Math.round(Math.random() * 1000000) +
        "." +
        split[split.length - 1]
    );
  },
});

const uploadMiddleware = multer({ storage: storage });
module.exports = uploadMiddleware;

multer.memoryStorage()