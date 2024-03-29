const express = require("express");
const asyncHandler = require ("express-async-handler");
const Order = require("../models/Order");
const mailSender = require("../tils/Emails");


exports.newOrder = asyncHandler (async (req, res) => {
    try{
    const Id = req.params.Id;
    const {quantity,customerAddress,phoneNumber,customerName,customerEmail} = req.body;
    const orderProduct = {
        quantity,
        customerAddress,
        phoneNumber,
        customerName,  
        customerEmail,
        } 
        const created = await Order.create(orderProduct);
            const delivered = `${req.protocol}://${req.get("host")}/api/delivered/${orderProduct._id}`
            const message = `There value customer, your order have been recieve and will be delivered to you in your address your have input in your form you filled. Please click on this link ${delivered} if you have successfully recieved the goods. Thanks for patronizing us @Safe_Home-Furniture`;
            mailSender({
            email: orderProduct.email,
            subject: "Order Placed is complete",
            message,
        });
        res.status(201).json({
            message: "Order placed successful",
            data: created
        });
    }catch(e){
        res.status(400).json({
            message: e.message  
        });
    }
}
)

exports.getOrder = asyncHandler  (async(req, res) => {
    try{
        const allOrder = await Order.find();
        res.status(201).json({
            message: "Order was gotten",
            length: allOrder.length,
            data: allOrder,
        })
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
})


exports.getOneOrder = asyncHandler(async(req,res) => {
    try{
        const Id = req.params.Id;
       const order = await Order.findById(Id)
        res.status(200).json({
            message: "Single Order was successful",
            data: order
        })
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
})
exports.deleteOrder = asyncHandler(async(req,res) => {
    try{ 
        const orderId = req.params.orderId;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({
            message: "Order has been deleted",
        })
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
})
