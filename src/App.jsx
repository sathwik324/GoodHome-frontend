import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} /> 
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
    </Routes>
  );
}

export default App;
