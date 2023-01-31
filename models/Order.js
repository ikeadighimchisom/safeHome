const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema ({
    nuser:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "user",
      },
    orderItems: [
        {
            title: { type: String, require: true},
            qty: { type: Number, require: true},
            image: { type: String, require: true},
            price: { type: Number, require: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, "user is required"],
                ref: "product",
            }
        }
    ],
    shippingAddress: {
        adress: { type: String, require: true},
        city: { type: String, require: true},
        postalCode: { type: String, require: true},
        country: { type: Number, require: true},
    },
    paymentMethod: {
        type: String,
         required: [true, "paymentMethod is required"],
         default: "master card, velve, paypal",
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    },
    taxprice: {
        type: String,
        required: [true, "taxprice is required"],
        default: 0.0,
    },
    shippingPrice: {
        type: String,
        required: [true, "shippingPrice is required"],
        default: 0.0,
    },
    totalPrice: {
        type: String,
        required: [true, "totalPrice is required"],
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: [true, "isPaid is required"],
        default: false,
    },
    isDelivered: {
        type: Boolean,
        required: [true, "isDelivered is required"],
        default: false,
    },
    deliveryAt: {
        type: date
    },
    paidAt: {
        type: date
    },
    token: {
        type: String,
    },
 
   },

   {
    timestamps: true,
   });

   const order = mongoose.model("order", orderSchema)
   module.exports = order;