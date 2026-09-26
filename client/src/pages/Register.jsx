import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      alert(res.data.message);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-page">

      {/* Background decoration */}
      <div className="register-glow glow-1"></div>
      <div className="register-glow glow-2"></div>

      <div className="register-box">

        {/* LEFT SECTION */}
        <div className="register-left">

          <div className="brand-circle">
            ATS
          </div>

          <h1>
            Build your
            <span> career.</span>
          </h1>

          <p>
            Join ATS Portal and discover opportunities,
            manage applications and connect with recruiters.
          </p>

          <div className="features">

            <div className="feature">
              <span>✓</span>
              <p>Discover relevant job opportunities</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Track your applications easily</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Connect with companies</p>
            </div>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="register-card">

          <div className="register-heading">

            <div className="mini-logo">
              ATS
            </div>

            <h2>Create your account</h2>

            <p>
              Start your journey with ATS Portal
            </p>

          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* FULL NAME */}
            <div className="input-group">

              <label>Full Name</label>

              <div className="input-box">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullname", {
                    required: "Full name is required",
                  })}
                />
              </div>

              {errors.fullname && (
                <small>{errors.fullname.message}</small>
              )}

            </div>

            {/* EMAIL */}
            <div className="input-group">

              <label>Email Address</label>

              <div className="input-box">
                <span>✉️</span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>

              {errors.email && (
                <small>{errors.email.message}</small>
              )}

            </div>

            {/* PHONE */}
            <div className="input-group">

              <label>Phone Number</label>

              <div className="input-box">
                <span>📱</span>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
              </div>

              {errors.phoneNumber && (
                <small>{errors.phoneNumber.message}</small>
              )}

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>Password</label>

              <div className="input-box">
                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>

              {errors.password && (
                <small>{errors.password.message}</small>
              )}

            </div>

            {/* ROLE */}
            <div className="input-group">

              <label>I am a</label>

              <div className="role-container">

                <label className="role-option">
                  <input
                    type="radio"
                    value="student"
                    {...register("role", {
                      required: "Please select a role",
                    })}
                  />

                  <span className="role-icon">
                    🎓
                  </span>

                  <div>
                    <strong>Student</strong>
                    <p>Find jobs & apply</p>
                  </div>

                </label>

                <label className="role-option">
                  <input
                    type="radio"
                    value="recruiter"
                    {...register("role", {
                      required: "Please select a role",
                    })}
                  />

                  <span className="role-icon">
                    🏢
                  </span>

                  <div>
                    <strong>Recruiter</strong>
                    <p>Hire talented people</p>
                  </div>

                </label>

              </div>

              {errors.role && (
                <small>{errors.role.message}</small>
              )}

            </div>

            <button
              type="submit"
              className="create-account-btn"
            >
              Create Account
              <span>→</span>
            </button>

          </form>

          <div className="login-text">
            Already have an account?
            <a href="/login"> Sign in</a>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;