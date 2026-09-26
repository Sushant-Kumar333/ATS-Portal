import HomeNavbar from "../components/HomeNavbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <HomeNavbar />

      {/* HERO */}
      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ India's Smart Applicant Tracking System
          </div>

          <h1>
            Find Your
            <span> Dream Job</span>
          </h1>

          <p>
            Discover opportunities, connect with top companies,
            and manage your entire career journey from one place.
          </p>

          <div className="hero-buttons">

            <Link to="/jobs" className="hero-primary">
              Browse Jobs
              <span>→</span>
            </Link>

            <Link to="/register" className="hero-secondary">
              Get Started
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>1000+</strong>
              <span>Jobs</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Companies</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Applicants</span>
            </div>

          </div>

        </div>

        {/* Decorative dashboard */}
        <div className="hero-dashboard">

          <div className="dashboard-top">
            <span>ATS Dashboard</span>
            <span className="online-dot">●</span>
          </div>

          <div className="dashboard-card">

            <div className="mini-icon">💼</div>

            <div>
              <strong>Software Engineer</strong>
              <p>Tech Company • Remote</p>
            </div>

            <span className="apply-badge">
              Apply
            </span>

          </div>

          <div className="dashboard-card">

            <div className="mini-icon">🎨</div>

            <div>
              <strong>UI/UX Designer</strong>
              <p>Creative Studio • Hybrid</p>
            </div>

            <span className="apply-badge">
              Apply
            </span>

          </div>

          <div className="dashboard-card">

            <div className="mini-icon">📊</div>

            <div>
              <strong>Data Analyst</strong>
              <p>FinTech • On-site</p>
            </div>

            <span className="apply-badge">
              Apply
            </span>

          </div>

        </div>

      </section>


      {/* WHY ATS */}
      <section className="why-section">

        <div className="section-heading">

          <span>WHY ATS PORTAL</span>

          <h2>
            Everything you need to
            <span> grow your career.</span>
          </h2>

          <p>
            A simple platform for students, job seekers and recruiters.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon blue">
              💼
            </div>

            <div className="feature-number">
              01
            </div>

            <h3>1000+ Jobs</h3>

            <p>
              Discover opportunities from companies
              across different industries.
            </p>

            <Link to="/jobs">
              Explore Jobs →
            </Link>

          </div>


          <div className="feature-card featured-card">

            <div className="feature-icon purple">
              ⚡
            </div>

            <div className="feature-number">
              02
            </div>

            <h3>Easy Apply</h3>

            <p>
              Create your profile once and apply for
              suitable jobs quickly.
            </p>

            <Link to="/jobs">
              Find a Job →
            </Link>

          </div>


          <div className="feature-card">

            <div className="feature-icon green">
              🏢
            </div>

            <div className="feature-number">
              03
            </div>

            <h3>Recruiter Panel</h3>

            <p>
              Manage companies, jobs and applicants
              from one convenient dashboard.
            </p>

            <Link to="/register">
              Join ATS →
            </Link>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="home-cta">

        <div>

          <span>READY TO GET STARTED?</span>

          <h2>
            Your next opportunity
            <br />
            could be one click away.
          </h2>

          <p>
            Create your ATS Portal account and start exploring
            opportunities today.
          </p>

          <Link to="/register">
            Create Free Account →
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-brand">

          <h2>ATS Portal</h2>

          <p>
            Smart recruitment. Better opportunities.
          </p>

        </div>

        <div className="footer-links">

          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/register">Register</Link>

        </div>

        <div className="footer-bottom">
          © 2026 ATS Portal. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;