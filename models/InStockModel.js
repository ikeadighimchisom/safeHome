const mongoose = require("mongoose")
const InStockSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    stockQuantity: {
      type: Number,
      default: 0
    },

  })
  
  // Product Model
  const Stock = mongoose.model("Stock", InStockSchema);
  module.exports= Stock
