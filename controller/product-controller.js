exports.getProduct = (req,res,next) => {
    console.log(req);
    res.status(201).json({msg:"get item success"});
};