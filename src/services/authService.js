// src/services/authService.js

import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

export const get = (route) => {
  const token = localStorage.getItem("authToken");

  return axios.get(SERVER_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const post = (route, body) => {
  const token = localStorage.getItem("authToken");

  return axios.post(SERVER_URL + route, body, {
    headers: { Authorization: `Bearer ${token}`},
  });
};

export const put = (route, body) => {
  const token = localStorage.getItem("authToken");

  return axios.put(SERVER_URL + route, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const del = (route) => {
  const token = localStorage.getItem("authToken");

  return axios.delete(SERVER_URL + route, {
    headers: { Authorization: `Bearer ${token}` },
  });
};