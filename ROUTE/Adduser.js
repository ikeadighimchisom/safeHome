const express = require("express")
const {login,signUpUser,UserVerify,Forgotpassword,passwordchange} = require("../controller/Realuser")

const Router = express.Router();


Router.route('/login').post(login)
Router.route('/sign').post(signUpUser)
 Router.route('/userForget').post(Forgotpassword)
 Router.route('/userChng').post(passwordchange)
 Router.route('/userVerify').post(UserVerify)

module.exports = Router;