const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: [true, "fullname is required"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password is require"]
    },
    order: {
        type: String,
        require: [true, "order is require"]
    },
       products:[{
       type: mongoose.Schema.Types.ObjectId,
        ref: "product"
     }],
    verify: { 
        type: Boolean,
        default: false
     },
    isAdmin: {  
        type: Boolean,
        default: true
    },
    isSuperAdmin: {  
        type: Boolean,
        default: false
    },
    // role: {  
    //     type: [realAdmin,isSuperAdmin],
    //     default: true
    // },
    token: {
        type: String,
    }
 
   },

   {
    timestamps: true,
   });

   const AddAdmin = mongoose.model("AddAdmin", userSchema)
   module.exports = AddAdmin;
