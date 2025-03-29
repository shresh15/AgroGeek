import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Farmer from "./pages/Farmer";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details" element={<Details />} />
      <Route path="/Farmer" element={<Farmer />} />
    </Routes>
  );
}

export default App;
