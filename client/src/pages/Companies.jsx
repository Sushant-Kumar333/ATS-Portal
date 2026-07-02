import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/company/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCompanies(res.data.companies || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCompany = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!window.confirm("Delete Company?")) return;

      await API.delete(`/company/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Company Deleted Successfully");

      getCompanies();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Heading */}

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                Companies
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all your registered companies
              </p>

            </div>

            <Link
              to="/companies/create"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition"
            >
              + New Company
            </Link>

          </div>

          {/* Search */}

          <div className="bg-white rounded-xl shadow-md p-5 mb-6">

            <input
              type="text"
              placeholder="Search Company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Table */}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                <tr>

                  <th className="text-left px-6 py-4">
                    Company
                  </th>

                  <th className="text-left px-6 py-4">
                    Location
                  </th>

                  <th className="text-left px-6 py-4">
                    Website
                  </th>

                  <th className="text-center px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {companies
                  .filter((company) =>
                    company.name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((company) => (

                    <tr
                      key={company._id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 font-semibold">
                        {company.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {company.location || "-"}
                      </td>

                      <td className="px-6 py-4 text-blue-600">
                        {company.website || "-"}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-3">

                          <Link
                            to={`/companies/edit/${company._id}`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => deleteCompany(company._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                {companies.length === 0 && (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Companies Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Companies;