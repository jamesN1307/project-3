import React from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./components/home";
// import App from './App';
import Game from './components/game';
import Avatar from "./components/avatar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./routes/login1";
import LeaderboardSingle from "./components/single_leaderboard";
import LeaderboardDouble from "./components/double_leaderboard";
import Profile from "./components/profile";
import Levels from "./components/levelSelect";
import Aang from "./components/level_1/aang";
import Iroh from "./components/level_1/iroh";
import Toph from "./components/level_1/toph";
import Momo from "./components/level_1/momo";
import Bumi from "./components/level_1/bumi";
import Katara from "./components/level_1/katara";
import Sokka from "./components/level_1/sokka";
import Appa from "./components/level_1/appa";
import NavBar from "./components/NavBar/index.js";
import './style.css';
//mport './utils/API'

import { useEffect,useState } from "react";
import API from "./utils/API"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token,setToken] = useState(null)
  useEffect(()=>{
    const savedToken = localStorage.getItem("token");
    if(savedToken){
      setToken(savedToken)
    }
  },[])
  useEffect(()=>{
   if(token){
      API.verify(token).then(userData=>{
        if(userData.userId){
          setIsLoggedIn(true);
          setUserId(userData.userId)
        } else {
          setIsLoggedIn(false);
          setUserId(null)
        }
      }) 
    }else {
      setIsLoggedIn(false);
      setUserId(null)
    }
  },[token])
  const handleLoginSubmit=loginData =>{
    console.log("handle login",loginData)
    API.login(loginData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleSignupSubmit=signupData =>{
    API.signup(signupData).then(data=>{
      if(data.token){
        setToken(data.token)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const logout = ()=>{
    setToken(null);
    localStorage.removeItem("token")
  }
  return (
   <BrowserRouter>
   <NavBar isLoggedIn={isLoggedIn} userId={userId} logout={logout}/>
   <hr/>
   <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/profile/:id" element={<Profile userId={userId} token={token}/>}/>
     {/* <Route path="/game/:id" element={<Game/>}/> */}
     <Route path="/login" element={<Login login={handleLoginSubmit} signup={handleSignupSubmit}/>}/>
    // ---------
      {/* <Route path="/" element={<App />} /> */}
      <Route path="avatar" element={<Avatar />} />
      <Route path="leaderboard_one" element={<LeaderboardSingle />} />
      <Route path="leaderboard_two" element={<LeaderboardDouble />} />
      <Route path="game" element={<Game />} />
      {/* <Route path="profile" element={<Profile />} /> */}
      <Route path="levels" element={<Levels />} />
      <Route path="aang" element={<Aang />} />
      <Route path="iroh" element={<Iroh />} />
      <Route path="toph" element={<Toph />} />
      <Route path="bumi" element={<Bumi />} />
      <Route path="momo" element={<Momo />} />
      <Route path="Katara" element={<Katara />} />
      <Route path="Sokka" element={<Sokka />} />
      <Route path="Appa" element={<Appa />} />

   </Routes>
   </BrowserRouter>
  );
}

export default App;






// ORIGINAL PAGE
//import logo from './logo.svg';
// import './App.css';
// import Welcome from './components/home';

// function App() {
//   return (
//     <div className="App" >
//       <Welcome />
//     </div>
//   );
// }

// export default App;
