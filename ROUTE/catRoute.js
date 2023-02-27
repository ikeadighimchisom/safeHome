const express = require("express");

const cateRouter = express.Router()

const {NewCates,getAllCates} = require('../controller/category');
//const {IsSuperAdmin} = require("../helper/auth")




cateRouter.route("/cates").post(NewCates);
cateRouter.route("/allCates/:id").get(getAllCates)

module.exports = cateRouter;

