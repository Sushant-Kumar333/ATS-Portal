import API from "../api/api";

export const registerUser = (userData) => {
  return API.post("/user/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/user/login", userData);
};