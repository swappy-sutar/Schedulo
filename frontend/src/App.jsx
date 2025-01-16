import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TimeSlot from "./pages/TimeSlot";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-slot" element={<TimeSlot />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
