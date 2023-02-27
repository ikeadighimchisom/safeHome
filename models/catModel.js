const mongoose = require("mongoose");
const Schema = new mongoose.Schema
const cateSchema = new mongoose.Schema ({
    categoryName: {
        type: String,
        require: [true, "categoryName must be specified."]
    }, 
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        // required: [true,"productCategory name is required"],
    }],     
   },
   
   {
    timestamps: true
   });

   const cates = mongoose.model("cates", cateSchema)
   module.exports = cates;