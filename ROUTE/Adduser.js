const express = require("express")
const {signUpUser,UserVerify,Forgotpassword,passwordchange,logOut} = require("../controller/Realuser")

const Router = express.Router();


//Router.route('/login').post(login)
Router.route('/sign').post(signUpUser)
Router.route('/userForget').post(Forgotpassword)
Router.route('/userChng').post(passwordchange)
Router.route('/userVerify').post(UserVerify)
Router.route('/logout/:id').post(logOut)
//Router.route("/admin").get(GetallUser)
module.exports = Router; 
