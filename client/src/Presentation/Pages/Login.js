import '../Styles/AuthPage.css';
import {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../Application/Services/Api';

const Login = ()=>{
    const navigator = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            if(!email || !password){
                alert("Check your all inputs");
                return;
            }
            const response = await userLogin({email,password});

            if(response?.data?.success){
                navigator("/sessions");
            }
            else{
                alert("Something Went Wrong");
            }

        }catch(error){
            console.error(error);
            console.log(error.message);
        }
    }

    return (
        <div className="page">
            <div className="auth-container">
                <img src="https://res.cloudinary.com/duyuxtpau/image/upload/v1753614800/gtpfkdjurauu11b0tnud.webp" alt="login image"/>
                <form onSubmit={HandleSubmit} className="auth-container-child">
                    <h2>Login</h2>
                    <div className="input-label">
                        <label>Email</label>
                        <input ref={emailRef} name="email" type="email" ></input>
                    </div>
                    <div className="input-label">
                        <label>New Password</label>
                        <input ref={passwordRef} name="password" type="password"></input>
                    </div>
                    <div className="input-buttons">
                        <button className="input-button">Login</button>
                        or
                        <a href="/signup" className="input-link">create a new account ?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;