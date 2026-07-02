import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function JobCard({ job, isApplied }) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(isApplied);

 const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    setApplied(isApplied);
  }, [isApplied]);

  const applyJob = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        `/application/apply/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setApplied(true);
    } catch (error) {
      if (error.response?.data?.message === "Already Applied") {
        setApplied(true);
      }

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border">

      {/* Company */}

      <p className="text-sm text-blue-600 font-semibold">
        {job.company?.name}
      </p>

      {/* Title */}

      <h2 className="text-2xl font-bold mt-2">
        {job.title}
      </h2>

      {/* Description */}

      <p className="text-gray-600 mt-3 line-clamp-3">
        {job.description}
      </p>

      {/* Details */}

      <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

        <div>
          <span className="font-semibold">📍 Location</span>
          <br />
          {job.location}
        </div>

        <div>
          <span className="font-semibold">💼 Job Type</span>
          <br />
          {job.jobType}
        </div>

        <div>
          <span className="font-semibold">💰 Salary</span>
          <br />
          ₹ {job.salary} LPA
        </div>

        <div>
          <span className="font-semibold">⭐ Experience</span>
          <br />
          {job.experience} Years
        </div>

      </div>

      {/* Requirements */}

      <div className="mt-5">

        <h3 className="font-semibold mb-2">
          Skills Required
        </h3>

        <div className="flex flex-wrap gap-2">

          {job.requirements?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Buttons */}

<div className="flex gap-3 mt-6">

  <Link
    to={`/jobs/${job._id}`}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
  >
    View Details
  </Link>

 {user?.role === "recruiter" && (
  <>
    <Link
      to={`/jobs/edit/${job._id}`}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
    >
      Edit
    </Link>

   <Link
  to={`/applicants/${job._id}`}
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
>
  Applicants
</Link>
  </>
)}
  {user?.role === "student" && (
    <button
      onClick={applyJob}
      disabled={loading || applied}
      className={`px-5 py-2 rounded-lg text-white ${
        applied
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {loading
        ? "Applying..."
        : applied
        ? "Applied ✅"
        : "Apply Now"}
    </button>
  )}

</div>
    </div>
  );
}

export default JobCard;