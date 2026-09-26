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
    <article className="job-card">

      {/* TOP */}
      <div className="job-card-top">

        <div className="company-logo">
          {job.company?.name?.charAt(0)?.toUpperCase() || "C"}
        </div>

        <div className="job-company">
          <span>{job.company?.name || "Company"}</span>

          <div className="job-posted">
            ● Open Position
          </div>
        </div>

        <div className="job-type-badge">
          {job.jobType}
        </div>

      </div>

      {/* TITLE */}
      <h2 className="job-title">
        {job.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="job-description">
        {job.description || "No description available."}
      </p>

      {/* INFORMATION */}
      <div className="job-info-grid">

        <div className="job-info">
          <div className="info-icon location-icon">📍</div>
          <div>
            <span>Location</span>
            <strong>{job.location || "Not specified"}</strong>
          </div>
        </div>

        <div className="job-info">
          <div className="info-icon salary-icon">₹</div>
          <div>
            <span>Salary</span>
            <strong>₹ {job.salary} LPA</strong>
          </div>
        </div>

        <div className="job-info">
          <div className="info-icon experience-icon">★</div>
          <div>
            <span>Experience</span>
            <strong>{job.experience} Years</strong>
          </div>
        </div>

        <div className="job-info">
          <div className="info-icon position-icon">👥</div>
          <div>
            <span>Positions</span>
            <strong>{job.position || "Multiple"}</strong>
          </div>
        </div>

      </div>

      {/* SKILLS */}
      {job.requirements?.length > 0 && (
        <div className="job-skills">

          <div className="skills-heading">
            Skills Required
          </div>

          <div className="skills-list">

            {job.requirements.map((skill, index) => (
              <span key={index}>
                {skill}
              </span>
            ))}

          </div>

        </div>
      )}

      {/* ACTIONS */}
      <div className="job-actions">

        <Link
          to={`/jobs/${job._id}`}
          className="details-btn"
        >
          View Details
          <span>→</span>
        </Link>

        {user?.role === "student" && (
          <button
            onClick={applyJob}
            disabled={loading || applied}
            className={`apply-btn ${
              applied ? "applied-btn" : ""
            }`}
          >
            {loading
              ? "Applying..."
              : applied
              ? "Applied ✓"
              : "Apply Now →"}
          </button>
        )}

        {user?.role === "recruiter" && (
          <div className="recruiter-actions">

            <Link
              to={`/jobs/edit/${job._id}`}
              className="edit-btn"
            >
              Edit
            </Link>

            <Link
              to={`/applicants/${job._id}`}
              className="applicants-btn"
            >
              Applicants
            </Link>

          </div>
        )}

      </div>

    </article>
  );
}

export default JobCard;