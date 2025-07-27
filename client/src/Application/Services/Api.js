import axios from 'axios';


const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials:true
})

const userLogin = (formData) => API.post("/api/auth/login",formData,{headers:{'Content-Type':"application/json"}});
const userSignup = (formData) => API.post("/api/auth/signup",formData,{headers:{'Content-Type':"application/json"}});

export {userLogin,userSignup};