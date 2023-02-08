const express = require("express");
const asyncHandler = require ("express-async-handler");
const Order = require("./../models/Order");





exports.order = asyncHandler (async (req, res) => {
        const{
            orderItems,
            shippingAddress,
            paymentMethod,
            paymentResult,
            taxprice,
            shippingPrice,
            itemPrice,
            totalPrice,
        
        } = req.body
        if(orderItems && orderItems.length === 0) {
            res.status(400).json({
                message: "items not order",
    }) 
        return
    } else{
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            paymentResult,
            taxprice,
            shippingPrice,
            itemPrice,
            totalPrice
        })
        const createOrder = await order.save();
            res.status(201).json({
                data: createOrder
            })
    }
     })

    
     //get order

     asyncHandler (async (req, res) => {
        const order = await order.findById(req.params.id).populate(
            "name",
            "email"
        );
    if(order){
        res.status(order)
    }else{
        throw new Error("order not found")
    }
    })
    
             
// module.exports = orderRouter;

