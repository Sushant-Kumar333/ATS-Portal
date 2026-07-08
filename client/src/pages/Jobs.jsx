import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import JobCard from "../components/JobCard";

function Jobs() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, [keyword, location, jobType]);

  useEffect(() => {
    if (user?.role === "student") {
      getAppliedJobs();
    }
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Jobs</h1>

            {user?.role === "recruiter" && (
              <button
                onClick={() => navigate("/jobs/create")}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                + Create Job
              </button>
            )}
          </div>

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
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>

            <button
              onClick={getJobs}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded"
            >
              Search
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No Jobs Found
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isApplied={appliedJobs.includes(job._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;