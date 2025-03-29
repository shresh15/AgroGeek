import express from "express";
import Data from "../models/Data.js"; // Import the Data schema
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

// 📌 Route to handle farmer data submission
router.post("/submit", upload.array("images", 5), async (req, res) => {
  try {
    const {
      entityName,
      amount,
      pricePerAmount,
      location,
      deliveryDays,
      aadharNumber,
      category,
    } = req.body;

    // Validate inputs
    if (
      !entityName ||
      !amount ||
      !pricePerAmount ||
      !location ||
      !deliveryDays ||
      !aadharNumber ||
      !category
    ) {
      res
        .status(400)
        .json({ message: "All fields are required", body: req.body });
      return;
    }

    // Get image paths (if any)
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    // Create new data entry
    const newData = new Data({
      entityName,
      amount,
      pricePerAmount,
      location,
      deliveryDays,
      aadharNumber,
      category,
      imagePaths, // Save image paths in the database
    });

    // Save to MongoDB
    await newData.save();

    res
      .status(201)
      .json({ message: "✅ Data submitted successfully!", data: newData });
  } catch (error) {
    console.error("❌ Error submitting data:", error);
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File upload error: " + error.message });
    }
    res.status(500).json({ message: "❌ Server error during data submission" });
  }
});

// 📌 Route to fetch farmer data based on category
router.get("/submissions", async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params

    if (!category) {
      return res
        .status(400)
        .json({ message: "Category is required for fetching data" });
    }

    const submissions = await Data.find({ category });

    if (submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found" });
    }

    res.status(200).json({ message: "✅ Submissions Fetched", data: submissions });
  } catch (error) {
    console.error("❌ Error fetching submissions:", error);
    res.status(500).json({ message: "❌ Server error during data retrieval" });
  }
});

export default router;
