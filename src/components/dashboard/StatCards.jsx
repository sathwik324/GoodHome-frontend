import { Users, Activity, MessageCircle, CalendarDays } from "lucide-react";

const stats = [
    {
        label: "Total Members",
        value: "12",
        trend: "+2",
        trendDir: "up",
        icon: Users,
        color: "purple",
    },
    {
        label: "Active Now",
        value: "5",
        trend: "+1",
        trendDir: "up",
        icon: Activity,
        color: "green",
    },
    {
        label: "Messages Today",
        value: "128",
        trend: "+18%",
        trendDir: "up",
        icon: MessageCircle,
        color: "blue",
    },
    {
        label: "Upcoming Events",
        value: "3",
        trend: "-1",
        trendDir: "down",
        icon: CalendarDays,
        color: "orange",
    },
];

function StatCards() {
    return (
        <div className="stat-cards-grid">
            {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                    <div className="stat-card-header">
                        <div className={`stat-icon ${stat.color}`}>
                            <stat.icon size={22} />
                        </div>
                        <span className={`stat-trend ${stat.trendDir}`}>
                            {stat.trendDir === "up" ? "↑" : "↓"} {stat.trend}
                        </span>
                    </div>
                    <div className="stat-card-body">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatCards;
