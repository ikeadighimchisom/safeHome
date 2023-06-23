const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
    { 
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    image:{ 
        type: String,
      },
      cloudId:{ 
        type: String,
      },
    price: {
        type: String,
        required: [true, "price is required"],
    },
     rating:{ 
        type: Number,
         default: 0,
      },
      numReview:{ 
        type: String,
        required: [true, "numReview is required"]
      },
      stockQuantity:{ 
        type: Number,
        default: 0,
      },
      AddAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddAdmin"
     },
      categories: {
        type: Array,
        // ref: "cates",
        required: [true, "categories is required"]
      },
},
{
    timestamps: true
})

const product = mongoose.model('product', productSchema)
module.exports= product

