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
import Aang from "./components/level_1/aang";
import Iroh from "./components/level_1/iroh";
import Toph from "./components/level_1/toph";
import Momo from "./components/level_1/momo";
import Bumi from "./components/level_1/bumi";
import Katara from "./components/level_1/katara";
import Sokka from "./components/level_1/sokka";
import Appa from "./components/level_1/appa";
import Aang_2 from "../src/components/level_2/aang_2"
import './style.css';
import './utils/API.js'

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
      <Route path="aang" element={<Aang />} />
      <Route path="iroh" element={<Iroh />} />
      <Route path="toph" element={<Toph />} />
      <Route path="bumi" element={<Bumi />} />
      <Route path="momo" element={<Momo />} />
      <Route path="katara" element={<Katara />} />
      <Route path="sokka" element={<Sokka />} />
      <Route path="appa" element={<Appa />} />
      <Route path="aang-2" element={<Aang_2 />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
