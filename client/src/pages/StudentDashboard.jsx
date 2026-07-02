import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function StudentDashboard() {
  const [stats, setStats] = useState({
    applied: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/student-dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.stats);
      setRecentApplications(res.data.recentApplications);

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

          <h1 className="text-3xl font-bold mb-8">
            Student Dashboard
          </h1>

          <div className="grid md:grid-cols-4 gap-5">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Applied</h2>
              <p className="text-4xl font-bold text-blue-600 mt-3">
                {stats.applied}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Accepted</h2>
              <p className="text-4xl font-bold text-green-600 mt-3">
                {stats.accepted}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Pending</h2>
              <p className="text-4xl font-bold text-yellow-500 mt-3">
                {stats.pending}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500">Rejected</h2>
              <p className="text-4xl font-bold text-red-600 mt-3">
                {stats.rejected}
              </p>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mt-10">

            <h2 className="text-2xl font-bold mb-5">
              Recent Applications
            </h2>

            {recentApplications.length === 0 ? (

              <p>No Applications Found</p>

            ) : (

              recentApplications.map((application) => (

                <div
                  key={application._id}
                  className="border-b py-4 flex justify-between items-center"
                >
                  <div>

                    <h3 className="font-semibold">
                      {application.job?.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {application.job?.company?.name}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      application.status === "accepted"
                        ? "bg-green-600"
                        : application.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {application.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;