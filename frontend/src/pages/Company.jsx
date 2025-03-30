import React, { useState, useEffect } from "react";
import axios from "axios";
import bgnew from "../assets/bgnew.jpg";
import Navbar from "./Navbar";

const Company = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [submissions, setSubmissions] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfilePic(storedProfileImage);
    }
  }, []);

  // Fetch submissions when category is selected
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "select") {
      fetchSubmissions(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchSubmissions = async (category) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/farmer/submissions?category=${category}`
      );

      if (response.data && Array.isArray(response.data.data)) {
        setSubmissions(response.data.data);
      } else {
        setSubmissions([]);
        setError("Invalid response format.");
      }
    } catch (error) {
      setError(
        `Error fetching data: ${error.response?.data?.message || error.message}`
      );
    }
    setLoading(false);
  };

  // Function to handle interest
  const handleInterestClick = async (submissionId) => {
    const companyDetails = {
      companyName: "ABC Industries",
      contact: "9876543210",
      email: "abc@example.com",
      location: "Kolkata, India",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/farmer/notify-farmer",
        {
          submissionId,
          companyDetails,
        }
      );

      if (response.data.success) {
        alert("Interest sent successfully!");
      } else {
        alert("Failed to send interest.");
      }
    } catch (error) {
      alert("Error sending interest.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${bgnew})` }}
    >
      <div className="flex flex-col justify-center items-center">
        <Navbar
          profilePicture={profilePic}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />

        {/* Category Dropdown */}
        <div className="w-[90vw] h-[20vh] flex flex-col justify-center items-center">
          <label htmlFor="options" className="text-lg mb-5">
            Please Select The Category Of Purchase
          </label>
          <select
            id="options"
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="select">Select Option</option>
            <option value="fallenleaves">Fallen Leaves</option>
            <option value="ayurvedic">Ayurvedic Plants</option>
            <option value="wood">Woods</option>
          </select>
        </div>

        {/* Product Details Section */}
        <div className="min-h-screen bg-gray-100 p-8 w-full">
          {loading && <p className="text-center text-lg">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {submissions.length === 0 &&
            !loading &&
            selectedCategory !== "select" && (
              <p className="text-center text-lg">
                No data found for this category.
              </p>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                {/* Display Image */}
                {submission.imagePaths?.[0] && (
                  <img
                    src={`http://localhost:8000/${submission.imagePaths[0]}`}
                    alt={submission.entityName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="text-xl font-semibold mb-2">
                  {submission.entityName}
                </h3>
                <p>
                  <strong>Amount:</strong> {submission.amount}
                </p>
                <p>
                  <strong>Price per Amount:</strong> {submission.pricePerAmount}
                </p>
                <p>
                  <strong>Location:</strong> {submission.location}
                </p>
                <p>
                  <strong>Delivery Days:</strong> {submission.deliveryDays}
                </p>
                <p>
                  <strong>Aadhar Number:</strong> {submission.aadharNumber}
                </p>

                {/* Interest Button */}
                <button
                  onClick={() => handleInterestClick(submission._id)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Yes, I am Interested
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
