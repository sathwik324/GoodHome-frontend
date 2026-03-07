import { MessageSquare } from "lucide-react";

function formatTime(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

function RecentActivity({ activities, loading }) {
    const hasActivities = activities && activities.length > 0;

    return (
        <div className="activity-panel">
            <div className="panel-header">
                <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
                {loading && (
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>Loading...</p>
                )}
                {!loading && !hasActivities && (
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>
                        No recent activity yet. Start chatting in a channel!
                    </p>
                )}
                {!loading &&
                    hasActivities &&
                    activities.map((item, i) => (
                        <div className="activity-item" key={item._id || i}>
                            <div className="activity-icon">
                                <MessageSquare size={18} />
                            </div>
                            <div className="activity-text">
                                <p>
                                    <strong>{item.title || item.type || "Activity"}</strong>
                                </p>
                                <p>{item.description || item.text || ""}</p>
                            </div>
                            <span className="activity-time">
                                {formatTime(item.createdAt || item.time)}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default RecentActivity;
