const express = require("express");
const commentModel = require("../models/commentModel");
const Order = require("../models/Order");
const product = require("../models/product");
//const comment = require("../models/commentModel")

const newComment = async (req, res) => {
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        const com = new commentModel(req.body);
        com.posted = order;
        com.save();
        order.comments.push(com);
        await order.save();

        res.status(200).json({
            status: "Success",
            data: com
        })

    }catch(e){
        res.status(400).json({
            status: "Failled",
            message: e.message
        })
    }
}

module.exports = {
    newComment
}