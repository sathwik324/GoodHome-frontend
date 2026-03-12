import { useState, useRef, useEffect } from "react";
import { Menu, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TopBar({ pageTitle, onHamburgerClick, hideHamburger }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const userName = user?.name || "User";
    const userEmail = user?.email || "";
    const initial = userName.charAt(0).toUpperCase();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        logout();
    };

    const handleSettings = () => {
        setDropdownOpen(false);
        // Navigate to settings - try group settings first, fallback to dashboard
        const match = window.location.pathname.match(/\/groups\/([^/]+)/);
        if (match) {
            navigate(`/groups/${match[1]}/settings`);
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <header className="topbar">
            <div style={{ display: "flex", alignItems: "center" }}>
                {!hideHamburger && (
                    <button className="hamburger-btn" onClick={onHamburgerClick}>
                        <Menu size={20} />
                    </button>
                )}
                <div className="topbar-left" style={{ marginLeft: hideHamburger ? "20px" : "0" }}>
                    <h2>{pageTitle || "Workspace"}</h2>
                    <p>Welcome back, {userName}</p>
                </div>
            </div>

            <div className="topbar-right" ref={dropRef} style={{ position: "relative" }}>
                <div
                    className="topbar-avatar-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", position: "relative" }}
                >
                    <div className="topbar-avatar">{initial}</div>
                    <ChevronDown size={14} style={{ color: "var(--color-text-secondary)", transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </div>

                {dropdownOpen && (
                    <div className="topbar-dropdown" style={{
                        position: "absolute", top: "calc(100% + 8px)", right: "0",
                        background: "var(--color-card)", border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)", padding: "8px 0",
                        minWidth: "220px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                        zIndex: 999
                    }}>
                        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
                            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--color-text-primary)" }}>{userName}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>{userEmail}</div>
                        </div>
                        <button onClick={handleSettings} style={{
                            display: "flex", alignItems: "center", gap: "10px", width: "100%",
                            padding: "10px 16px", background: "none", border: "none",
                            color: "var(--color-text-primary)", cursor: "pointer", fontSize: "0.9rem",
                            textAlign: "left"
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                        >
                            <Settings size={16} /> Settings
                        </button>
                        <button onClick={handleLogout} style={{
                            display: "flex", alignItems: "center", gap: "10px", width: "100%",
                            padding: "10px 16px", background: "none", border: "none",
                            color: "#F87171", cursor: "pointer", fontSize: "0.9rem",
                            textAlign: "left"
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default TopBar;
