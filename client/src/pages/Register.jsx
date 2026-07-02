import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";

function Register() {
  const { register, handleSubmit } = useForm();

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
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        placeholder="Full Name"
        {...register("fullname")}
      />

      <input
        placeholder="Email"
        {...register("email")}
      />

      <input
        placeholder="Phone Number"
        {...register("phoneNumber")}
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <select {...register("role")}>
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button type="submit">
        Register
      </button>

    </form>
  );
}

export default Register;