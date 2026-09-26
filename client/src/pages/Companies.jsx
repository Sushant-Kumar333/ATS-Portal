import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/company/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies(res.data.companies || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/company/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies((prev) =>
        prev.filter((company) => company._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Unable to delete company"
      );
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 min-w-0">

        <Navbar />

        <main className="p-5 md:p-8 max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <FaBuilding className="text-xl" />
                </div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                    Companies
                  </h1>

                  <p className="text-gray-500 mt-1">
                    Manage your registered companies
                  </p>
                </div>

              </div>
            </div>

            <Link
              to="/companies/create"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <FaPlus />
              New Company
            </Link>

          </div>

          {/* SEARCH + COUNT */}

          <div className="bg-white rounded-2xl shadow-md p-4 mb-7">

            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

              <div className="relative flex-1">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search companies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />

              </div>

              <div className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold">
                {filteredCompanies.length} Companies
              </div>

            </div>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-6 shadow animate-pulse"
                >
                  <div className="w-14 h-14 bg-gray-200 rounded-xl mb-5"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}

            </div>
          )}

          {/* EMPTY */}

          {!loading && filteredCompanies.length === 0 && (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-3xl">
                <FaBuilding />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-5">
                No Companies Found
              </h2>

              <p className="text-gray-500 mt-2">
                {search
                  ? "Try searching with another company name."
                  : "Create your first company to get started."}
              </p>

              {!search && (
                <Link
                  to="/companies/create"
                  className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <FaPlus />
                  Create Company
                </Link>
              )}

            </div>
          )}

          {/* COMPANY CARDS */}

          {!loading && filteredCompanies.length > 0 && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredCompanies.map((company) => (

                <div
                  key={company._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300"
                >

                  {/* TOP GRADIENT */}

                  <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

                  <div className="p-6">

                    {/* COMPANY ICON */}

                    <div className="flex items-start justify-between">

                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 transition duration-300">
                        <FaBuilding />
                      </div>

                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Active
                      </span>

                    </div>

                    {/* NAME */}

                    <h2 className="text-xl font-bold text-gray-800 mt-5 group-hover:text-blue-600 transition">
                      {company.name}
                    </h2>

                    {/* LOCATION */}

                    <div className="flex items-center gap-3 mt-4 text-gray-600">

                      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-red-500" />
                      </div>

                      <span>
                        {company.location || "Location not added"}
                      </span>

                    </div>

                    {/* WEBSITE */}

                    <div className="flex items-center gap-3 mt-3 text-gray-600">

                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FaGlobe className="text-blue-500" />
                      </div>

                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline truncate"
                        >
                          Visit Website
                        </a>
                      ) : (
                        <span className="text-gray-400">
                          Website not added
                        </span>
                      )}

                    </div>

                    {/* DIVIDER */}

                    <div className="border-t border-gray-100 my-5"></div>

                    {/* ACTIONS */}

                    <div className="flex gap-3">

                      <Link
                        to={`/companies/edit/${company._id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-50 hover:bg-yellow-500 text-yellow-700 hover:text-white py-2.5 rounded-xl font-semibold transition"
                      >
                        <FaEdit />
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteCompany(company._id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white py-2.5 rounded-xl font-semibold transition"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default Companies;