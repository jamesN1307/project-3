import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Avatar from "./components/avatar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./routes/login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="avatar" element={<Avatar />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
