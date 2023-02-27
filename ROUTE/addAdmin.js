const express = require("express")
const {Adminlogin,AdminSignUp,Verify,Forgotpassword,passwordchange,GetallUser} = require("../controller/admin")

const Router = express.Router();


 Router.route('/Login').post(Adminlogin)
Router.route('/adminSign').post(AdminSignUp)
 Router.route('/Veri/:id').post(Verify)
Router.route('/adminForget/:userid').post(Forgotpassword)
 Router.route('/adminChng').post(passwordchange)
 //Router.route("/admin").get(GetallUser)
module.exports = Router;
