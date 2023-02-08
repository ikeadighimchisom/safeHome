const express = require('express');
const {realAdmin} = require('../helper/auth');

const {NewPro,DeleteFurni,UpdateFurni} = require('../controller/prodt');


const router = express.Router();

router.route('/admin/:userId').post( NewPro)

router.delete('/admin/:userId/:productid',realAdmin, DeleteFurni)

router.patch('/admin/:userid/:productid',realAdmin, UpdateFurni)



module.exports = router;
