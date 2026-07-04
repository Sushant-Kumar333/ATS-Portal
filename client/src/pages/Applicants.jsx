import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import toast from "react-hot-toast";

function Applicants() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applications, setApplications] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getRecruiterJobs();
  }, []);

  useEffect(() => {
    if (id) {
      getApplicants(id);
      setSelectedJob(id);
    }
  }, [id]);

  // =============================
  // Recruiter's Jobs
  // =============================
  const getRecruiterJobs = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    const res = await API.get("/job/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    setJobs(res.data.jobs);

  } catch (err) {
    console.log(err.response?.data);
  }
}; // =============================
  // Applicants of Selected Job
  // =============================
  const getApplicants = async (jobId) => {
  try {
    console.log("Selected Job:", jobId);

    const token = localStorage.getItem("token");

    const res = await API.get(`/application/applicants/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Applicants Response:", res.data);

    setApplications(res.data.applications);
    setSelectedJob(jobId);

  } catch (error) {
    console.log("Applicants Error:", error.response?.data || error);
  }
};
  // =============================
  // Update Status
  // =============================
  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/application/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    

toast.success(res.data.message);

      getApplicants(selectedJob);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Applicants</h1>

          {/* Jobs */}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Select Job</h2>

            <div className="flex flex-wrap gap-3">
              {jobs.map((job) => (
                <button
                  key={job._id}
                  onClick={() => getApplicants(job._id)}
                  className={`px-5 py-2 rounded-lg text-white ${
                    selectedJob === job._id
                      ? "bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {job.title}
                </button>
              ))}
            </div>
          </div>

          {/* Applicants */}

          {applications.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold">
                No Applicants Found
              </h2>
            </div>
          ) : (
            <div className="grid gap-5">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white rounded-xl shadow p-6"
                >
                  <h2 className="text-2xl font-bold">
                    {app.applicant?.fullname}
                  </h2>

                  <p className="mt-2">
                    <b>Email:</b> {app.applicant?.email}
                  </p>

                  <p>
                    <b>Phone:</b> {app.applicant?.phoneNumber}
                  </p>

                  <p className="mt-2">
                    <b>Status:</b>{" "}
                    <span
                      className={`font-bold ${
                        app.status === "accepted"
                          ? "text-green-600"
                          : app.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </p>

                  {/* Resume */}

                  {app.applicant?.profile?.resume && (
                   <a
  href={`https://ats-portal-tj20.onrender.com/${app.applicant.profile.resume}`}
  target="_blank"
  rel="noreferrer"
  className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  📄 Download Resume
</a>
                  )}

                  {/* Buttons */}

                  <div className="flex gap-4 mt-5">
                    <button
  onClick={() => updateStatus(app._id, "accepted")}
  disabled={app.status === "accepted"}
  className={`px-5 py-2 rounded-lg text-white ${
    app.status === "accepted"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  Accept
</button>

                   <button
  onClick={() => updateStatus(app._id, "rejected")}
  disabled={app.status === "rejected"}
  className={`px-5 py-2 rounded-lg text-white ${
    app.status === "rejected"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}
>
  Reject
</button>                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Applicants;