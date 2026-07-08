import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Companies from "./pages/Companies";
import CreateCompany from "./pages/CreateCompany";
import UpdateCompany from "./pages/UpdateCompany";

import ProtectedRoute from "./components/ProtectedRoute";
import EditCompany from "./pages/EditCompany";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import Applications from "./pages/Applications";
import Applicants from "./pages/Applicants";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import JobDetails from "./pages/JobDetails";
import StudentDashboard from "./pages/StudentDashboard";
import RegisterCompany from "./pages/RegisterCompany";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies/create"
          element={
            <ProtectedRoute>
              <CreateCompany />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies/update/:id"
          element={
            <ProtectedRoute>
              <UpdateCompany />
            </ProtectedRoute>
          }
        />
        <Route
           path="/companies/edit/:id"
          element={
            <ProtectedRoute>
               <EditCompany />
            </ProtectedRoute>
          }
        />
        <Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/jobs/create"
  element={
    <ProtectedRoute>
      <CreateJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/jobs/edit/:id"
  element={
    <ProtectedRoute>
      <EditJob />
    </ProtectedRoute>
  }
/>
<Route
  path="/applications"
  element={
    <ProtectedRoute>
      <Applications />
    </ProtectedRoute>
  }
/>
<Route
  path="/applicants"
  element={
    <ProtectedRoute>
      <Applicants />
    </ProtectedRoute>
  }
/>

<Route
  path="/applicants/:id"
  element={
    <ProtectedRoute>
      <Applicants />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile/edit"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/jobs/:id"
  element={
    <ProtectedRoute>
      <JobDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/student-dashboard"
  element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
<Route path="/company/register" element={<RegisterCompany />} />


      </Routes>
      
      
    </BrowserRouter>
  );
}

export default App;