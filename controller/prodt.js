const Addfurni = require('../models/product')
const cates = require('../models/catModel')
const asyncHandler = require ("express-async-handler");
const cloudinary = require("../helper/cloudinary");

exports.NewPro = asyncHandler (async (req, res) => {
    try{
        const categoryId = req.params.categoryId
        const theCat = await cates.findById(categoryId)
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const fruniData = {
            title:req.body.title,
            description:req.body.description,
            image:result.secure_url,
            cloudId:result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            ratingCount: req.body.ratingCount,
            numReview: req.body.numReview,
            stockQuantity: req.body.stockQuantity,
            categories:theCat ? [theCat._id] : [],
        }
        // const data = {title,description,image,price,rating,numReview,stockQuantity,cloudId}
        fruniData.categories = [theCat._id];
        const created = await Addfurni.create(fruniData);
        if (theCat) {
            created.categories = [theCat._id]
            //furniture.categories = theCat;
            await created.save();
      
            theCat.products.push(created);
            await theCat.save();
          }
        res.status(201).json({
            message: "New Furniture Added",
            data: created
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.GetallFurni = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.find();
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)


exports.GetSingle = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.findById(req.params.id).populate("comments");
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.DeleteFurni =  async (req, res) => {
    try{
        const productid = req.params.productid
         await Addfurni.findByIdAndDelete(productid);
        res.status(204).json({
            message: "Deleted",
        });
    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
            


exports.UpdateFurni = asyncHandler(async(req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const id = req.params.id;
        const productId = await Addfurni.findById(id)
        const newUpdate = {
            title:req.body.title,
            description:req.body.description,
            image:result.secure_url,
            cloudId:result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            numReview: req.body.numReview,
            stockQuantity: req.body.stockQuantity,
        }
        const Furniupdate = await Addfurni.findByIdAndUpdate(productId, newUpdate);
        res.status(201).json({
            message: "update was sucessful",
            // length: reviewFurni.length,
            data: Furniupdate
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}
)


exports.GetProByAdmin = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.find();
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

