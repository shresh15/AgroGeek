import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import bgimg from "../assets/bg.jpg";
import "./details.css";

const CLOUD_PRESET = import.meta.env.VITE_CLOUD_PRESET;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = new URLSearchParams(location.search).get("role");

    const [isLogin, setIsLogin] = useState(false); // Toggle between Login & Signup
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: role || "farmer", // Default to "farmer"
        image: "", // To store Cloudinary image URL
    });

    const [loading, setLoading] = useState(false); // For image upload loading state
    const [submitting, setSubmitting] = useState(false); // For form submission loading state

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Image Upload to Cloudinary
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", CLOUD_PRESET);
        imageData.append("cloud_name", CLOUD_NAME);

        setLoading(true);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: imageData,
                }
            );

            const data = await response.json();
            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, image: data.secure_url })); // Save Cloudinary URL
                alert("Image uploaded successfully!");
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Image upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission (Signup/Login)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!isLogin && (!formData.name || !formData.phone || !formData.address)) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!formData.email || !formData.password) {
            alert("Please fill in email and password.");
            return;
        }

        if (!isLogin && !formData.image) {
            alert("Please upload a profile picture.");
            return;
        }

        setSubmitting(true);
        try {
            if (isLogin) {
                // Login API Call
                const loginResponse = await axios.post(
                    "http://localhost:8000/api/auth/login",
                    formData
                );
                console.log("Login Response:", loginResponse.data);
                alert("Login Successful!");
                navigate(role === "farmer" ? "/Farmer" : "/Company");
            } else {
                // Signup API Call
                const signupResponse = await axios.post(
                    "http://localhost:8000/api/auth/register",
                    formData
                );
                console.log("Signup Response:", signupResponse.data);
                alert("Registration Successful!");
                // Save profile image URL locally
                localStorage.setItem("profileImage", formData.image);
                navigate(role === "farmer" ? "/Farmer" : "/Company");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(
                `${isLogin ? "Login" : "Registration"} failed. ${error.response?.data?.message || "Please try again."
                }`
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="h-screen flex flex-col justify-center items-center bg-gray-300"
            style={{
                backgroundImage: `url(${bgimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1 className="text-4xl font-bold mb-4 text-black">
                {isLogin
                    ? "Login"
                    : `Complete Your Registration as ${role === "farmer" ? "Farmer" : "Company Owner"
                    }`}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="divback p-7 rounded-xl shadow-md w-96 border border-white mt-5"
            >
                {/* Signup Fields */}
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            className="w-full p-2 mb-2 border-b-4 rounded-xl"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            onChange={handleChange}
                            className="w-full p-2 mb-2 border-b-4 rounded-xl"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                            className="w-full p-2 mb-2 border-b-4 rounded-xl"
                            required
                        />
                    </>
                )}

                {/* Email & Password Fields */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border-b-4 rounded-xl"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 mb-2 border-b-4 rounded-xl"
                    required
                />

                {/* Image Upload */}
                {!isLogin && (
                    <div className="mb-4">
                        <label className="block font-bold mb-2">
                            Upload Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 border border-black"
                        />
                        {loading && (
                            <p className="text-sm text-gray-500">Uploading image...</p>
                        )}
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Profile Preview"
                                className="w-20 h-20 mt-2 rounded-full"
                            />
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-900 text-white py-2 rounded-lg mt-4 hover:bg-green-300 hover:text-black"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : isLogin ? "Login" : "Submit"}
                </button>
            </form>

            {/* Toggle Signup/Login */}
            <p className="mt-4 text-black">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                    className="text-green-900 font-semibold cursor-pointer hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Signup" : "Login"}
                </span>
            </p>
        </div>
    );
};

export default Details;
