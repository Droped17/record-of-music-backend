const Multer = require("multer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true //encrypt data
});

const handleUpload = async() => {
    const res = await cloudinary.uploader.upload(file,{
        resource_type: "auto",
    })
    return res;
};

const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
});

exports.upload = upload;