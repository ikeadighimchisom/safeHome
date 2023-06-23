// require("dotenv").config();
// const User = require('../models/user')
// const jwt = require('jsonwebtoken');
//  const dotenv = require('dotenv')
//  dotenv.config({path: './CONFIG/config.env'})

// const isSignIn = async (req, res, next) => {
//         const userid = req.params.userid;
//         const user = await User.findById(userid)
//         // console.log(user);
//          const authToken = user.token;
//         if(!authToken) return res.status(401).json({message: "Not authorized"});
//        jwt.verify(authToken, JWTSCRET, (err, payload)=>{
//          if(err) return res.status(401).json({message: err.message})
//             req.user = payload
//             next()
//             // console.log(res.user);
//         })       
// }

// const IsAdminAuth = (req, res, next)=>{
//     isSignIn(req, res, ()=>{
//         // console.log("lookig", req.user);
//         if(req.user.IsAdmin){
//             next()
//         }else{
//             res.status(403).json({message: "You are not an admin"})
//         }
//     })
// }


// const IsSuperAdmin = (req, res, next)=>{
//     isSignIn(req, res, ()=>{
//         // console.log("lookig", req.user);
//         if(req.user.isSuperAdmin){
//             next()
//         }else{
//             res.status(403).json({message: "You are not a superAdmin"})
//         }
//     })
// }

// module.exports = {IsAdminAuth,IsSuperAdmin}

