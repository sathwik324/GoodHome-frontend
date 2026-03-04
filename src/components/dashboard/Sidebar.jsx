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
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: MessageSquare, label: "Channels" },
    { icon: Users, label: "Members", badge: 12 },
    { icon: CalendarDays, label: "Events" },
    { icon: Image, label: "Media" },
    { icon: Settings, label: "Settings" },
];

function Sidebar({ collapsed, onToggle, mobileOpen }) {
    return (
        <aside className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
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
                    <button
                        key={item.label}
                        className={`nav-item${item.active ? " active" : ""}`}
                    >
                        <item.icon className="nav-icon" size={20} />
                        <span className="nav-label">{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </button>
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
