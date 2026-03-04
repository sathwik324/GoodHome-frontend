import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

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

    axios
      .get("https://goodhome-backend.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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

  if (error) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "var(--radius-full)",
              background: "var(--color-primary-light)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "var(--spacing-sm)" }}>
            Session Error
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: "var(--spacing-lg)",
              fontSize: "0.95rem",
            }}
          >
            {error}
          </p>
          <button className="btn-primary" onClick={handleLogout}>
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-full)",
              border: "3px solid var(--color-border)",
              borderTopColor: "var(--color-primary)",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto var(--spacing-md)",
            }}
          />
          <p style={{ color: "var(--color-text-secondary)" }}>
            Loading your portal...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Properties", value: "12" },
    { label: "Active Listings", value: "4" },
    { label: "Inquiries", value: "28" },
  ];

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <h2>
              {"Welcome back, "}
              {user.name}
            </h2>
            <p>{"Here's what's happening with your properties today."}</p>
          </div>

          {/* Stat Cards */}
          <div className="cards">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <h4>{stat.label}</h4>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* User Info */}
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "1.25rem",
              marginTop: "var(--spacing-2xl)",
              marginBottom: "var(--spacing-md)",
              color: "var(--color-text-primary)",
            }}
          >
            Account Details
          </h3>
          <div className="user-info-card">
            <div className="info-row">
              <span className="info-label">Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
