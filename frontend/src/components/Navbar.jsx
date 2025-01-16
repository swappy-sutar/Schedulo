import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = () => {
      const userLoggedIn = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      console.log("User:", userLoggedIn, "Token:", token);
      setIsLoggedIn(!!userLoggedIn && !!token);
    };

    checkLoggedIn();

    console.log("isLoggedIn", isLoggedIn);

    window.addEventListener("storage", checkLoggedIn);

    return () => {
      window.removeEventListener("storage", checkLoggedIn);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 flex items-center max-w-maxContent justify-between">
        <div className="text-3xl text-richblack-300 font-bold hover:text-yellow-25">
          Schedulo
        </div>

        <div className="flex gap-6 items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-richblack-300 font-semibold hover:text-yellow-25"
              >
                Dashboard
              </Link>
              <Link
                to="/create-slot"
                className="text-richblack-300 font-semibold hover:text-yellow-25"
              >
                Create Slot
              </Link>
              <button
                onClick={handleLogout}
                className="bg-yellow-25 hover:bg-yellow-50 text-richblack-900 font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-25 hover:bg-yellow-50 text-richblack-900 font-bold py-2 px-4 rounded"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-yellow-25 hover:bg-yellow-50 text-richblack-900 font-bold py-2 px-4 rounded"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
