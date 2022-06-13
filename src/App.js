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
import Win from "./components/win"
import Aang from "./components/level_1/aang";
import Aang_2 from "./components/level_2/aang";
import Aang_3 from "./components/level_3/aang";
import Aang_4 from "./components/level_4/aang";
import Appa_1 from "./components/level_1/appa";
import Appa_2 from "./components/level_2/appa";
import Appa_3 from "./components/level_3/appa";
import Appa_4 from "./components/level_4/appa";
import Katara_1 from "./components/level_1/katara";
import Katara_2 from "./components/level_2/katara";
import Katara_3 from "./components/level_3/katara";
import Katara_4 from "./components/level_4/katara";
import Sokka_1 from "./components/level_1/sokka";
import Sokka_2 from "./components/level_2/sokka";
import Sokka_3 from "./components/level_3/sokka";
import Sokka_4 from "./components/level_4/sokka";
import Iroh_1 from "./components/level_1/iroh";
import Iroh_2 from "./components/level_2/iroh";
import Iroh_3 from "./components/level_3/iroh";
import Iroh_4 from "./components/level_4/iroh";
import Bumi_1 from "./components/level_1/bumi";
import Bumi_2 from "./components/level_2/bumi";
import Bumi_3 from "./components/level_3/bumi";
import Bumi_4 from "./components/level_4/bumi";
import Toph_1 from "./components/level_1/toph";
import Toph_2 from "./components/level_2/toph";
import Toph_3 from "./components/level_3/toph";
import Toph_4 from "./components/level_4/toph";
import Momo_1 from "./components/level_1/momo";
import Momo_2 from "./components/level_2/momo";
import Momo_3 from "./components/level_3/momo";
import Momo_4 from "./components/level_4/momo";
import NavBar from "./components/NavBar/index.js";
// import './style.css';
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
      <Route path="aang2" element={<Aang_2 />} />
      <Route path="aang3" element={<Aang_3 />} />
      <Route path="aang4" element={<Aang_4 />} />
      <Route path="win" element={<Win />} />
      <Route path="iroh1" element={<Iroh_1 />} />
      <Route path="iroh2" element={<Iroh_2 />} />
      <Route path="iroh3" element={<Iroh_3 />} />
      <Route path="iroh4" element={<Iroh_4 />} />
      <Route path="toph1" element={<Toph_1 />} />
      <Route path="toph2" element={<Toph_2 />} />
      <Route path="toph3" element={<Toph_3 />} />
      <Route path="toph4" element={<Toph_4 />} />
      <Route path="bumi1" element={<Bumi_1 />} />
      <Route path="bumi2" element={<Bumi_2 />} />
      <Route path="bumi3" element={<Bumi_3 />} />
      <Route path="bumi4" element={<Bumi_4 />} />
      <Route path="momo1" element={<Momo_1 />} />
      <Route path="momo2" element={<Momo_2 />} />
      <Route path="momo3" element={<Momo_3 />} />
      <Route path="momo4" element={<Momo_4 />} />
      <Route path="katara1" element={<Katara_1 />} />
      <Route path="katara2" element={<Katara_2 />} />
      <Route path="katara3" element={<Katara_3 />} />
      <Route path="katara4" element={<Katara_4 />} />
      <Route path="sokka1" element={<Sokka_1 />} />
      <Route path="sokka2" element={<Sokka_2 />} />
      <Route path="sokka3" element={<Sokka_3 />} />
      <Route path="sokka4" element={<Sokka_4 />} />
      <Route path="appa1" element={<Appa_1 />} />
      <Route path="appa2" element={<Appa_2 />} />
      <Route path="appa3" element={<Appa_3 />} />
      <Route path="appa4" element={<Appa_4 />} />

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
