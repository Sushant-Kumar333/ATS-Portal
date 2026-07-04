import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-6xl mx-auto mt-8">

          {/* Cover */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-48 rounded-t-2xl"></div>

          {/* Profile Card */}

          <div className="bg-white rounded-b-2xl shadow-lg px-10 pb-10">

            <div className="flex flex-col md:flex-row md:items-end">

              {/* Image */}

              <img
                src={
                  user.profile?.profilePhoto
                    ? `https://ats-portal-tj20.onrender.com${user.profile.profilePhoto}`
                    : `https://ui-avatars.com/api/?name=${user.fullname}&background=2563eb&color=fff&size=256`
                }
                alt="profile"
                className="w-40 h-40 rounded-full border-4 border-white object-cover -mt-20 shadow-lg"
              />

              <div className="md:ml-8 mt-5 md:mt-0 flex-1">

                <h1 className="text-4xl font-bold">
                  {user.fullname}
                </h1>

                <p className="text-gray-500 text-lg capitalize">
                  {user.role}
                </p>

              </div>

              <Link to="/profile/edit">

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg mt-6 md:mt-0">

                  Edit Profile

                </button>

              </Link>

            </div>

            <hr className="my-8" />

            {/* Info */}

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <h2 className="font-bold text-xl mb-5">
                  Contact Information
                </h2>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">

                    <FaEnvelope className="text-blue-600" />

                    {user.email}

                  </div>

                  <div className="flex items-center gap-3">

                    <FaPhoneAlt className="text-green-600" />

                    {user.phoneNumber}

                  </div>

                  {user.profile?.github && (

                    <div className="flex items-center gap-3">

                      <FaGithub />

                      <a
                        href={user.profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                        Github
                      </a>

                    </div>

                  )}

                  {user.profile?.linkedin && (

                    <div className="flex items-center gap-3">

                      <FaLinkedin className="text-blue-700" />

                      <a
                        href={user.profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                      >
                        LinkedIn
                      </a>

                    </div>

                  )}

                </div>

              </div>

              <div>

                <h2 className="font-bold text-xl mb-5">
                  About
                </h2>

                <p className="text-gray-600">

                  {user.profile?.bio || "No Bio"}

                </p>

              </div>

            </div>

            <hr className="my-8" />

            {/* Skills */}

            <div>

              <h2 className="font-bold text-xl mb-5">

                Skills

              </h2>

              <div className="flex flex-wrap gap-3">

                {user.profile?.skills?.length > 0 ? (

                  user.profile.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>

                  ))

                ) : (

                  <p>No Skills Added</p>

                )}

              </div>

            </div>

            <hr className="my-8" />

            {/* Resume */}

            <div>

              <h2 className="font-bold text-xl mb-5">

                Resume

              </h2>

              {user.profile?.resume ? (

                <a
                  href={`http://localhost:5000${user.profile.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                  {user.profile.resumeOriginalName}
                </a>

              ) : (

                <p>No Resume Uploaded</p>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;