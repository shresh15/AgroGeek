import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    res.send("Welcome to the backend!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
