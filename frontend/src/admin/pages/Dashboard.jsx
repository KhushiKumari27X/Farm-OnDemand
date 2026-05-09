import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import StatsCard from "../components/StatsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import API from "../../utils/api";
import { FiUsers, FiUser, FiTool, FiCalendar, FiDollarSign } from "react-icons/fi";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/stats");
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-gray-50/50">

      <AdminSidebar />

      <div className="flex-1 min-h-screen">
        <AdminNavbar />

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-1">Here's what's happening on your platform today.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
              {error}
            </div>
          ) : stats && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatsCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={<FiDollarSign size={24} />} trend={12.5} />
                <StatsCard title="Total Farmers" value={stats.farmers} icon={<FiUsers size={24} />} trend={5.2} />
                <StatsCard title="Total Owners" value={stats.owners} icon={<FiUser size={24} />} trend={2.1} />
                <StatsCard title="Equipment" value={stats.equipment} icon={<FiTool size={24} />} trend={8.4} />
                <StatsCard title="Bookings" value={stats.bookings} icon={<FiCalendar size={24} />} trend={15.3} />
              </div>

              {/* Chart */}
              <AnalyticsChart />
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;