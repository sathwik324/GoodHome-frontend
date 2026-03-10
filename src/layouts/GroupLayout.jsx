import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";

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
    const [group, setGroup] = useState(null);
    const [error, setError] = useState("");
    const { user, logout } = useAuth(); // using user from AuthContext
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/groups/${groupId}`)
            .then((groupRes) => {
                setGroup(groupRes.data);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    logout(); // AuthContext.logout already navigates to /login
                } else if (err.response?.status === 403) {
                    navigate("/dashboard");
                } else {
                    setError("Failed to load group workspace. You may not have access.");
                }
            })
            .finally(() => setLoading(false));
    }, [groupId, navigate, logout]);

    const handleLogout = () => {
        logout(); // AuthContext.logout already navigates to /login
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

    if (error || !group) {
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
