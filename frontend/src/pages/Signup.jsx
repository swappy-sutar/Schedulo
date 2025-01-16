import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
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
        "http://localhost:3000/api/v1/user/signup",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Signup Successful");
        navigate("/login");
      } else {
        const error = await response.json();
        toast.error("Signup Failed: " + error.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen mt-6 px-4 md:px-8 lg:px-16">
      <div className="relative flex flex-col items-center justify-center p-6 w-full max-w-lg bg-richblack-700 bg-opacity-90 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-richblack-200 mb-2 text-center">
          Welcome to Interview Scheduler
        </h1>
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-center">
          Create your account
        </h3>
        <form onSubmit={handleOnSubmit} className="w-full">
          <label className="mt-2 text-base font-semibold text-gray-200 block ">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label className="mt-2 text-base font-semibold text-gray-200 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label className="mt-2 text-base font-semibold text-gray-200 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email address"
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
              placeholder="Enter password"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label className="mt-2 text-base font-semibold text-gray-200 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
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
            {loading ? "Signing up..." : "Signup"}
          </button>
          <p className="mt-4 text-sm text-center text-richblack-5">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-richblack-300 font-semibold hover:text-yellow-25 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
