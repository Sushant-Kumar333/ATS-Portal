import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserTie,
} from "react-icons/fa";
function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/login", formData);
      const user = res.data.user;

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(user));

alert(res.data.message);

// Role Based Redirect
if (user.role === "student") {
  navigate("/student-dashboard");
} else if (user.role === "recruiter") {
  navigate("/dashboard");
} else {
  navigate("/");
}

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 -top-20 -left-20"></div>

      <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      <form
        onSubmit={handleSubmit}
        className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10"
      >

        {/* Logo */}
      <div className="text-center mb-8">

  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-2xl mb-5">

    <FaUserTie className="text-white text-4xl" />

  </div>

  <h1 className="text-5xl font-extrabold text-white tracking-wide">
    ATS Portal
  </h1>

  <p className="text-blue-100 text-lg mt-2">
    Applicant Tracking System
  </p>

</div>
        {/* Email */}

        <div className="relative mb-5">

          <FaEnvelope className="absolute left-4 top-4 text-gray-300" />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/20 border border-white/20 rounded-xl py-3 pl-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Password */}

        <div className="relative mb-6">

          <FaLock className="absolute left-4 top-4 text-gray-300" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-white/20 border border-white/20 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Button */}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 duration-300 transition-all text-white py-3 rounded-xl font-bold text-lg shadow-xl"
        >
           Login
        </button>

        <div className="mt-6">

  <p className="text-center text-gray-300 text-sm">
    Secure Recruitment Platform
  </p>

  <p className="text-center text-gray-300 mt-3">

    Don't have an account?{" "}

    <span
      onClick={() => navigate("/register")}
      className="text-blue-400 hover:text-blue-300 cursor-pointer font-semibold"
    >
      Register Here
    </span>

  </p>

</div>

      </form>

    </div>
  );
}

export default Login;