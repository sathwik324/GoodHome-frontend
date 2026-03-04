const quickStats = [
    {
        label: "Most Active Member",
        value: "Mom",
        progress: 85,
        fill: "",
    },
    {
        label: "Total Channels",
        value: "6",
        progress: 60,
        fill: "green",
    },
    {
        label: "Photos Shared",
        value: "234",
        progress: 72,
        fill: "blue",
    },
];

function QuickStats() {
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
