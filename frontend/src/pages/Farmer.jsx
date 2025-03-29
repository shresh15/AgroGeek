import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageone from "/src/assets/bg.jpg";
import "/src/pages/details.css";
const Farmer = () => {
    const [images, setImages] = useState([]); // Preview images
    const [imageFiles, setImageFiles] = useState([]); // Actual image files
    const [profilePicture, setProfilePicture] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [category, setCategory] = useState(""); // Selected category
    const [entityName, setEntityName] = useState("");
    const [amount, setAmount] = useState("");
    const [pricePerAmount, setPricePerAmount] = useState("");
    const [location, setlocation] = useState(""); // Current location (latitude, longitude)
    const [deliveryDays, setDeliveryDays] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [locationError, setLocationError] = useState(""); // Error message for location
    const [isLoading, setIsLoading] = useState(false); // Loading state for geolocation
    const [formErrors, setFormErrors] = useState({}); // Form validation errors
    const navigate = useNavigate();

    // ✅ Retrieve profile picture from local storage
    useEffect(() => {
        const storedProfileImage = localStorage.getItem("profileImage");
        if (storedProfileImage) {
            setProfilePicture(storedProfileImage);
        }
    }, []);

    // ✅ Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("profileImage");
        localStorage.removeItem("authToken");
        alert("✅ Logout Successfully!");
        navigate("/");
    };

    // ✅ Handle Image Upload & Preview
    const handleImageUpload = (event) => {
        if (!category) {
            alert("⚠️ Please select a category before uploading images!");
            return;
        }

        const files = Array.from(event.target.files);
        if (files.length + imageFiles.length > 5) {
            alert("⚠️ You can upload a maximum of 5 images.");
            return;
        }

        const newImageURLs = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImageURLs]);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);
    };

    // ✅ Delete Image Before Submission
    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    // ✅ Get Current Location
    const getlocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setlocation(`${latitude}, ${longitude}`);
                setLocationError(""); // Clear any previous error
                setIsLoading(false);
            },
            (error) => {
                setLocationError("Unable to retrieve your location.");
                console.error("❌ Geolocation error:", error);
                setIsLoading(false);
            }
        );
    };

    // ✅ Validate Form
    const validateForm = () => {
        const errors = {};
        if (!category) errors.category = "Please select a category.";
        if (!entityName) errors.entityName = "Please enter an entity name.";
        if (!amount || isNaN(amount))
            errors.amount = "Please enter a valid amount.";
        if (!pricePerAmount || isNaN(pricePerAmount))
            errors.pricePerAmount = "Please enter a valid price.";
        if (!location) errors.location = "Please fetch your location.";
        if (!deliveryDays || isNaN(deliveryDays))
            errors.deliveryDays = "Please enter a valid number of days.";
        if (!aadharNumber || !/^\d{12}$/.test(aadharNumber))
            errors.aadharNumber = "Please enter a valid 12-digit Aadhar number.";
        if (imageFiles.length === 0)
            errors.images = "Please upload at least one image.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ✅ Submit Data to Backend
    const handleSubmit = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("entityName", entityName);
        formData.append("amount", amount);
        formData.append("pricePerAmount", pricePerAmount);
        formData.append("location", location);
        formData.append("deliveryDays", deliveryDays);
        formData.append("aadharNumber", aadharNumber);
        formData.append("category", category);

        // Append images
        imageFiles.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const response = await axios.post(
                "http://localhost:8000/api/farmer/submit",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("✅ Data submitted successfully!");
            console.log("Server response:", response.data);

            // Reset form
            setEntityName("");
            setAmount("");
            setPricePerAmount("");
            setlocation("");
            setDeliveryDays("");
            setAadharNumber("");
            setCategory("");
            setImages([]);
            setImageFiles([]);
            setFormErrors({});
        } catch (error) {
            console.error("❌ Submission error:", error);
            alert("❌ Data submission failed.");
        }
    };

    return (
        <div
            className="min-h-screen w-full overflow-auto h-[calc(100vh-120px)] overflow-y-auto" // Allow scrolling
            style={{
                backgroundImage: `url(${imageone})`,
                backgroundAttachment: "scroll",
            }}
        >
            {/* 🔹 Navbar */}
            <Navbar
                profilePicture={profilePicture}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                handleLogout={handleLogout}
            />

            {/* 🔹 Scrollable Content Container */}
            <div className="pt-4 pb-8">
                <h1 className="text-4xl font-bold text-center text-green-900">
                    Farmer's Arena
                </h1>

                <div className="max-w-2xl mx-auto bg-white p-6 mt-6 shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Upload Leaf Images</h2>

                    {/* 🔹 Category Selection Dropdown */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    >
                        <option value="">Select a category</option>
                        <option value="fallen_leaves">Fallen Leaves</option>
                        <option value="wood">Wood</option>
                        <option value="medicinal_plants">
                            Medicinal Plants (Ayurvedic)
                        </option>
                    </select>
                    {formErrors.category && (
                        <p className="text-red-500 text-sm mb-4">{formErrors.category}</p>
                    )}

                    {/* 🔹 Entity Name Input */}
                    <input
                        type="text"
                        placeholder="Entity Name"
                        value={entityName}
                        onChange={(e) => setEntityName(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    />
                    {formErrors.entityName && (
                        <p className="text-red-500 text-sm mb-4">{formErrors.entityName}</p>
                    )}

                    {/* 🔹 Amount Input */}
                    <input
                        type="text"
                        placeholder="Amount (kg, gm)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    />
                    {formErrors.amount && (
                        <p className="text-red-500 text-sm mb-4">{formErrors.amount}</p>
                    )}

                    {/* 🔹 Price Per Amount Input */}
                    <input
                        type="text"
                        placeholder="Price per amount"
                        value={pricePerAmount}
                        onChange={(e) => setPricePerAmount(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    />
                    {formErrors.pricePerAmount && (
                        <p className="text-red-500 text-sm mb-4">
                            {formErrors.pricePerAmount}
                        </p>
                    )}

                    {/* 🔹 Current Location Input */}
                    <div className="flex flex-row items-center mb-4">
                        <input
                            type="text"
                            placeholder="Current Location"
                            value={location}
                            readOnly
                            className="w-full border p-2 rounded-md mr-2"
                        />
                        <button
                            onClick={getlocation}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                            disabled={isLoading}
                        >
                            {isLoading ? "Fetching..." : "Get Location"}
                        </button>
                    </div>
                    {formErrors.location && (
                        <p className="text-red-500 text-sm mb-4">{formErrors.location}</p>
                    )}

                    {/* 🔹 Delivery Days Input */}
                    <input
                        type="text"
                        placeholder="Number of days for delivery"
                        value={deliveryDays}
                        onChange={(e) => setDeliveryDays(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    />
                    {formErrors.deliveryDays && (
                        <p className="text-red-500 text-sm mb-4">
                            {formErrors.deliveryDays}
                        </p>
                    )}

                    {/* 🔹 Aadhar Card Number Input */}
                    <input
                        type="text"
                        placeholder="Aadhar Card Number"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    />
                    {formErrors.aadharNumber && (
                        <p className="text-red-500 text-sm mb-4">
                            {formErrors.aadharNumber}
                        </p>
                    )}

                    {/* 🔹 Image Upload Input */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full border p-2 rounded-md mb-4"
                        disabled={!category}
                    />
                    {formErrors.images && (
                        <p className="text-red-500 text-sm mb-4">{formErrors.images}</p>
                    )}

                    {/* 🔹 Image Preview */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {images.map((src, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={src}
                                        alt={`Leaf ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-md shadow"
                                    />
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 🔹 Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-500"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Farmer;
