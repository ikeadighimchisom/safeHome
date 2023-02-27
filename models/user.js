const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
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
    verify: { 
        type: Boolean,
        default: false
     },
     Order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    isAdmin: {  
        type: Boolean,
        default: false
    },
    isSuperAdmin: {  
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    }
 
   },

   {
    timestamps: true,
   });

   const AddUser = mongoose.model("AddUser", userSchema)
   module.exports = AddUser;
