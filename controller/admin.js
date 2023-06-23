const AddAdmin = require("../models/admin");
const dotenv = require("dotenv")
dotenv.config({path: "../CONFIG/config.env"})
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")


exports.AdminSignUp = async(req, res) => {
    try{
        const {fullName, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            fullName,   
            email,
            password: hash, 
        }
        const createUser = new AddAdmin(data)
        createUser.isAdmin = true; 
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
             IsAdmin:createUser.isAdmin,
            IsSuperAdmin:createUser.isSuperAdmin},
              process.env.JWTSCRET,{expiresIn: "1d"})
              
            createUser.token = myToken;
            const checker = await AddAdmin.findOne({fullName,email});
            if(checker){
                res.status(200).json({
                    message: "Email already taken"
                })
            }else{
           await createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/AdminVerify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
            mailSender({
            email: createUser.email,
            subject: "Kindly verify",
            message,
            });

             res.status(201).json({
                message: "User created",
                data: createUser
             });

            }
      } catch(err) {
            res.status(400).json({
            message: err.message
        });
    }
}



exports.Adminlogin = async (req, res) => {
    try{
        const {email,password} = req.body;
        const checkEmail = await AddAdmin.findOne({email:email})
        if(!checkEmail) return res.status(404).json({
            message: " Email Not found"
        })
        const isPassword = await bcryptjs.compare(password, checkEmail.password)
        if(!isPassword) return res.status(404).json({message: "Email or password incorrect"})

        const myToken = jwt.sign({
            id:checkEmail._id,
            password: checkEmail.password,
            IsAdmin:checkEmail.isAdmin,
            IsSuperAdmin:checkEmail.isSuperAdmin},  process.env.JWTSCRET ,{expiresIn: "1d"})

            checkEmail.token = myToken 
            await checkEmail.save()
            res.status(201).json({
            message:"Successful",
            data:checkEmail
         })
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// exports.AdminVerify = async (req, res) => {
//     try{    
//         const userid = req.params.userid
//         const user = await AddAdmin.findById(userid)
//         await AddAdmin.findByIdAndUpdate(
//             user._id,
//             {
//                 verify: true
//             },
//             {
//                 new : true
//             }
//         )

//         res.status(200).json({
//             message: "you have been verified"
//         })

//     }catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }
// }

exports.Verify = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await AddAdmin.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await AddAdmin.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "you have been verified"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.Forgotpassword = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await AddAdmin.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsAdmin:userEmail.isAdmin,
            IsSuperAdmin:userEmail.isSuperAdmin}, process.env.JWTTOKEN, {expiresIn: "1m"})

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${userEmail._id}/${myToken}`
        const message = `Use this link ${VerifyLink} to change your password`;
        sendEmail({
          email: userEmail.email,
          subject: "Reset Pasword",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })

        // console.log(userEmail);
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


exports.passwordchange= async(req,res)=>{
    try {
        const {password} = req.body;
        const userId = req.params.userId;
        const saltPwd = await bcrypt.genSalt(10);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const users = await AddAdmin.findById(userId);
        await AddAdmin.findByIdAndUpdate(users._id,{
            password: hassPwd
        },
        {
            new: true
        } )
        res.send("Successfully changed...")
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


//get all user
// exports.GetallUser = async (req, res) => {
//     try{
//         const allUser = await realUser.find().where({"isAdmin": false});
//         res.status(201).json({
//             message: "AllUsers",
//             length: allUser.length,
//             data: allUser,
//            // console.log(allUser)
//         });


//     }catch(e){
//         res.status(400).json({ 
//             message: e.message
//         });
//     } 
// }

exports.SuperSignUp = async(req, res) => {
    try{
        const {fullName, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            fullName,
            email,
            password: hash,
        }
        const createUser = new AddAdmin(data)
        createUser.isAdmin = true;
        createUser.isSuperAdmin = true;
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
             IsAdmin:createUser.isAdmin,
            IsSuperAdmin:createUser.isSuperAdmin},
              process.env.JWTSCRET,{expiresIn: "1d"})
              
            createUser.token = myToken,
            createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
            mailSender({
            email: createUser.email,
            subject: "Kindly verify",
            message,
            });


             res.status(201).json({
                message: "SuperAdmin created",
                data: createUser
             });
      } catch(err) {
            res.status(400).json({
            message: err.message
        });
    }
}

// get all users
exports.GetallUser = async (req, res) => {
    try{
        const allUser = await AddAdmin.find().where({"isAdmin": false});
        res.status(201).json({
            message: "AllUsers",
            length: allUser.length,
            data: allUser,
           // console.log(allUser)
        });


    }catch(e){
        res.status(400).json({ 
            message: e.message
        });
    } 
}

//delete users
exports.delUser = async(req,res)=>{
    try {
        const userId = req.body.userId;
        const user = await AddAdmin.findById(userId);
        await AddAdmin.deleteOne(userId, user);
        res.status(200).json({
            message: "Deleted successfully..."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


exports.allUsers = async(req,res)=>{
    try {
        const allusers = await AddAdmin.find();
        res.status(200).json({
            message: "All users " + allusers.length,
            data: allusers
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


exports.allAdmin = async(req,res)=>{
    try {
        const all = await AddAdmin.find().where({"isAdmin": true});
        res.status(200).json({
            message: "All users " + all.length,
            data: all
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.singleUser = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const single = await AddAdmin.findById(userId).populate("products");
        if(single.length === 0){
            res.status(404).json({
                message: `User with this id: ${userId} not found...`
            })
        }else{
            res.json({
                data: single 
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};
