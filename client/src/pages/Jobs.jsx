import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

useEffect(() => {
  getJobs();
}, [keyword, location, jobType]);

useEffect(() => {
  getAppliedJobs();
}, []);
  // Get All Jobs
  const getJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/job/get?keyword=${keyword}&location=${location}&jobType=${jobType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data.jobs);

    } catch (error) {
      console.log(error);
    }
  };

  // Get Applied Jobs
  const getAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/application/applied", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppliedJobs(res.data.appliedJobs);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Jobs
          </h1>

          <div className="flex gap-4 mb-6">

            <input
              className="border p-2 rounded w-60"
              placeholder="Search Job"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <input
              className="border p-2 rounded w-60"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All Types</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>

            <button
              onClick={getJobs}
              className="bg-blue-600 text-white px-5 rounded"
            >
              Search
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isApplied={appliedJobs.includes(job._id)}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Jobs;