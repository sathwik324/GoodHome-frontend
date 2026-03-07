import { Bell, Moon, Menu } from "lucide-react";

function TopBar({ userName, pageTitle, onHamburgerClick, hideHamburger }) {
    const initials = userName
        ? userName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "?";

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
                    <p>Welcome back, {userName || "User"}</p>
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
