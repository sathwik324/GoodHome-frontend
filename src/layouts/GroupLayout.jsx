import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";

const API = "https://goodhome-backend.onrender.com/api";

const getPageTitle = (pathname) => {
    if (pathname.includes("/channels")) return "Channels";
    if (pathname.includes("/members")) return "Members";
    if (pathname.includes("/events")) return "Events";
    if (pathname.includes("/media")) return "Media";
    if (pathname.includes("/settings")) return "Settings";
    return "Workspace";
};

function GroupLayout() {
    const { groupId } = useParams();
    const [user, setUser] = useState(null);
    const [group, setGroup] = useState(null);
    const [error, setError] = useState("");
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found. Please login.");
            setLoading(false);
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user and group info in parallel
        Promise.all([
            axios.get(`${API}/auth/me`, { headers }),
            axios.get(`${API}/groups/${groupId}`, { headers })
        ])
            .then(([userRes, groupRes]) => {
                setUser(userRes.data);
                setGroup(groupRes.data);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    setError("Session expired. Please login again.");
                } else {
                    setError("Failed to load group workspace. You may not have access.");
                }
            })
            .finally(() => setLoading(false));
    }, [groupId]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const pageTitle = getPageTitle(location.pathname);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="card" style={{ textAlign: "center" }}>
                    <h3>Loading workspace...</h3>
                </div>
            </div>
        );
    }

    if (error || !user || !group) {
        return (
            <div className="dashboard-error">
                <div className="card">
                    <h3>{error || "Workspace not found"}</h3>
                    <button className="btn-primary" onClick={() => navigate("/dashboard")} style={{ marginTop: "1rem" }}>
                        Return to My Groups
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar
                groupId={groupId}
                groupName={group.name}
                memberCount={group.memberCount || group.members?.length || 0}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            {mobileOpen && (
                <div className="sidebar-overlay visible" onClick={() => setMobileOpen(false)} />
            )}

            <div className="dashboard-main">
                <TopBar
                    userName={user.name}
                    pageTitle={`${group.name} - ${pageTitle}`}
                    onHamburgerClick={() => setMobileOpen(!mobileOpen)}
                />

                <div className="dashboard-content">
                    <Outlet context={{ user, group, groupId, handleLogout }} />
                </div>
            </div>
        </div>
    );
}

export default GroupLayout;
