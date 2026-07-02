import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function RegisterCompany() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");

  const registerCompany = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/company/register",
        {
          name: companyName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      navigate("/company");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="max-w-xl mx-auto mt-16">

          <form
            onSubmit={registerCompany}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <h1 className="text-3xl font-bold mb-6">
              Register Company
            </h1>

            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Register Company
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default RegisterCompany;