import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaCalendarAlt,
  FaFilePdf,
  FaSearch,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileAlt,
} from "react-icons/fa";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/application/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Statistics
  // =========================

  const stats = useMemo(() => {
    return {
      total: applications.length,

      accepted: applications.filter(
        (app) => app.status === "accepted"
      ).length,

      pending: applications.filter(
        (app) => app.status === "pending"
      ).length,

      rejected: applications.filter(
        (app) => app.status === "rejected"
      ).length,
    };
  }, [applications]);

  // =========================
  // Search + Filter
  // =========================

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const title =
        application.job?.title?.toLowerCase() || "";

      const company =
        application.job?.company?.name?.toLowerCase() || "";

      const location =
        application.job?.location?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        company.includes(searchText) ||
        location.includes(searchText);

      const matchesFilter =
        filter === "all" ||
        application.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [applications, search, filter]);

  // =========================
  // Status UI
  // =========================

  const getStatus = (status) => {
    switch (status) {
      case "accepted":
        return {
          label: "Accepted",
          icon: <FaCheckCircle />,
          badge:
            "bg-green-50 text-green-700 border-green-200",
          dot: "bg-green-500",
          card: "border-l-4 border-l-green-500",
        };

      case "rejected":
        return {
          label: "Rejected",
          icon: <FaTimesCircle />,
          badge:
            "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
          card: "border-l-4 border-l-red-500",
        };

      default:
        return {
          label: "Pending",
          icon: <FaClock />,
          badge:
            "bg-yellow-50 text-yellow-700 border-yellow-200",
          dot: "bg-yellow-500",
          card: "border-l-4 border-l-yellow-500",
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1 min-w-0">

        <Navbar />

        <main className="p-4 md:p-8 max-w-7xl mx-auto">

          {/* ================= HEADER ================= */}

          <div className="mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">

                    <FaFileAlt className="text-xl" />

                  </div>

                  <div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                      My Applications
                    </h1>

                    <p className="text-slate-500 mt-1">
                      Track and manage your job applications
                    </p>

                  </div>

                </div>

              </div>

              <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200">

                <p className="text-xs text-slate-400 uppercase font-semibold">
                  Total Applications
                </p>

                <p className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </p>

              </div>

            </div>

          </div>

          {/* ================= STATS ================= */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            {/* Applied */}

            <button
              onClick={() => setFilter("all")}
              className={`text-left bg-white rounded-2xl p-5 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                filter === "all"
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Applied
                  </p>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {stats.total}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaFileAlt />
                </div>

              </div>

            </button>

            {/* Accepted */}

            <button
              onClick={() => setFilter("accepted")}
              className={`text-left bg-white rounded-2xl p-5 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                filter === "accepted"
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Accepted
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.accepted}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <FaCheckCircle />
                </div>

              </div>

            </button>

            {/* Pending */}

            <button
              onClick={() => setFilter("pending")}
              className={`text-left bg-white rounded-2xl p-5 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                filter === "pending"
                  ? "ring-2 ring-yellow-500"
                  : ""
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Pending
                  </p>

                  <p className="text-3xl font-bold text-yellow-500 mt-2">
                    {stats.pending}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                  <FaClock />
                </div>

              </div>

            </button>

            {/* Rejected */}

            <button
              onClick={() => setFilter("rejected")}
              className={`text-left bg-white rounded-2xl p-5 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                filter === "rejected"
                  ? "ring-2 ring-red-500"
                  : ""
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500 font-medium">
                    Rejected
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {stats.rejected}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <FaTimesCircle />
                </div>

              </div>

            </button>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-7">

            <div className="flex flex-col md:flex-row gap-3">

              <div className="relative flex-1">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search by job, company or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-5 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="all">
                  All Applications
                </option>

                <option value="accepted">
                  Accepted
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

          {/* ================= APPLICATIONS ================= */}

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold text-slate-800">
              Recent Applications
            </h2>

            <span className="text-sm text-slate-500">
              {filteredApplications.length} result
              {filteredApplications.length !== 1 ? "s" : ""}
            </span>

          </div>

          {/* Loading */}

          {loading && (

            <div className="grid md:grid-cols-2 gap-5">

              {[1, 2].map((item) => (

                <div
                  key={item}
                  className="bg-white rounded-2xl p-6 animate-pulse"
                >

                  <div className="h-6 bg-slate-200 rounded w-2/3 mb-4" />

                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-6" />

                  <div className="space-y-3">

                    <div className="h-4 bg-slate-200 rounded" />

                    <div className="h-4 bg-slate-200 rounded" />

                    <div className="h-4 bg-slate-200 rounded" />

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* No applications */}

          {!loading && applications.length === 0 && (

            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-5">

                <FaFileAlt />

              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                No Applications Yet
              </h2>

              <p className="text-slate-500 mt-2">
                Start applying for jobs and track your applications here.
              </p>

            </div>

          )}

          {/* No search results */}

          {!loading &&
            applications.length > 0 &&
            filteredApplications.length === 0 && (

              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">

                <FaSearch className="mx-auto text-3xl text-slate-300 mb-4" />

                <h2 className="text-xl font-bold text-slate-700">
                  No matching applications
                </h2>

                <p className="text-slate-500 mt-2">
                  Try another search or change the status filter.
                </p>

              </div>
            )}

          {/* Cards */}

          {!loading &&
            filteredApplications.length > 0 && (

              <div className="grid md:grid-cols-2 gap-5">

                {filteredApplications.map((application) => {

                  const status = getStatus(
                    application.status
                  );

                  return (

                    <div
                      key={application._id}
                      className={`group bg-white rounded-2xl shadow-sm border border-slate-200 ${status.card} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >

                      {/* Top */}

                      <div className="flex justify-between gap-4">

                        <div className="min-w-0">

                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
                            {application.job?.title}
                          </h3>

                          <p className="text-blue-600 font-semibold mt-1">
                            {application.job?.company?.name ||
                              "Company"}
                          </p>

                        </div>

                        <div
                          className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${status.badge}`}
                        >
                          {status.icon}
                          {status.label}
                        </div>

                      </div>

                      {/* Divider */}

                      <div className="border-t border-slate-100 my-5" />

                      {/* Details */}

                      <div className="grid grid-cols-2 gap-4">

                        <div className="flex gap-3">

                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <FaMapMarkerAlt />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Location
                            </p>

                            <p className="font-medium text-slate-700">
                              {application.job?.location ||
                                "Not specified"}
                            </p>
                          </div>

                        </div>

                        <div className="flex gap-3">

                          <div className="w-9 h-9 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                            <FaMoneyBillWave />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Salary
                            </p>

                            <p className="font-medium text-slate-700">
                              ₹ {application.job?.salary} LPA
                            </p>
                          </div>

                        </div>

                        <div className="flex gap-3">

                          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                            <FaBriefcase />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Job Type
                            </p>

                            <p className="font-medium text-slate-700">
                              {application.job?.jobType ||
                                "Not specified"}
                            </p>
                          </div>

                        </div>

                        <div className="flex gap-3">

                          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                            <FaCalendarAlt />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Applied
                            </p>

                            <p className="font-medium text-slate-700">
                              {application.createdAt
                                ? new Date(
                                    application.createdAt
                                  ).toLocaleDateString()
                                : "Recently"}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Bottom */}

                      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">

                        <div className="flex items-center gap-2 text-sm text-slate-500">

                          <span
                            className={`w-2 h-2 rounded-full ${status.dot}`}
                          />

                          Application Status

                        </div>

                        {application.applicant?.profile
                          ?.resume && (

                          <a
                            href={`https://ats-portal-tj20.onrender.com/${application.applicant.profile.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                          >

                            <FaFilePdf />

                            Resume

                            <FaArrowRight className="text-xs" />

                          </a>

                        )}

                      </div>

                    </div>

                  );
                })}

              </div>
            )}

        </main>

      </div>

    </div>
  );
}

export default Applications;