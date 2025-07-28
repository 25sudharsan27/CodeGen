const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");


const userAuth = async(req,res,next) => {
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(400).json({
                message:"User Not Logging",
                error:true,
                success:false
            })
        }
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.staatus(401).json({
                    message: "Invalid or expired token",
                    error:true,
                    success:false
                })
            }
            req.user_id = decoded?._id;
            next();
        })
    }catch(error){
        return res.status(500).json({
            error:true,
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports = userAuth;
