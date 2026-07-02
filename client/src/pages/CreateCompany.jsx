import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function CreateCompany() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/company/register",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Company Created Successfully");

      navigate("/companies");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 shadow-lg p-8 rounded">

      <h1 className="text-3xl font-bold mb-6">
        Create Company
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Company Name"
          className="w-full border p-3 rounded mb-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Create
        </button>

      </form>

    </div>
  );
}

export default CreateCompany;
