const realUser = require("../models/user");
const dotenv = require("dotenv")
dotenv.config({path: "../CONFIG/config.env"})
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")


exports.signUpUser = async(req, res) => {
    try{
        const {fullname, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            fullname,
            email,
            password: hash,
        }
        const createUser = await realUser(data)
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
              IsAdmin:createUser.isAdmin,
              IsSuperAdmin:createUser.isSuperAdmin},
              process.env.JWTSCRET,{expiresIn: "1d"})
            
            createUser.token = myToken;
            const checker = await realUser.findOne({fullname,email})
            if(checker){
            res.status(400).json({
                message: "Email already taken..."  
            })
        }else{
            await createUser.save();

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`
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



// exports.login = async (req, res) => {
//     try{
//         const {email,password} = req.body;
//         const check = await realUser.findOne({email:email})
//         if(!check) return res.status(404).json({
//             message: "Not found"
//         })
//         const isPassword = await bcryptjs.compare(password, check.password)
//         if(!isPassword) return res.status(404).json({message: "Email or password incorrect"})

//         const myToken = jwt.sign({
//             id:check._id,
//             password: check.password,
//             IsAdmin:check.isAdmin,
//             IsSuperAdmin:check.isSuperAdmin},  
//             process.env.JWTSCRET ,{expiresIn: "1d"})

//             check.token = myToken 
//             await check.save()
//             res.status(201).json({
//             message:"Successful",
//             data:check
//          })
//     } catch(err) {
//         res.status(400).json({
//             message: err.message
//         })
//     }
// }

exports.UserVerify = async (req, res) => {
    try{    
        const userid = req.params.userid
        const user = await realUser.findById(userid)
        await realUser.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new : true
            }
        )

        res.status(200).json({
            message: "you have been verified"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

exports.Forgotpassword = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await realUser.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsAdmin:userEmail.isAdmin,
            IsSuperAdmin:userEmail.isSuperAdmin}, 
            process.env.JWTTOKEN, 
            {expiresIn: "1m"})

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
        const users = await realUser.findById(userId);
        await realUser.findByIdAndUpdate(users._id,{
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

exports.logOut = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const {email, password} = req.body;
        // const userLog = await realUser.findById(req.params.userId);
        const genToken = jwt.sign({
             userId,
             email,
             password,
        },process.env.JWTDESTROY);
        realUser.token = genToken;
        // await userLog.save();
        res.status(200).json({
            message: "Successfully logged out..."
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// exports.GetallUser = async (req, res) => {
//     try{
//         const allUser = await realUser.find();
//         res.status(201).json({
//             message: "AllUsers",
//             length: allUser.length,
//             data: allUser
//         });

//     }catch(e){
//         res.status(400).json({
//             message: e.message
//         });
//    

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

 