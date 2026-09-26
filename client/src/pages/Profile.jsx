import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaBriefcase,
  FaEdit,
} from "react-icons/fa";

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
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const profilePhoto = user.profile?.profilePhoto
    ? `https://ats-portal-tj20.onrender.com${user.profile.profilePhoto}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.fullname
      )}&background=2563eb&color=fff&size=256`;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <main className="max-w-6xl mx-auto p-4 md:p-8">

          {/* PROFILE HEADER */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">

            {/* Cover */}
            <div className="h-48 md:h-60 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 relative">

              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-72 h-72 bg-white rounded-full -top-40 -right-20"></div>
                <div className="absolute w-52 h-52 bg-white rounded-full top-32 left-20"></div>
              </div>

              <div className="absolute bottom-5 left-6 text-white">
                <p className="text-sm opacity-80">
                  ATS Portal Profile
                </p>
              </div>
            </div>

            {/* Profile main */}
            <div className="px-6 md:px-10 pb-8">

              <div className="flex flex-col md:flex-row md:items-end gap-6">

                {/* Profile Image */}
                <div className="-mt-20 relative">

                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-8 border-white shadow-xl"
                  />

                  <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                {/* Name */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 flex-wrap">

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                      {user.fullname}
                    </h1>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold capitalize">
                      {user.role}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-2">
                    {user.profile?.bio ||
                      "Build your professional profile on ATS Portal."}
                  </p>

                </div>

                {/* Edit */}
                <Link
                  to="/profile/edit"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                >
                  <FaEdit />
                  Edit Profile
                </Link>

              </div>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-blue-600 text-2xl mb-2">
                <FaUserGraduate />
              </div>
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-bold capitalize mt-1">
                {user.role}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-green-600 text-2xl mb-2">
                <FaBriefcase />
              </div>
              <p className="text-gray-500 text-sm">Skills</p>
              <p className="font-bold mt-1">
                {user.profile?.skills?.length || 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-purple-600 text-2xl mb-2">
                <FaEnvelope />
              </div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-bold mt-1 truncate">
                {user.email}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
              <div className="text-orange-500 text-2xl mb-2">
                <FaFilePdf />
              </div>
              <p className="text-gray-500 text-sm">Resume</p>
              <p className="font-bold mt-1">
                {user.profile?.resume ? "Uploaded" : "Not Added"}
              </p>
            </div>

          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-3 gap-6 mt-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* About */}
              <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-2xl font-bold">
                    About Me
                  </h2>

                  <span className="text-blue-600 text-sm font-medium">
                    Professional Profile
                  </span>

                </div>

                <p className="text-gray-600 leading-7">
                  {user.profile?.bio ||
                    "No bio added yet. Add your professional summary from Edit Profile."}
                </p>

              </section>

              {/* Skills */}
              <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

                <h2 className="text-2xl font-bold mb-5">
                  Skills & Expertise
                </h2>

                {user.profile?.skills?.length > 0 ? (

                  <div className="flex flex-wrap gap-3">

                    {user.profile.skills.map((skill, index) => (

                      <span
                        key={index}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 font-medium hover:scale-105 hover:shadow-md transition cursor-default"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                ) : (

                  <p className="text-gray-500">
                    No skills added yet.
                  </p>

                )}

              </section>

              {/* Resume */}
              <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-2xl font-bold">
                      Resume
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Your professional resume
                    </p>
                  </div>

                  <FaFilePdf className="text-4xl text-red-500" />

                </div>

                <div className="mt-5">

                  {user.profile?.resume ? (

                    <a
                      href={`http://localhost:5000${user.profile.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 hover:-translate-y-1 transition-all text-white px-6 py-3 rounded-xl font-semibold shadow-md"
                    >
                      <FaFilePdf />
                      {user.profile.resumeOriginalName || "View Resume"}
                    </a>

                  ) : (

                    <div className="bg-gray-50 rounded-xl p-5 text-gray-500">
                      No resume uploaded yet.
                    </div>

                  )}

                </div>

              </section>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Contact */}
              <section className="bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-bold mb-5">
                  Contact Information
                </h2>

                <div className="space-y-4">

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-50">
                    <FaEnvelope className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Email
                      </p>
                      <p className="font-medium break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-green-50">
                    <FaPhoneAlt className="text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Phone
                      </p>
                      <p className="font-medium">
                        {user.phoneNumber || "Not Added"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-purple-50">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Location
                      </p>
                      <p className="font-medium">
                        India
                      </p>
                    </div>
                  </div>

                </div>

              </section>

              {/* Social */}
              <section className="bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-bold mb-5">
                  Social Profiles
                </h2>

                <div className="space-y-3">

                  {user.profile?.github && (
                    <a
                      href={user.profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <FaGithub className="text-xl" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {user.profile?.linkedin && (
                    <a
                      href={user.profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
                    >
                      <FaLinkedin className="text-xl text-blue-700" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {!user.profile?.github &&
                    !user.profile?.linkedin && (
                      <p className="text-gray-500">
                        No social profiles added.
                      </p>
                    )}

                </div>

              </section>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Profile;