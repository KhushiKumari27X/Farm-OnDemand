import { useState, useEffect } from "react";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import StatsCard from "../components/StatsCard";
import { FiList, FiClock, FiCheckCircle } from "react-icons/fi";
import API from "../../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/bookings/mybookings");
        const pending = data.filter(b => b.status === "pending").length;
        const completed = data.filter(b => b.status === "completed").length;
        
        setStats({
          total: data.length,
          pending,
          completed
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <FarmerSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <FarmerNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
              <p className="text-gray-500 mt-2">Welcome back! Track your equipment rentals and activity.</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard 
                  title="Total Bookings" 
                  value={stats.total} 
                  icon={<FiList />} 
                  colorClass="from-blue-50 to-indigo-50 text-blue-600 border-blue-100"
                />
                <StatsCard 
                  title="Pending Requests" 
                  value={stats.pending} 
                  icon={<FiClock />} 
                  colorClass="from-orange-50 to-amber-50 text-orange-600 border-orange-100"
                />
                <StatsCard 
                  title="Completed Rentals" 
                  value={stats.completed} 
                  icon={<FiCheckCircle />} 
                  colorClass="from-green-50 to-emerald-50 text-green-600 border-green-100"
                />
              </div>
            )}
            
            <div className="mt-12 bg-green-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-green-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
              <h2 className="text-2xl font-bold mb-2 relative z-10">Need Equipment for the Next Season?</h2>
              <p className="mb-6 opacity-90 relative z-10 max-w-xl">Browse our extensive catalog of verified agricultural machinery and book instantly to ensure your farm runs smoothly.</p>
              <a href="/farmer/browse" className="inline-block bg-white text-green-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors relative z-10">
                Browse Equipment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;