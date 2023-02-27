const express = require("express");

const stockRouter = express.Router()

const {newStock} = require('../controller/InStock');
//const {realAdmin} = require("../helper/auth")




stockRouter.patch("/stock/:proid",newStock)
//router.post("/rate/:id",newRating)

module.exports = stockRouter;