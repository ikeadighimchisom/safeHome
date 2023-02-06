const express = require("express")
const {Adminlogin,AdminSignUp,AdminVerify,Forgotpassword,passwordchange} = require("../controller/admin")

const Router = express.Router();


 Router.route('/adminLogin').post(Adminlogin)
Router.route('/adminSign').post(AdminSignUp)
 Router.route('/adminVeri').post(AdminVerify)
Router.route('/adminForget').post(Forgotpassword)
 Router.route('/adminChng').post(passwordchange)
module.exports = Router;