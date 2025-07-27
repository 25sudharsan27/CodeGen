const express = require('express');
const cors = require("cors");

const connectDB = require('./config/connectDB');
const userRouter = require("./routes/user.router.js");
const authRouter = require("./routes/auth.router.js");
const userAuth = require('./middleware/userAuth.js');
const app = new express();


app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000", // ⬅️ Your frontend dev URL
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  

app.use("/api/auth",authRouter);

// app.use("/api/user",userAuth,userRouter);

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