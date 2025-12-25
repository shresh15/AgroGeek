import React from "react";
import { useNavigate } from "react-router-dom";
import ailogo from "../assets/ailogo.png";
import weatherIcon from "../assets/weatherlogo.png";

const Navbar = ({ profilePicture, showDropdown, setShowDropdown }) => {
  const navigate = useNavigate();

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("profileImage");
    localStorage.removeItem("authToken");
    alert("✅ Logout Successfully!");
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div
        id="whitebg"
        className="h-15 w-[80vw] text-green-900 font-semibold text-lg flex flex-row justify-between items-center mt-10 mb-10 rounded-lg"
      >
        {/* LEFT SECTION */}
        <div className="flex flex-row items-center">
          {/* AI Guide */}
          <div className="relative group ml-10">
            <a
              href="https://ayurvai.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ailogo}
                alt="AI Guide"
                className="h-10 w-10 cursor-pointer"
              />
            </a>
            <span className="absolute right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm px-3 py-1 rounded-lg">
              AI Guide
            </span>
          </div>

          {/* Weather */}
          <div className="relative group ml-10 flex items-center cursor-pointer">
            <a href="/weather">
              <img src={weatherIcon} alt="Weather" className="h-14 w-14" />
            </a>
            <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm px-2 py-1 rounded-lg">
              Weather Report
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative">
          <div
            className="bg-green-900 h-12 w-12 rounded-full mr-10 flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white">👤</span>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-10 w-36 bg-white shadow-md rounded-md">
              {/* <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/responses")}
              >
                Responses
              </button> */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
