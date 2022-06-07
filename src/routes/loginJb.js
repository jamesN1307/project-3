import React,{useState} from 'react'
import Krew from '../images/Krew.png'

const styles = {
    image: {
      height: "100vh",
      width: "100vw",
      position: "absolute",
      zIndex: -1,
      opacity: .65
    },
    title: {
      fontSize: "30px",
      fontWeight: "800",
      position: "absolute",
      left: "35%",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "herculanum"
    }
  }

export default function Login(props) {
    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    })
    const [signupData, setSignupData] = useState({
        username:"",
        password:""
    })
    const loginSubmit = e=>{
        e.preventDefault();
        props.login(loginData);
        setLoginData({
            username:"",
            password:""
        })
    }
    const signupSubmit = e=>{
        e.preventDefault();
        props.signup(signupData);
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