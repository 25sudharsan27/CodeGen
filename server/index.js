const express = require('express');

const connectDB = require('./config/connectDB');
const userRouter = require("./routes/user.router.js");
const authRouter = require("./routes/auth.router.js");
const app = new express();


app.use(express.json());

app.use("/api/auth",authRouter);

app.use("/api/user",userRouter);

app.use("/testing",(req,res)=>{
    try{
        res.status(200).json({
            error:"false",
            message:"working well"
        });
    }catch(error){
        res.status(500).json({
            error:"true",
            message:"Interal Server Error"
        })
    }
})

connectDB().then(
    ()=>{
        app.listen(process.env.PORT_NUMBER,
            ()=>{
                console.log("server running in http://localhost:"+process.env.PORT_NUMBER);
            }
        )
    }
)