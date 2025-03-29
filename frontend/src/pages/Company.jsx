import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgnew from "../assets/bgnew.jpg";
import Navbar from "./Navbar";
const Company = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfilePic(storedProfileImage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  // Navigate to details page on category selection
  const handleCategoryClick = (category) => {
    navigate(`/company/${category}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${bgnew})` }}
    >
      <h2 className="text-4xl font-bold text-black mb-10  p-4 text-center">
        Company Dashboard
      </h2>
      <Navbar
        profilePicture={profilePic}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />
      {/* 🔹 Company Dashboard Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* 🔹 Category Selection Boxes */}
        <div className="flex flex-wrap justify-center gap-8">
          {["fallen_leaves", "wood", "medicinal_plants"].map((category) => (
            <div
              key={category}
              className="w-64 h-40 bg-green-900 text-white flex items-center justify-center
                       text-xl font-semibold rounded-lg shadow-2xl cursor-pointer
                       hover:scale-105 transition-transform duration-300"
              onClick={() => handleCategoryClick(category)}
            >
              {category.replace("_", " ").toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
