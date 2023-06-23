const Addfurni = require('../models/product')
const cates = require('../models/catModel')
const adminModel = require("../models/admin") 
const asyncHandler = require ("express-async-handler");
const cloudinary = require("../helper/cloudinary");

exports.NewPro = async (req, res) => {
    try {
        const userId = req.params.userId
        const categoryId = req.params.categoryId;
       const theCat = await cates.findById(categoryId)
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{folder:"products"})
        const fruniData = {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url,
            cloudId: result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            numReview:req.body.numReview,
            categories: req.body.categories,
            stockQuantity: req.body.stockQuantity, 
            brandName: req.body.brandName
        }
        const created = new Addfurni(fruniData)
        const theUser = await adminModel.findById(userId)
        theUser.products = created
        //await created.save();
        if (theCat && Array.isArray(theCat.products)) {
           await created.save();
           theCat.products.push(created);
          await theCat.save();
 } 
  res.status(201).json({ 
    message: "Furniture item created successfully",
    furniture: created
});
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}

exports.GetallFurni = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.find()
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

// exports.GetAllProByAdmin = asyncHandler(async (req, res) => {
//     try{ 
//         const userId = req.params.userId
//         const allFurni = await adminModel.findById(userId)
//          res.status(201).json({
//          message: "Allfurni",
//            data: allFurni
// }); 

//     }catch(e){ 
//         res.status(400).json({ 
//             message: e.message 
//         });
//     }
// }
// )


exports.GetSingle = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.findById(req.params.proId)
        res.status(201).json({
            message: "successful",
            //length: allFurni.length, 
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
        const productid = req.params.productid;
        const productId = await Addfurni.findById(productid)
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

// exports.GetCategoryByProduct = asyncHandler(async (req, res) => {
//     try{
//         const query = req.query.category ? { categories: req.query.category } : {}
//         const product = await Addfurni.find(query)
//         res.status(201).json({
//             message: "Allfurni",
//             length: product.length,
//             data: product
//         });

//     }catch(e){
//         res.status(400).json({
//             message: e.message
//         });
//     }
// }
// )

exports.GetCategoryByProduct = asyncHandler(async (req, res) => {
    try {
        const query = req.query.category ? { categories: req.query.category } : {}
        const product = await Addfurni.find(query)
        res.status(201).json({
            message: "Allfurni By Categories",
            length: product.length,
            data: product
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
} 
)



