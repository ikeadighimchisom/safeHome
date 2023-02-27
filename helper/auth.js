require("dotenv").config();
const modelName = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
 dotenv.config({path: './CONFIG/config.env'})

const checkUser = async(req,res,next)=>{
    try {
      const userId = req.params.userId;
      const user = await modelName.findById(userId)
      if(!user){
        res.status(400).json({
            message: "you aren't Autorized"
        })
      }else{
        const authToken = user.token;
        // console.log(authToken)
        if(!authToken){
            res.status(400).json({
                message: "Not autorized"
            })
        }else{
            jwt.verify(authToken, process.env.JWTSCRET, (err,payLoad)=>{
                if(err){
                    return err
                }else{
                    req.user = payLoad,
                    next()
                }
            })
        }
      }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.realAdmin = (req,res,next)=>{
    checkUser(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(401).json({
                message: "you are not authorized for now"
            })
        }
    })
};

exports.IsSuperAdmin = async(req,res,next)=>{
        checkUser(req,res, ()=>{
            if(req.user.isSuperAdmin){
            next()
            }else{
                res.status(401).json({
                    message: "Sorry you are not authorized to perform this.. "
                })
            }
        })
    };

exports.isUser = (req,res,next)=>{
    checkUser(req,res,()=>{
        if(!req.user.isAdmin){
            next()
        }else{
            res.status(401).json({
                message: "sorry you are not authorized"
            })
        }
    })
};

