const express = require('express')
const {GetallFurni,GetSingle} = require('../controller/prodt')
const {newOrder} = require('../controller/orderpro');

const router = express.Router();


router.route('/user').get(GetallFurni)
router.route('/get/:proId').get(GetSingle)
 router.route('/order/:id').post(newOrder)

module.exports = router

