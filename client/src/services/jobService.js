import API from "../api/api";

// Get All Jobs
export const getAllJobs = async (token) => {
  return await API.get("/job/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get Single Job
export const getJobById = async (id, token) => {
  return await API.get(`/job/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create Job
export const createJob = async (data, token) => {
  return await API.post("/job/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update Job
export const updateJob = async (id, data, token) => {
  return await API.put(`/job/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete Job
export const deleteJob = async (id, token) => {
  return await API.delete(`/job/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Recruiter Jobs
export const getRecruiterJobs = async (token) => {
  return await API.get("/job/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};