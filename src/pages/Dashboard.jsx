import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import StatCards from "../components/dashboard/StatCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickStats from "../components/dashboard/QuickStats";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  /* ---- Error state ---- */
  if (error) {
    return (
      <div className="dashboard-error">
        <div className="card">
          <h3>{error}</h3>
          <button
            className="btn-primary"
            onClick={handleLogout}
            style={{ marginTop: "1rem" }}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  /* ---- Loading state ---- */
  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="card" style={{ textAlign: "center" }}>
          <h3>Loading your dashboard...</h3>
        </div>
      </div>
    );
  }

  /* ---- Main dashboard ---- */
  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay visible"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="dashboard-main">
        <TopBar
          userName={user.name}
          onHamburgerClick={() => setMobileOpen(!mobileOpen)}
        />

        <div className="dashboard-content">
          <StatCards />

          <div className="dashboard-bottom-grid">
            <RecentActivity />
            <QuickStats />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
