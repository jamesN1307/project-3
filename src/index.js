





import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();







// ORIGINAL PAGE
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Game from './components/game';
// import Avatar from "./components/avatar";
// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Login from "./routes/loginJb";
// import LeaderboardSingle from "./components/single_leaderboard";
// import LeaderboardDouble from "./components/double_leaderboard";
// import Profile from "./components/profile";
// import Levels from "./components/levelSelect";
// import Matter from "./components/matter";
// import Iroh from "./components/levels/iroh";
// import Toph from "./components/levels/toph";
// import Momo from "./components/levels/momo";
// import Bumi from "./components/levels/bumi";
// import Katara from "./components/character/katara";
// import Sokka from "./components/character/sokka";
// import Appa from "./components/character/appa";
// import './style.css';
// import './utils/API.js'



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="avatar" element={<Avatar />} />
//       <Route path="login" element={<Login />} />
//       <Route path="leaderboard_one" element={<LeaderboardSingle />} />
//       <Route path="leaderboard_two" element={<LeaderboardDouble />} />
//       <Route path="game" element={<Game />} />
//       <Route path="profile" element={<Profile />} />
//       <Route path="levels" element={<Levels />} />
//       <Route path="matter" element={<Matter />} />
//       <Route path="iroh" element={<Iroh />} />
//       <Route path="toph" element={<Toph />} />
//       <Route path="bumi" element={<Bumi />} />
//       <Route path="momo" element={<Momo />} />
//       <Route path="Katara" element={<Katara />} />
//       <Route path="Sokka" element={<Sokka />} />
//       <Route path="Appa" element={<Appa />} />
//     </Routes>
//   </BrowserRouter>
// );