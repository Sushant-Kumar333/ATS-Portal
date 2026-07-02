import HomeNavbar from "../components/HomeNavbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <HomeNavbar />

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-24 text-center">

          <h1 className="text-6xl font-bold leading-tight">
            Find Your Dream Job
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            India's Smart Applicant Tracking System
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link
              to="/jobs"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:scale-105 transition"
            >
              Browse Jobs
            </Link>

            <Link
              to="/register"
              className="border border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-700 transition"
            >
              Get Started
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose ATS Portal?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              1000+ Jobs
            </h3>

            <p className="text-gray-600">
              Discover jobs from top companies across India.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Easy Apply
            </h3>

            <p className="text-gray-600">
              Apply with one click using your ATS profile.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Recruiter Panel
            </h3>

            <p className="text-gray-600">
              Manage companies, jobs and applicants easily.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-gray-900 text-gray-300 py-8">

        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-white">
            ATS Portal
          </h2>

          <p>
            © 2026 ATS Portal. All Rights Reserved.
          </p>

        </div>

      </footer>

    </>
  );
}

export default Home;