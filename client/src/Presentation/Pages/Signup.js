import '../Styles/AuthPage.css';
import {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../../Application/Services/Api';

const SignUp = ()=>{
    const navigator = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            console.log(e.target);
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const confirmpassword = confirmpasswordRef.current.value;
            if(!email || !password || !confirmpassword){
                alert("Check your all inputs");
                return;
            }
            if(!(password === confirmpassword)){
                alert("Check Your Confirm Password")
                return;
            }
            if(!password.length>7){
                alert("Check your password length must more than 7")
                return;
            }
            console.log({
                email,
                password,
                confirmpassword
            })
            const response = await userSignup({email,password});
            console.log(response);
            if(response?.data?.success){
                navigator("/login");
            }
            else{
                alert(response.data.message);
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
                    <h2>Sign Up</h2>
                    <div className="input-label">
                        <label>Email</label>
                        <input ref={emailRef} name="email" type="email" ></input>
                    </div>
                    <div className="input-label">
                        <label>New Password</label>
                        <input ref={passwordRef} name="password" type="password"></input>
                    </div>
                    <div className="input-label">
                        <label>Confirm Password</label>
                        <input ref={confirmpasswordRef} name="confirmpassword"></input>
                    </div>
                    <div className="input-buttons">
                        <button className="input-button">Sign Up</button>
                        or
                        <a href="/login" className="input-link">Already Have an account ?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;