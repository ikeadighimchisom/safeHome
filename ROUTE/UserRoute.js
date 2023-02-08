const express = require('express')
const {GetallFurni,GetSingle,Order} = require('../controller/prodt')


const router = express.Router();


router.route('/user').get(GetallFurni)
router.route('/get/:id').get(GetSingle)
// router.route('/order/:id').post(Order)

module.exports = router

