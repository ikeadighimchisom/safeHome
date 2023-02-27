const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema ({
   quantity: {
    type: Number,
    required: [true, "quantity is required"],
   },
    customerAddress: {
        type: String,
        required: [true, "customerAddress is required"],
 
    },
    phoneNumber: {
        type: Number,
        required: [true, "phoneNumber is required"],
    },
    customerName: {
        type: String,
        required: [true,"customerName is required"],
        default: 0.0,
    },
    customerEmail: {
        type: String,
        required: [true, "customerEmail is required"],
        default: 0.0,
    },
    product: {
        type: Array,
        required: [true, "customerEmail is required"],
    },
   },
   
   {
    timestamps: true
   });

   const order = mongoose.model("order", orderSchema)
   module.exports = order;

// const mongoose = require('mongoose')
// const orderSchema =  new mongoose.Schema(
//     {
//     title: {
//         type: String,
//         required: [true, "title is required"]
//     },
//     description: {
//         type: String,
//         required: [true, "description is required"],
//     },
//     image:{ 
//         type: String,
//       },
//       cloudId:{ 
//         type: String,
//       },
//     price: {
//         type: String,
//         required: [true, "price is required"],
//     },
//      rating:{ 
//         type: Number,
//          default: 0,
//       },
//       numReview:{ 
//         type: String,
//         required: [true, "numReview is required"]
//       },
//       stockQuantity:{ 
//         type: String,
//         required: [true, "stockQuantity is required"]
//       },
// },
// {
//     timestamps: true
// })

// const product = mongoose.model('product', productSchema)
// module.exports= product