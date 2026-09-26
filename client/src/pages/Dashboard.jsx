import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats({
        totalCompanies: res.data.totalCompanies || 0,
        totalJobs: res.data.totalJobs || 0,
        totalApplications: res.data.totalApplications || 0,
        accepted: res.data.accepted || 0,
        pending: res.data.pending || 0,
        rejected: res.data.rejected || 0,
      });

      setRecentJobs(res.data.recentJobs || []);
      setRecentApplications(res.data.recentApplications || []);
    } catch (err) {
      console.log("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Accepted",
      value: stats.accepted,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ];

  const statCards = [
    {
      title: "Total Companies",
      value: stats.totalCompanies,
      icon: "🏢",
      className: "stat-blue",
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: "💼",
      className: "stat-green",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: "📄",
      className: "stat-purple",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: "✓",
      className: "stat-orange",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <main className="dashboard-content">

          {/* HEADER */}

          <div className="dashboard-header">

            <div>
              <p className="dashboard-small-title">
                ATS PORTAL
              </p>

              <h1>
                Dashboard Overview
              </h1>

              <p className="dashboard-subtitle">
                Track jobs, applications and recruitment activity.
              </p>
            </div>

            <button
              onClick={getDashboard}
              className="refresh-dashboard-btn"
            >
              ↻ Refresh
            </button>

          </div>

          {/* STAT CARDS */}

          <div className="dashboard-stat-grid">

            {statCards.map((card, index) => (
              <div
                key={index}
                className={`dashboard-stat-card ${card.className}`}
              >

                <div className="stat-card-top">

                  <div className="stat-icon">
                    {card.icon}
                  </div>

                  <span className="stat-arrow">
                    ↗
                  </span>

                </div>

                <p>{card.title}</p>

                <h2>
                  {loading ? "..." : card.value}
                </h2>

                <div className="stat-line" />

              </div>
            ))}

          </div>

          {/* CHART + QUICK STATS */}

          <div className="dashboard-middle-grid">

            {/* CHART */}

            <div className="dashboard-panel chart-panel">

              <div className="panel-header">

                <div>
                  <h2>Application Analytics</h2>
                  <p>
                    Current application status
                  </p>
                </div>

                <div className="analytics-badge">
                  Live
                </div>

              </div>

              <div className="chart-container">

                {stats.totalApplications === 0 ? (
                  <div className="empty-chart">
                    <span>📊</span>
                    <h3>No application data</h3>
                    <p>
                      Application statistics will appear here.
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={330}>
                    <PieChart>

                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={105}
                        innerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index]}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow:
                            "0 10px 30px rgba(0,0,0,.12)",
                        }}
                      />

                    </PieChart>
                  </ResponsiveContainer>
                )}

              </div>

              <div className="chart-legend">

                <div>
                  <span className="legend-dot accepted-dot" />
                  Accepted
                  <strong>{stats.accepted}</strong>
                </div>

                <div>
                  <span className="legend-dot pending-dot" />
                  Pending
                  <strong>{stats.pending}</strong>
                </div>

                <div>
                  <span className="legend-dot rejected-dot" />
                  Rejected
                  <strong>{stats.rejected}</strong>
                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="dashboard-panel quick-panel">

              <div className="panel-header">

                <div>
                  <h2>Quick Actions</h2>
                  <p>
                    Manage your ATS portal
                  </p>
                </div>

              </div>

              <div className="quick-actions">

                <button
                  onClick={() => navigate("/jobs")}
                  className="quick-action"
                >
                  <span className="quick-icon blue-icon">
                    🔎
                  </span>

                  <div>
                    <strong>Browse Jobs</strong>
                    <small>
                      Explore available opportunities
                    </small>
                  </div>

                  <span>→</span>
                </button>

                <button
                  onClick={() => navigate("/companies")}
                  className="quick-action"
                >
                  <span className="quick-icon purple-icon">
                    🏢
                  </span>

                  <div>
                    <strong>Companies</strong>
                    <small>
                      View registered companies
                    </small>
                  </div>

                  <span>→</span>
                </button>

                <button
                  onClick={() => navigate("/applications")}
                  className="quick-action"
                >
                  <span className="quick-icon green-icon">
                    📄
                  </span>

                  <div>
                    <strong>Applications</strong>
                    <small>
                      Track application status
                    </small>
                  </div>

                  <span>→</span>
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="quick-action"
                >
                  <span className="quick-icon orange-icon">
                    👤
                  </span>

                  <div>
                    <strong>My Profile</strong>
                    <small>
                      Update your profile
                    </small>
                  </div>

                  <span>→</span>
                </button>

              </div>

            </div>

          </div>

          {/* RECENT SECTION */}

          <div className="dashboard-bottom-grid">

            {/* RECENT JOBS */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>Recent Jobs</h2>
                  <p>
                    Latest opportunities
                  </p>
                </div>

                <button
                  onClick={() => navigate("/jobs")}
                  className="view-all-btn"
                >
                  View All →
                </button>

              </div>

              <div className="recent-list">

                {recentJobs.length === 0 ? (

                  <div className="empty-state">
                    <span>💼</span>
                    <h3>No Jobs Found</h3>
                    <p>
                      Recent jobs will appear here.
                    </p>
                  </div>

                ) : (

                  recentJobs.map((job) => (

                    <div
                      key={job._id}
                      className="recent-job-item"
                      onClick={() =>
                        navigate(`/jobs/${job._id}`)
                      }
                    >

                      <div className="recent-job-logo">
                        {job.company?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "C"}
                      </div>

                      <div className="recent-job-info">

                        <h3>
                          {job.title}
                        </h3>

                        <p>
                          {job.company?.name ||
                            "Company"}
                        </p>

                        <span>
                          📍 {job.location}
                        </span>

                      </div>

                      <span className="recent-arrow">
                        →
                      </span>

                    </div>

                  ))

                )}

              </div>

            </div>

            {/* APPLICATIONS */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>Recent Applications</h2>
                  <p>
                    Latest candidate activity
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/applications")
                  }
                  className="view-all-btn"
                >
                  View All →
                </button>

              </div>

              <div className="recent-list">

                {recentApplications.length === 0 ? (

                  <div className="empty-state">
                    <span>📄</span>
                    <h3>No Applications</h3>
                    <p>
                      Application activity will appear here.
                    </p>
                  </div>

                ) : (

                  recentApplications.map(
                    (application) => {

                      const status =
                        application.status?.toLowerCase();

                      return (
                        <div
                          key={application._id}
                          className="application-item"
                        >

                          <div className="applicant-avatar">
                            {application.applicant?.fullname
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>

                          <div className="application-info">

                            <h3>
                              {application.applicant
                                ?.fullname ||
                                "Applicant"}
                            </h3>

                            <p>
                              {application.job?.title ||
                                "Job"}
                            </p>

                          </div>

                          <span
                            className={`status-badge ${
                              status === "accepted"
                                ? "status-accepted"
                                : status === "rejected"
                                ? "status-rejected"
                                : "status-pending"
                            }`}
                          >
                            {application.status ||
                              "Pending"}
                          </span>

                        </div>
                      );
                    }
                  )

                )}

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;