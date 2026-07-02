import { Link } from "react-router-dom";

function HomeNavbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          ATS Portal
        </Link>

        <div className="flex items-center gap-8">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-blue-600">
            Jobs
          </Link>

          <Link to="/companies" className="hover:text-blue-600">
            Companies
          </Link>

          {token ? (
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="border px-5 py-2 rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default HomeNavbar;