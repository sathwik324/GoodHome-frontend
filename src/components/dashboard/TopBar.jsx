import { Bell, Moon, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function TopBar({ pageTitle, onHamburgerClick, hideHamburger }) {
    const { user } = useAuth();
    const userName = user?.name || "User";

    const initials = userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

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

            <div className="topbar-right">
                <button className="topbar-btn">
                    <Bell size={18} />
                    <span className="topbar-badge">3</span>
                </button>
                <button className="topbar-btn">
                    <Moon size={18} />
                </button>
                <div className="topbar-avatar">{initials}</div>
            </div>
        </header>
    );
}

export default TopBar;
