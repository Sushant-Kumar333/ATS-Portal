import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaBriefcase,
  FaUserCircle,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-6">

      <h1 className="text-3xl font-bold mb-10 text-blue-400">
        ATS Portal
      </h1>

      <ul className="space-y-6">

        {/* Dashboard */}
        <li>
          <Link
            to={user?.role === "student" ? "/student-dashboard" : "/dashboard"}
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaChartBar />
            Dashboard
          </Link>
        </li>

        {/* Recruiter Menu */}
        {user?.role === "recruiter" && (
          <>
            <li>
              <Link
                to="/companies"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaBuilding />
                Companies
              </Link>
            </li>

            <li>
              <Link
                to="/jobs"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaBriefcase />
                Jobs
              </Link>
            </li>
          </>
        )}

        {/* Student Menu */}
        {user?.role === "student" && (
          <>
            <li>
              <Link
                to="/jobs"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaBriefcase />
                Browse Jobs
              </Link>
            </li>

            <li>
              <Link
                to="/applications"
                className="flex items-center gap-3 hover:text-blue-400"
              >
                <FaFileAlt />
                My Applications
              </Link>
            </li>
          </>
        )}

        {/* Common */}
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:text-blue-400"
          >
            <FaUserCircle />
            Profile
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;