import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

function Dashboard() {

const [stats, setStats] = useState({
  totalCompanies: 0,
  totalJobs: 0,
  totalApplications: 0,
  accepted: 0,
  pending: 0,
  rejected: 0,
});

const [recentJobs, setRecentJobs] = useState([]);
const [recentApplications, setRecentApplications] = useState([]);

  useEffect(()=>{
    getDashboard();
  },[]);

 const getDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("========== DASHBOARD ==========");
    console.log("TOKEN:", token);

    const res = await API.get("/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Dashboard API Response:", res.data);

setStats({
  totalCompanies: res.data.totalCompanies,
  totalJobs: res.data.totalJobs,
  totalApplications: res.data.totalApplications,
  accepted: res.data.accepted,
  pending: res.data.pending,
  rejected: res.data.rejected,
});

setRecentJobs(res.data.recentJobs || []);
setRecentApplications(res.data.recentApplications || []);
  } catch (err) {

    console.log("========= DASHBOARD ERROR =========");
    console.log(err);

    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Response:", err.response.data);
    }

  }
};
  

  const data=[
    {
      name:"Accepted",
      value:stats.accepted
    },
    {
      name:"Pending",
      value:stats.pending
    },
    {
      name:"Rejected",
      value:stats.rejected
    }
  ];

  return(

<div className="flex">

<Sidebar/>

<div className="flex-1 bg-gray-100 min-h-screen">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Dashboard Analytics
</h1>

<div className="grid md:grid-cols-4 gap-5">

<div className="bg-white rounded-xl shadow p-6">
<h2 className="text-gray-500">
Companies
</h2>

<p className="text-4xl font-bold text-blue-600 mt-3">
{stats.totalCompanies}
</p>

</div>

<div className="bg-white rounded-xl shadow p-6">
<h2 className="text-gray-500">
Jobs
</h2>

<p className="text-4xl font-bold text-green-600 mt-3">
{stats.totalJobs}
</p>

</div>

<div className="bg-white rounded-xl shadow p-6">
<h2 className="text-gray-500">
Applications
</h2>

<p className="text-4xl font-bold text-purple-600 mt-3">
{stats.totalApplications}
</p>

</div>

<div className="bg-white rounded-xl shadow p-6">
<h2 className="text-gray-500">
Accepted
</h2>

<p className="text-4xl font-bold text-orange-500 mt-3">
{stats.accepted}
</p>

</div>

</div>

<div className="bg-white mt-10 rounded-xl shadow p-8">

<h2 className="text-2xl font-bold mb-5">
Application Status
</h2>

<div style={{width:"100%",height:350}}>

<ResponsiveContainer>

<PieChart>
  

<Pie

data={data}

cx="50%"

cy="50%"

outerRadius={120}

label

dataKey="value"
>

{
data.map((entry,index)=>(
<Cell
key={index}
fill={COLORS[index]}
/>
))
}

</Pie>

<Tooltip/>

</PieChart>


</ResponsiveContainer>

</div>

</div>
<div className="grid md:grid-cols-2 gap-8 mt-10">

  {/* Recent Jobs */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-5">
      Recent Jobs
    </h2>

    {recentJobs.length === 0 ? (
      <p>No Jobs Found</p>
    ) : (
      recentJobs.map((job) => (
        <div
          key={job._id}
          className="border-b py-3"
        >
          <h3 className="font-semibold">
            {job.title}
          </h3>

          <p className="text-sm text-gray-500">
            {job.company?.name}
          </p>

          <p className="text-xs text-blue-600">
            {job.location}
          </p>

        </div>
      ))
    )}

  </div>

  {/* Recent Applications */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-5">
      Recent Applications
    </h2>

    {recentApplications.length === 0 ? (
      <p>No Applications</p>
    ) : (
      recentApplications.map((application) => (
        <div
          key={application._id}
          className="border-b py-3 flex justify-between items-center"
        >
          <div>

            <h3 className="font-semibold">
              {application.applicant?.fullname}
            </h3>

            <p className="text-sm text-gray-500">
              {application.job?.title}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              application.status === "accepted"
                ? "bg-green-600"
                : application.status === "rejected"
                ? "bg-red-600"
                : "bg-yellow-500"
            }`}
          >
            {application.status}
          </span>

        </div>
      ))
    )}

  </div>

</div>

</div>

</div>

</div>

  )

}

export default Dashboard;