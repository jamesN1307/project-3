// import API from "../../utils/API.js"
import React,{useState,useEffect} from 'react'
//import Krew from '../images/Krew.png'

//import { Link } from "react-router-dom";
import { confirmUser } from "../utils/API.js";


export default function Login() {

    // useEffect(()=>{
    //     confirmUser.getAllUsers().then(userData=>{
    //       setUsers(userData)
    //     })
    //   },[])


    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    })
    const [signupData, setSignupData] = useState({
        username:"",
        password:""
    })
    // const loginSubmit = e=>{
    //     e.preventDefault();
    //     confirmUser.login(loginData)
    //     .then(res => {
    //         if(res.ok){
    //             location.href="/avatar"
    //         } else {
    //             alert("wrong credentials")
    //         }
    //     })
    //     //redirect on successful call (./avatar.js)
    //     //error message on unsuccessful call (wrong credentials)

    //     // setLoginData({
    //     //     username:"",
    //     //     password:""
    //     // })
    // }
    const loginSubmit = async (event) => {
        event.preventDefault();
      
        const username = document.querySelector('#username-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();
      
        if (username && password) {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/avatar');
          } else {
            alert('Failed to log in.');
          }
        }
      };
    // const signupSubmit = e=>{
    //     e.preventDefault();
    //     confirmUser.signup(signupData)
    //     .then(res => {
    //         if(res.ok){
    //             location.href="/avatar"
    //         } else {
    //             alert("please fill in all fields")
    //         }
    //     })
    //     // setSignupData({
    //     //     username:"",
    //     //     password:""
    //     // })
    // }

    const signupSubmit = async (event) => {
        event.preventDefault();
      
        const username = document.querySelector('#username-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
      
        if (username && password) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/avatar');
          } else {
            alert('Failed to sign up.');
          }
        }
      };

  return (
    <div className="Login">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
            <input id="username-login" value={loginData.username} type="text"  name="loginUsername" placeholder="username" onChange={(e)=>setLoginData({...loginData,username:e.target.value})}/>
            <input id="password-login" value={loginData.password}  type="password" name="loginPassword" onChange={(e)=>setLoginData({...loginData,password:e.target.value})}/>
            <button>Login</button>
        </form>
        <hr/>
        <h2>Signup</h2>
        <form onSubmit={signupSubmit}>
            <input id="username-signup" value={signupData.username} type="text" name="signupUsername" placeholder="username" onChange={(e)=>setSignupData({...signupData,username:e.target.value})}/>
            <input id="password-signup" value={signupData.password} type="password" name="signupPassword" onChange={(e)=>setSignupData({...signupData,password:e.target.value})}/>
            <button>signup</button>
        </form>
        <hr/>
    </div>
  )
}