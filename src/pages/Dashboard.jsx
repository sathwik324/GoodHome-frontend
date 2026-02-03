import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { logout } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    axios.get("https://goodhome-backend.onrender.com", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(() => {
      setError("Session expired. Please login again.");
    });

  }, []);

  const handleLogout = () => {
  logout();
  window.location.href = "/";
};


  if (error) return <h3>{error}</h3>;
  if (!user) return <h3>Loading user...</h3>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
