import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './components/game'
import Avatar from "./components/avatar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./routes/login";
import Leaderboard from "./components/leaderboard";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="avatar" element={<Avatar />} />
      <Route path="login" element={<Login />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
