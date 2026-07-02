import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function EditJob() {
  const { id } = useParams();
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
    fetchCompanies();
    fetchJob();
  }, []);

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/company/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies(res.data.companies);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/job/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const job = res.data.job;

      setFormData({
        title: job.title,
        description: job.description,
        requirements: job.requirements.join(","),
        salary: job.salary,
        location: job.location,
        experience: job.experience,
        jobType: job.jobType,
        position: job.position,
        company: job.company._id,
      });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/job/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Updated Successfully");

      navigate("/jobs");

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 shadow-lg p-8 rounded">

      <h2 className="text-3xl font-bold mb-6">
        Edit Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Title"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Description"
        />

        <input
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Requirements"
        />

        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Salary"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Location"
        />

        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Experience"
        />

        <input
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Job Type"
        />

        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Open Positions"
        />

        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white px-5 py-2 rounded w-full">
          Update Job
        </button>

      </form>

    </div>
  );
}

export default EditJob;