import React, { useState } from "react";
import API from "../utils/API";
import { useNavigate } from "react-router-dom";



export default function Login(props) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

  // login data submission
  const loginSubmit = async (e) => {
    e.preventDefault();
    props.login(loginData);
    if (
      loginData.value !== API.userData || loginData.username === "" || loginData.password.length < 8
    ) {
      alert("wrong credentials");
    } else {
      navigate("/avatar", { replace: true });
      setLoginData({
        username: "",
        password: "",
      });
    }
  };

  // signup data submission
  const signupSubmit = (e) => {
    e.preventDefault();
    props.signup(signupData);
    if (
      signupData.username === "" ||
      signupData.password === "" ||
      signupData.password.length < 8
    ) {
      alert("please fill in all input fields");
    } else {
      navigate("/avatar", { replace: true });
      setSignupData({
        username: "",
        password: "",
      });
    }
  };

  // Begin Return Statement
  return ( 
    <div className="Login">
      <form onSubmit={loginSubmit} className='dataForm'>
      <h2 className='Title'>Login</h2>
        <input
          className = 'inputValue'
          value={loginData.username}
          type="text"
          name="loginUsername"
          placeholder="username"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <input
          className = 'inputValue'
          value={loginData.password}
          type="password"
          name="loginPassword"
          placeholder='password'
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button className='giveData'>Login!</button>
      </form>
      
      
      <form onSubmit={signupSubmit} className='dataForm'>
      <h2 className='Title'>Signup</h2>
        <input
          className = 'inputValue'
          value={signupData.username}
          type="text"
          name="signupUsername"
          placeholder="username"
          onChange={(e) =>
            setSignupData({ ...signupData, username: e.target.value })
          }
        />
        <input
          className = 'inputValue'
          value={signupData.password}
          type="password"
          name="signupPassword"
          placeholder='password'
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
        />
        <button className='giveData'>Sign Up!</button>
      </form>
    </div>
  );
}
