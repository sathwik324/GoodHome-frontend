import StatCards from "../components/dashboard/StatCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickStats from "../components/dashboard/QuickStats";

function Dashboard() {
  return (
    <>
      <StatCards />
      <div className="dashboard-bottom-grid">
        <RecentActivity />
        <QuickStats />
      </div>
    </>
  );
}

export default Dashboard;
