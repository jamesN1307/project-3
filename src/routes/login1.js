import React,{useState} from 'react'
import API from '../utils/API'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    })
    const [signupData, setSignupData] = useState({
        username:"",
        password:""
    })
    let navigate = useNavigate();

    const loginSubmit = async e=>{
        e.preventDefault();
        // const loglog = await API.login(loginData);
        props.login(loginData)
        navigate("/avatar", { replace: true });
        setLoginData({
            username:"",
            password:""
        })
    }
    const signupSubmit = async e=>{
        e.preventDefault();
        const signsign = await API.signup(signupData);
        navigate("/avatar", { replace: true });
        console.log(signsign);
        setSignupData({
            username:"",
            password:""
        })
    }
  return (
    <div className="Login">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
            <input value={loginData.username} type="text"  name="loginUsername" placeholder="username" onChange={(e)=>setLoginData({...loginData,username:e.target.value})}/>
            <input value={loginData.password}  type="password" name="loginPassword" onChange={(e)=>setLoginData({...loginData,password:e.target.value})}/>
            <button>Login</button>
        </form>
        <hr/>
        <h2>Signup</h2>
        <form onSubmit={signupSubmit}>
            <input value={signupData.username} type="text" name="signupUsername" placeholder="username" onChange={(e)=>setSignupData({...signupData,username:e.target.value})}/>
            <input value={signupData.password} type="password" name="signupPassword" onChange={(e)=>setSignupData({...signupData,password:e.target.value})}/>
            <button>signup</button>
        </form>
        <hr/>
    </div>
  )
}