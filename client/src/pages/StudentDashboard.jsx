import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function StudentDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    applied: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/student-dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(
        res.data.stats || {
          applied: 0,
          accepted: 0,
          pending: 0,
          rejected: 0,
        }
      );

      setRecentApplications(res.data.recentApplications || []);
    } catch (error) {
      console.log("Student Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const successRate =
    stats.applied > 0
      ? Math.round((stats.accepted / stats.applied) * 100)
      : 0;

  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "accepted") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    if (value === "rejected") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const getStatusIcon = (status) => {
    const value = status?.toLowerCase();

    if (value === "accepted") return "✓";
    if (value === "rejected") return "✕";

    return "⏳";
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <main className="p-4 md:p-8">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                ATS PORTAL
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-1">
                Welcome back{user?.fullname ? `, ${user.fullname}` : ""}! 👋
              </h1>

              <p className="text-slate-500 mt-2">
                Track your applications and continue your career journey.
              </p>
            </div>

            <button
              onClick={getDashboard}
              className="self-start md:self-auto px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 font-semibold text-slate-700"
            >
              ↻ Refresh
            </button>

          </div>


          {/* STAT CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Applied */}

            <div className="group bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Applied
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    {loading ? "..." : stats.applied}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  📄
                </div>

              </div>

              <p className="text-blue-100 text-sm mt-5">
                Jobs you have applied for
              </p>

            </div>


            {/* Accepted */}

            <div className="group bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Accepted
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    {loading ? "..." : stats.accepted}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  ✓
                </div>

              </div>

              <p className="text-green-100 text-sm mt-5">
                Applications accepted
              </p>

            </div>


            {/* Pending */}

            <div className="group bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Pending
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    {loading ? "..." : stats.pending}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  ⏳
                </div>

              </div>

              <p className="text-orange-100 text-sm mt-5">
                Waiting for response
              </p>

            </div>


            {/* Rejected */}

            <div className="group bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-red-100 text-sm font-medium">
                    Rejected
                  </p>

                  <h2 className="text-4xl font-extrabold mt-3">
                    {loading ? "..." : stats.rejected}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  ✕
                </div>

              </div>

              <p className="text-red-100 text-sm mt-5">
                Applications not selected
              </p>

            </div>

          </div>


          {/* MIDDLE SECTION */}

          <div className="grid lg:grid-cols-3 gap-6 mt-6">

            {/* APPLICATION OVERVIEW */}

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Application Overview
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your application progress
                  </p>
                </div>

                <div className="text-2xl">
                  📊
                </div>

              </div>


              {/* Progress */}

              <div className="mb-7">

                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-600">
                    Acceptance Rate
                  </span>

                  <span className="font-bold text-blue-600">
                    {successRate}%
                  </span>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                    style={{
                      width: `${successRate}%`,
                    }}
                  />

                </div>

              </div>


              {/* Mini Stats */}

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {stats.accepted}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Accepted
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Pending
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {stats.rejected}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Rejected
                  </p>
                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <h2 className="text-xl font-bold text-slate-800">
                Quick Actions
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-5">
                Continue your job search
              </p>


              <div className="space-y-3">

                <button
                  onClick={() => navigate("/jobs")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 hover:translate-x-1 transition-all text-left"
                >
                  <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg">
                    🔍
                  </span>

                  <div>
                    <p className="font-bold text-slate-800">
                      Browse Jobs
                    </p>

                    <p className="text-xs text-slate-500">
                      Find new opportunities
                    </p>
                  </div>

                  <span className="ml-auto">
                    →
                  </span>
                </button>


                <button
                  onClick={() => navigate("/applications")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 hover:translate-x-1 transition-all text-left"
                >
                  <span className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center text-lg">
                    📄
                  </span>

                  <div>
                    <p className="font-bold text-slate-800">
                      My Applications
                    </p>

                    <p className="text-xs text-slate-500">
                      Track your applications
                    </p>
                  </div>

                  <span className="ml-auto">
                    →
                  </span>
                </button>


                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 hover:translate-x-1 transition-all text-left"
                >
                  <span className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg">
                    👤
                  </span>

                  <div>
                    <p className="font-bold text-slate-800">
                      My Profile
                    </p>

                    <p className="text-xs text-slate-500">
                      Update your information
                    </p>
                  </div>

                  <span className="ml-auto">
                    →
                  </span>
                </button>

              </div>

            </div>

          </div>


          {/* RECENT APPLICATIONS */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 overflow-hidden">

            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Recent Applications
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your latest job applications
                </p>
              </div>

              <button
                onClick={() => navigate("/applications")}
                className="text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                View All →
              </button>

            </div>


            <div className="divide-y divide-slate-100">

              {loading ? (

                <div className="p-10 text-center text-slate-500">
                  Loading applications...
                </div>

              ) : recentApplications.length === 0 ? (

                <div className="p-12 text-center">

                  <div className="text-5xl mb-4">
                    📭
                  </div>

                  <h3 className="font-bold text-lg text-slate-700">
                    No Applications Yet
                  </h3>

                  <p className="text-sm text-slate-500 mt-1 mb-5">
                    Start applying to jobs and track them here.
                  </p>

                  <button
                    onClick={() => navigate("/jobs")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                  >
                    Find Jobs →
                  </button>

                </div>

              ) : (

                recentApplications.map((application) => {

                  const status =
                    application.status?.toLowerCase() || "pending";

                  return (

                    <div
                      key={application._id}
                      className="p-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-slate-50 transition-colors"
                    >

                      {/* Company Avatar */}

                      <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                        {application.job?.company?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "C"}
                      </div>


                      {/* Job Info */}

                      <div className="flex-1">

                        <h3 className="font-bold text-slate-800 text-lg">
                          {application.job?.title || "Job"}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {application.job?.company?.name || "Company"}
                        </p>

                      </div>


                      {/* Status */}

                      <span
                        className={`px-4 py-2 rounded-full border font-semibold text-sm ${getStatusClass(
                          status
                        )}`}
                      >
                        {getStatusIcon(status)}{" "}
                        {application.status || "Pending"}
                      </span>


                      {/* View */}

                      {application.job?._id && (
                        <button
                          onClick={() =>
                            navigate(`/jobs/${application.job._id}`)
                          }
                          className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-white hover:border-blue-300 hover:text-blue-600 transition font-medium"
                        >
                          View Job
                        </button>
                      )}

                    </div>

                  );
                })

              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;