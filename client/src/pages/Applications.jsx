import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaCalendarAlt,
  FaFilePdf,
} from "react-icons/fa";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/application/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-2">
            📄 My Applications
          </h1>

          <p className="text-gray-500 mb-8">
            Track all your job applications here.
          </p>

          {applications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-10 text-center">
              <h2 className="text-2xl font-bold">
                😔 No Applications Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Apply for jobs and they will appear here.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {applications.map((application) => (

                <div
                  key={application._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                >

                  <div className="flex justify-between items-center">

                    <div>
                      <h2 className="text-2xl font-bold">
                        {application.job?.title}
                      </h2>

                      <p className="text-blue-600 font-medium">
                        {application.job?.company?.name}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${statusStyle(
                        application.status
                      )}`}
                    >
                      {application.status.toUpperCase()}
                    </span>

                  </div>

                  <div className="mt-5 space-y-2">

                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      {application.job?.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-500" />
                      ₹ {application.job?.salary} LPA
                    </p>

                    <p className="flex items-center gap-2">
                      <FaBriefcase className="text-blue-500" />
                      {application.job?.jobType}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-500" />
                      Applied on{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="mt-6 flex gap-3">

                    {application.applicant?.profile?.resume && (
                      <a
                        href={`https://ats-portal-tj20.onrender.com/${application.applicant.profile.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        <FaFilePdf />
                        Resume
                      </a>
                    )}

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Applications;