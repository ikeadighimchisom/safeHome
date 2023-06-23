const express = require('express');
const router = express.Router();
const {realAdmin} = require('../helper/auth');

const {NewPro,DeleteFurni,UpdateFurni,GetCategoryByProduct, GetAllProByAdmin} = require('../controller/prodt');



router.route('/admin/:userId').post(NewPro)

router.delete('/admin/:userId/:productid', DeleteFurni)
//router.get("/admin/:userId",GetAllProByAdmin)
router.route('/admin/:userId/:productid').patch(UpdateFurni)
router.get('/category', GetCategoryByProduct)



module.exports = router; 