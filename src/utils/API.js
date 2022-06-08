//DEVELOP
const BASE_URL = "http://localhost:3001";
//PROD
//const BASE_URL="https://mysterious-anchorage-31370.herokuapp.com"

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
