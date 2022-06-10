//DEVELOP
const BASE_URL = "http://localhost:3001";
//PROD
// const BASE_URL = "https://stormy-citadel-38044.herokuapp.com";

const API = {
  getAllUsers: () => {
    return fetch(`${BASE_URL}/api/users`).then((res) => res.json());
  },
  getOneUser: (userId) => {
    return fetch(`${BASE_URL}/api/users/${userId}`).then((res) => res.json());
  },
  verify: (token) => {
    return fetch(`${BASE_URL}/api/users/verifyToken`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  collectScore: ( scoreLevel, level) => {
    return fetch(`${BASE_URL}/api/scores`,{
      method: "POST",
      body: JSON.stringify({
        score : scoreLevel,
        level : level,
      }
        ),
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer${token}`,
      },
    }).then((res) => res.json());
  },
  login: (userData) => {
    return fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  signup: (userData) => {
    return fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};

export default API;
