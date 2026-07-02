import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    getJob();
  }, []);

  const getJob = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get(`/job/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJob(res.data.job);

    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return (
      <h1 className="text-center mt-10 text-2xl font-bold">
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="max-w-5xl mx-auto p-10">

          <div className="bg-white shadow-xl rounded-xl p-8">

            <h1 className="text-4xl font-bold mb-3">
              {job.title}
            </h1>

            <p className="text-blue-600 text-lg mb-6">
              {job.company?.name}
            </p>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <h3 className="font-bold">📍 Location</h3>
                <p>{job.location}</p>
              </div>

              <div>
                <h3 className="font-bold">💰 Salary</h3>
                <p>₹ {job.salary} LPA</p>
              </div>

              <div>
                <h3 className="font-bold">💼 Job Type</h3>
                <p>{job.jobType}</p>
              </div>

              <div>
                <h3 className="font-bold">⭐ Experience</h3>
                <p>{job.experience} Years</p>
              </div>

              <div>
                <h3 className="font-bold">👥 Positions</h3>
                <p>{job.position}</p>
              </div>

            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-8">
              {job.description}
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-3">
              Requirements
            </h2>

            <div className="flex flex-wrap gap-3">

              {job.requirements.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                >
                  {item}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;