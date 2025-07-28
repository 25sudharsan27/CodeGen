const user = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error:true,
                message:"Please Provide all Details"
            })
        }
        const userData = await user.findOne({
            email:email
        });
        const checkpassword = bcrypt.compareSync(password,userData.password);
        if(checkpassword){
            const tokenData = {
                "_id" : userData._id,
            }
            const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:60*60*8});
            const tokenOption = {
                httpOnly : true,
                secure:true,
                sameSite : "None"
            }
            res.cookie("token",token,tokenOption).status(200).json({
                error:false,
                success:true,
                message: "User Matched Successfully" 
            })
        }
        else{
            res.status(401).json({
                message : "User Password is Incorrect",
                error : true,
                success : false
            });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error:false,
            success:false,
            message:"Internal Server Error"
        })
    }
}

const SignUp = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error:true,
                message:"Please Provide all Details"
            })
        }
        const userD = await user.findOne({email});
        if(userD){
            return res.status(409).json({
                message:"User Already Exists",
                error:true,
                success:false
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt);

        if(!hashPassword){
            return res.status(500).json({
                message:"Unable to process hashing password",
                error:true,
                success:false
            })
        }
        
        const userData = user({
            email,
            password:hashPassword
        });

        const savedUser = await userData.save();

        return res.status(201).json({
            data:savedUser,
            success:true,
            error:false,
            message:"User Signed Up Successfully"
        })
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:true,
            message:"Internal Server Error"
        })
    }
}
const LogOut = async(req,res) => {
    try{
        res.clearCookie("token").status(200).json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err,
            error: true,
            success : false,
        })
    }
}

module.exports = { Login, SignUp,LogOut };
