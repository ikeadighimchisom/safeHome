const mongoose = require("mongoose")

const commentModel = new mongoose.Schema({
    postComment: {
        type: String
    },
    posted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adduser"
    }

},
{
    timestamps: true
})

const comment = mongoose.model('Order', commentModel)
module.exports= comment;

