import { UserPlus, MessageSquare, CalendarPlus, ImagePlus, Heart } from "lucide-react";

const activities = [
    {
        icon: UserPlus,
        color: "green",
        title: "New member joined",
        description: "Sarah joined the family group.",
        time: "2 min ago",
    },
    {
        icon: MessageSquare,
        color: "",
        title: "Message in #general",
        description: "Dad shared a recipe in the general channel.",
        time: "18 min ago",
    },
    {
        icon: CalendarPlus,
        color: "orange",
        title: "New event created",
        description: "Mom created \"Sunday Family Dinner\" for this weekend.",
        time: "1 hr ago",
    },
    {
        icon: ImagePlus,
        color: "blue",
        title: "Photos shared",
        description: "Alex uploaded 4 photos to the \"Vacation 2026\" album.",
        time: "3 hrs ago",
    },
    {
        icon: Heart,
        color: "pink",
        title: "Milestone reached",
        description: "Your family group reached 100 shared memories!",
        time: "Yesterday",
    },
];

function RecentActivity() {
    return (
        <div className="activity-panel">
            <div className="panel-header">
                <h3>Recent Activity</h3>
                <a href="#">View all</a>
            </div>
            <div className="activity-list">
                {activities.map((item, i) => (
                    <div className="activity-item" key={i}>
                        <div className={`activity-icon ${item.color}`}>
                            <item.icon size={18} />
                        </div>
                        <div className="activity-text">
                            <p>
                                <strong>{item.title}</strong>
                            </p>
                            <p>{item.description}</p>
                        </div>
                        <span className="activity-time">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentActivity;
