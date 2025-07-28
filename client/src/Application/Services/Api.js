import axios from 'axios';


const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials:true
})

const userLogin = (formData) => API.post("/api/auth/login",formData,{headers:{'Content-Type':"application/json"}});
const userSignup = (formData) => API.post("/api/auth/signup",formData,{headers:{'Content-Type':"application/json"}});

const handlePrompt = (formData)=> API.post("/api/user/prompt",formData,{headers:{'Content-Type':"application/json"}});
const getSessions = ()=> API.get("/api/user/getsessions",{headers:{'Content-Type':"application/json"}});
const getSessionDetail = (id)=>API.get("/api/user/getchat/"+id,{headers:{'Content-Type':"application/json"}});

export {userLogin,userSignup,handlePrompt,getSessions,getSessionDetail};