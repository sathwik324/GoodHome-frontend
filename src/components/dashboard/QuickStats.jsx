function QuickStats({ stats, loading }) {
    const totalMembers = stats?.totalMembers || 0;
    const messagesToday = stats?.messagesToday || 0;
    const upcomingEvents = stats?.upcomingEvents || 0;

    const quickStats = [
        { label: "Total Members", value: loading ? "—" : totalMembers, progress: Math.min(totalMembers * 10, 100), fill: "" },
        { label: "Messages Today", value: loading ? "—" : messagesToday, progress: Math.min(messagesToday, 100), fill: "green" },
        { label: "Upcoming Events", value: loading ? "—" : upcomingEvents, progress: Math.min(upcomingEvents * 20, 100), fill: "blue" },
    ];

    return (
        <div className="quick-stats-panel">
            <div className="panel-header">
                <h3>Family Quick Stats</h3>
            </div>
            {quickStats.map((stat, i) => (
                <div className="quick-stat-item" key={i}>
                    <div className="quick-stat-top">
                        <span>{stat.label}</span>
                        <span>{stat.value}</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className={`progress-fill ${stat.fill}`}
                            style={{ width: `${stat.progress}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuickStats;
