const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public"); //no error
    },
    filename: (req,file,cb) => {
       console.log(file);
       const split = file.originalname.split(".");
       cb(null," " + Date.now() + "." + split[split.length - 1]); 
    },
});

const uploadMiddleWare = multer({storage: storage});
module.exports = uploadMiddleWare;

multer.memoryStorage();