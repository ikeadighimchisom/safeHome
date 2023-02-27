const express = require("express");
const asyncHandler = require ("express-async-handler");
const prod = require("../models/product");

exports.newStock = asyncHandler (async (req, res) => {
    try{
        const productId = req.params.id;
        const newStock = req.body.Stock;
        
        const product = await prod.findByIdAndUpdate(productId, {
            stockQuantity: newStock
        });
       res.status(200).json({
           message: "Product stock was successfull!",
             data: product,
    }); 
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
})

