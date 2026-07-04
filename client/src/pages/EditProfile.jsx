import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { FaCamera } from "react-icons/fa";

function EditProfile() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

 const [formData, setFormData] = useState({
  fullname: "",
  phoneNumber: "",
  bio: "",
  skills: "",
  resumeName: "",
  profilePhoto: "",
});

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

      const user = res.data.user;

     setFormData({
  fullname: user.fullname || "",
  phoneNumber: user.phoneNumber || "",
  bio: user.profile?.bio || "",
  skills: user.profile?.skills?.join(", ") || "",
  resumeName: user.profile?.resumeOriginalName || "",
  profilePhoto: user.profile?.profilePhoto || "",
});
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

  console.log("Photo :", profilePhoto);
  console.log("Resume :", resume);
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

data.append("fullname", formData.fullname);
data.append("phoneNumber", formData.phoneNumber);
data.append("bio", formData.bio);
data.append("skills", formData.skills);

if (resume) {
  data.append("resume", resume);
}
if (profilePhoto) {
  data.append("profilePhoto", profilePhoto);
}
for (let pair of data.entries()) {
  console.log(pair[0], pair[1]);
}

await API.put("/profile/update", data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      // Upload Profile Photo
     
 alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

return (
  <div className="flex">
    <Sidebar />

    <div className="flex-1 bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <form
          onSubmit={updateProfile}
          className="bg-white shadow-lg rounded-xl p-8 space-y-5"
        >
          <div className="flex flex-col items-center mb-8">

  <div className="relative">

  <img
    src={
      profilePhoto
        ? URL.createObjectURL(profilePhoto)
        : formData.profilePhoto
        ? `https://ats-portal-tj20.onrender.com${formData.profilePhoto}`
        : `https://ui-avatars.com/api/?name=${formData.fullname}`
    }
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
  />

  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">

    <FaCamera />

    <input
      type="file"
      hidden
      accept="image/*"
      onChange={(e) => setProfilePhoto(e.target.files[0])}
    />

  </label>

</div>
  <h2 className="text-3xl font-bold mt-4">
    Edit Your Profile
  </h2>

</div>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Bio"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node, Express, MongoDB"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Resume */}

            <div>
              <label className="font-semibold block mb-2">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
               className="w-full border border-gray-300 rounded-xl px-4 py-3" 
              />

              {formData.resumeName && (
                <p className="text-green-600 text-sm mt-2">
                  Current Resume: {formData.resumeName}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Update Profile
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;