const express = require('express');
const router = express.Router();
const {realAdmin} = require('../helper/auth');

const {NewPro,DeleteFurni,UpdateFurni} = require('../controller/prodt');



router.route('/admin/:userId/:categoryId').post(NewPro)

router.delete('/admin/:userId/:productid',realAdmin, DeleteFurni)

router.route('/admin/:userId/:id').patch(realAdmin,UpdateFurni)



module.exports = router;