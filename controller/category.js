const express = require("express");
const asyncHandler = require ("express-async-handler");
const Cates = require("../models/catModel");
const product = require("../models/product");


exports.NewCates = asyncHandler (async (req, res) => {
    try{
     const categoryName = req.body.categoryName;
    const categories = {
        categoryName,
    }
         const category = await Cates.create(categories);
        res.status(201).json({
            message: "Categories successful",
            data: category
        });   
    }catch(e){
        res.status(400).json({
            message: e.message 
        });   
    }   
}
) 
// get allCategory
exports.getAllCates = asyncHandler  (async(req, res) => {
    try{
        const id = req.params.id;
        const allCategory = await Cates.find();
        res.status(201).json({
            message: "Category was gotten",     
            length: allCategory.length,
            data: allCategory,
        })
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    } 
})