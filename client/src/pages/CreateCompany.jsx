import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function CreateCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter company name");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/company/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Company created successfully!");

      navigate("/companies");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 min-w-0">

        <Navbar />

        <main className="max-w-5xl mx-auto p-5 md:p-10">

          {/* BACK */}

          <button
            onClick={() => navigate("/companies")}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition"
          >
            <FaArrowLeft />
            Back to Companies
          </button>

          {/* HEADER */}

          <div className="mb-8">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg">
                <FaBuilding />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                  Create Company
                </h1>

                <p className="text-gray-500 mt-1">
                  Add a new company to your ATS Portal
                </p>
              </div>

            </div>

          </div>

          {/* FORM CARD */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* TOP BANNER */}

            <div className="relative h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">

              <div className="absolute -right-10 -top-20 w-60 h-60 bg-white/10 rounded-full"></div>

              <div className="absolute right-40 -bottom-20 w-40 h-40 bg-white/10 rounded-full"></div>

              <div className="relative h-full flex items-center px-8">

                <div className="text-white">

                  <h2 className="text-2xl font-bold">
                    Company Information
                  </h2>

                  <p className="text-blue-100 mt-1">
                    Enter the basic details of your company
                  </p>

                </div>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-10"
            >

              <div className="grid md:grid-cols-2 gap-6">

                {/* COMPANY NAME */}

                <div className="md:col-span-2">

                  <label className="block font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>

                  <div className="relative">

                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

                {/* LOCATION */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Location
                  </label>

                  <div className="relative">

                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, India"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

                {/* WEBSITE */}

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Website
                  </label>

                  <div className="relative">

                    <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />

                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://company.com"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                    />

                  </div>

                </div>

              </div>

              {/* PREVIEW */}

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">

                <p className="text-sm font-semibold text-blue-600 mb-3">
                  LIVE PREVIEW
                </p>

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl">
                    <FaBuilding />
                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-gray-800">
                      {formData.name || "Your Company Name"}
                    </h3>

                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">

                      <span>
                        📍 {formData.location || "Location"}
                      </span>

                      <span>
                        🌐 {formData.website || "Website"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8">

                <button
                  type="button"
                  onClick={() => navigate("/companies")}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaCheck />

                  {loading
                    ? "Creating..."
                    : "Create Company"}
                </button>

              </div>

            </form>

          </div>

        </main>

      </div>

    </div>
  );
}

export default CreateCompany;