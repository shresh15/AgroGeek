import Register from "./pages/Register.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Farmer from "./pages/Farmer.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Farmer" element={<Farmer />} />
    </Routes>
  );
};

export default App;
