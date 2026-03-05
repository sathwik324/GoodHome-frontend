import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    CalendarDays,
    Image,
    Settings,
    ChevronsLeft,
    ChevronsRight,
    Home,
} from "lucide-react";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
    { icon: MessageSquare, label: "Channels", to: "/dashboard/channels" },
    { icon: Users, label: "Members", to: "/dashboard/members", badge: 12 },
    { icon: CalendarDays, label: "Events", to: "/dashboard/events" },
    { icon: Image, label: "Media", to: "/dashboard/media" },
    { icon: Settings, label: "Settings", to: "/dashboard/settings" },
];

function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
    return (
        <aside
            className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}
        >
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="brand-icon">
                    <Home size={20} />
                </div>
                <h1>GoodHome</h1>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.to === "/dashboard"}
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
        </aside>
    );
}

export default Sidebar;
