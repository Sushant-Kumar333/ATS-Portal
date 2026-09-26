import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserTie,
  FaShieldAlt,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const res = await API.post("/user/login", formData);
      const user = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "student") {
        navigate("/student-dashboard");
      } else if (user.role === "recruiter") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden">

      {/* Background effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl px-6 sm:px-10 py-8 sm:py-10"
        >

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
              <FaUserTie className="text-white text-4xl" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              ATS Portal
            </h1>

            <p className="text-blue-100 mt-2">
              Applicant Tracking System
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-5">
              Welcome Back 👋
            </h2>

            <p className="text-gray-300 text-sm mt-1">
              Login to continue your career journey
            </p>

          </div>

          {/* Email */}
          <div className="mb-5">

            <label className="block text-white font-semibold mb-2">
              Email Address
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 pl-12 pr-4 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              />

            </div>

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-white font-semibold mb-2">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-12 rounded-xl bg-white/15 border border-white/20 text-white placeholder-gray-300 pl-12 pr-12 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-lg shadow-lg transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Secure message */}
          <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-300">
            <FaShieldAlt className="text-green-400" />
            <span>Secure Recruitment Platform</span>
          </div>

          {/* Register */}
          <p className="text-center text-gray-300 mt-4 text-sm">
            Don't have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-300 font-bold"
            >
              Register Here
            </button>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;