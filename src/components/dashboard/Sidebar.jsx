import { NavLink, useNavigate } from "react-router-dom";
import {
    MessageSquare,
    Users,
    CalendarDays,
    Image,
    Settings,
    ChevronsLeft,
    ChevronsRight,
    Home,
    ArrowLeft
} from "lucide-react";

function Sidebar({ groupId, groupName, memberCount, collapsed, onToggle, mobileOpen, onMobileClose }) {
    const navigate = useNavigate();

    const navItems = [
        { icon: MessageSquare, label: "Channels", to: `/groups/${groupId}/channels` },
        { icon: Users, label: "Members", to: `/groups/${groupId}/members`, badge: memberCount > 0 ? memberCount : null },
        { icon: CalendarDays, label: "Events", to: `/groups/${groupId}/events` },
        { icon: Image, label: "Media", to: `/groups/${groupId}/media` },
        { icon: Settings, label: "Settings", to: `/groups/${groupId}/settings` },
    ];

    return (
        <aside className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="brand-icon">
                    <Home size={20} />
                </div>
                <h1>GoodHome</h1>
            </div>

            {/* Back to Groups */}
            <div style={{ padding: "0 12px", marginBottom: "8px" }}>
                <button
                    onClick={() => { navigate("/dashboard"); onMobileClose && onMobileClose(); }}
                    style={{
                        display: "flex", alignItems: "center", gap: 8, background: "none", border: "none",
                        color: "var(--color-text-secondary)", cursor: "pointer", fontSize: "0.85rem",
                        padding: "8px 12px", width: "100%", borderRadius: "var(--radius-md)",
                        transition: "background 0.2s"
                    }}
                    className="back-btn-hover"
                >
                    <ArrowLeft size={16} />
                    {!collapsed && <span>My Groups</span>}
                </button>
            </div>

            {/* Group Name Header */}
            {!collapsed && (
                <div style={{ padding: "8px 24px 16px", color: "white", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", opacity: 0.8 }}>
                    {groupName}
                </div>
            )}

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
                        onClick={onMobileClose}
                    >
                        <item.icon className="nav-icon" size={20} />
                        <span className="nav-label">{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Collapse Toggle */}
            <button className="sidebar-toggle" onClick={onToggle}>
                {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
            </button>

            <style>{`
        .back-btn-hover:hover {
          background-color: rgba(255,255,255,0.05);
          color: white !important;
        }
      `}</style>
        </aside>
    );
}

export default Sidebar;
