import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function CreateJob() {

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experience: "",
    jobType: "",
    position: "",
    company: "",
  });

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/company/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       console.log("Companies =", res.data.companies);

      setCompanies(res.data.companies);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createJob = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/job/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      navigate("/jobs");

    } catch (error) {
  console.log("Status:", error.response.status);
  console.log("Error:", error.response.data);
  console.log("Form:", formData);

  alert(error.response?.data?.message || "Server Error");
}
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="max-w-3xl mx-auto p-8">

          <h1 className="text-4xl font-bold mb-8">
            Create Job
          </h1>

          <form
            onSubmit={createJob}
            className="bg-white p-8 rounded-xl shadow-lg space-y-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Job Title"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="requirements"
              placeholder="React, Node, MongoDB"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              name="experience"
              placeholder="Experience"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="jobType"
              placeholder="Full Time"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              name="position"
              placeholder="Open Positions"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <select
  name="company"
  value={formData.company}
  className="w-full border p-3 rounded"
  onChange={handleChange}
>
  <option value="">Select Company</option>

  {companies.map((company) => (
    <option
      key={company._id}
      value={company._id}
    >
      {company.name}
    </option>
  ))}
</select>


            <button
              className="bg-blue-600 text-white px-6 py-3 rounded"
            >
              Create Job
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateJob;