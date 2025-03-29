import Register from "./pages/Register.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
    </Routes>
  );
};

export default App;
