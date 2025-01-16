import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/login",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Login Successful");
        setIsLoggedIn(true);
        localStorage.setItem("token", result.token);

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        document.cookie = `token=${
          result.token
        }; path=/; secure; samesite=strict; expires=${expireDate.toUTCString()}`;

        localStorage.setItem("user", JSON.stringify(result.data));

        navigate("/dashboard");
      } else {
        const error = await response.json();
        toast.error(`Login Failed: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen px-4 md:px-8 lg:px-16">
      <div className="relative flex flex-col items-center justify-center p-6 w-full max-w-lg bg-richblack-700 bg-opacity-90 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-richblack-200 mb-4 text-center">
          Interview Scheduler
        </h1>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-6 text-center">
          Log in to your account
        </h3>
        <form onSubmit={handleOnSubmit} className="w-full">
          <label className="mt-2 text-base font-semibold text-gray-200 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label className="mt-2 text-base font-semibold text-gray-200 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <button
            type="submit"
            className={`w-full px-6 py-3 mt-6 font-bold rounded-lg shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-25 text-richblack-900 hover:scale-105 hover:text-yellow-"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-4 text-sm text-center text-richblack-5">
            create account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-richblack-300 font-semibold hover:text-yellow-25 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
