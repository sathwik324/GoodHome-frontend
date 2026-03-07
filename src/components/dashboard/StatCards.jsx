import { Users, Activity, MessageCircle, CalendarDays } from "lucide-react";

const iconMap = [
    { key: "totalMembers", label: "Total Members", icon: Users, color: "purple" },
    { key: "activeNow", label: "Active Now", icon: Activity, color: "green" },
    { key: "messagesToday", label: "Messages Today", icon: MessageCircle, color: "blue" },
    { key: "upcomingEvents", label: "Upcoming Events", icon: CalendarDays, color: "orange" },
];

function StatCards({ stats, loading }) {
    return (
        <div className="stat-cards-grid">
            {iconMap.map((item) => (
                <div className="stat-card" key={item.key}>
                    <div className="stat-card-header">
                        <div className={`stat-icon ${item.color}`}>
                            <item.icon size={22} />
                        </div>
                    </div>
                    <div className="stat-card-body">
                        <h3>{loading ? "—" : (stats?.[item.key] ?? 0)}</h3>
                        <p>{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatCards;
