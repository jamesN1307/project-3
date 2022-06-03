import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './components/game';
import Avatar from "./components/avatar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./routes/login";
import LeaderboardSingle from "./components/single_leaderboard";
import LeaderboardDouble from "./components/double_leaderboard";
import Profile from "./components/profile";
import Levels from "./components/levelSelect";
import Matter from "./components/matter";
import './style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="avatar" element={<Avatar />} />
      <Route path="login" element={<Login />} />
      <Route path="leaderboard_one" element={<LeaderboardSingle />} />
      <Route path="leaderboard_two" element={<LeaderboardDouble />} />
      <Route path="game" element={<Game />} />
      <Route path="profile" element={<Profile />} />
      <Route path="levels" element={<Levels />} />
      <Route path="matter" element={<Matter />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
