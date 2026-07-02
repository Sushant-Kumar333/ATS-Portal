import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function EditCompany() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo:null,
  });

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {

    const token = localStorage.getItem("token");

    const res = await API.get(`/company/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCompany(res.data.company);
  };

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "logo") {
    setCompany({
      ...company,
      logo: files[0],
    });
  } else {
    setCompany({
      ...company,
      [name]: value,
    });
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", company.name);
    formData.append("description", company.description);
    formData.append("website", company.website);
    formData.append("location", company.location);

    // Logo sirf tab bhejna jab user ne naya logo select kiya ho
    if (company.logo && typeof company.logo !== "string") {
      formData.append("logo", company.logo);
    }

    const res = await API.put(
      `/company/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(res.data.message || "Company Updated Successfully");

    navigate("/companies");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update company"
    );
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Edit Company
      </h1>

      <form onSubmit={handleSubmit}>
        {company.logo && typeof company.logo === "string" && (
  <img
    src={`http://localhost:5000${company.logo}`}
    alt="Company Logo"
    className="w-24 h-24 object-cover rounded mb-3"
  />
)}
        <input
  type="file"
  name="logo"
  accept="image/*"
  className="border w-full p-3 mb-3"
  onChange={handleChange}
/>

        <input
          className="border w-full p-3 mb-3"
          name="name"
          value={company.name}
          onChange={handleChange}
          placeholder="Company Name"
        />

        <input
          className="border w-full p-3 mb-3"
          name="website"
          value={company.website || ""}
          onChange={handleChange}
          placeholder="Website"
        />

        <input
          className="border w-full p-3 mb-3"
          name="location"
          value={company.location || ""}
          onChange={handleChange}
          placeholder="Location"
        />

        <textarea
          className="border w-full p-3 mb-3"
          name="description"
          value={company.description || ""}
          onChange={handleChange}
          placeholder="Description"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Update Company
        </button>

      </form>

    </div>
  );
}

export default EditCompany;