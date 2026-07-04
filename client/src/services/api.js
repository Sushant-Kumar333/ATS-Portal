import axios from "axios";

export default axios.create({
  baseURL: "https://ats-portal-tj20.onrender.com/api/v1",
});