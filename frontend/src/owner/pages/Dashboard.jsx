import { useState, useEffect } from "react";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import StatsCard from "../components/StatsCard";
import { FiTool, FiCalendar, FiDollarSign } from "react-icons/fi";
import API from "../../utils/api";

export default function Dashboard() {
  const [equipmentCount, setEquipmentCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/equipment");
        const myEquipment = data.filter(item => item.owner?._id === user?._id || item.owner === user?._id);
        setEquipmentCount(myEquipment.length);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };
    fetchStats();
  }, [user?._id]);

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <OwnerSidebar />

      <div className="flex-1">
        <OwnerNavbar />

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Owner Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, manage your equipment fleet from here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="My Equipment" 
              value={equipmentCount} 
              icon={<FiTool />} 
              colorClass="from-blue-50 to-indigo-50 text-blue-600 border-blue-100"
            />
            <StatsCard 
              title="Active Bookings" 
              value="0" 
              icon={<FiCalendar />} 
              colorClass="from-orange-50 to-amber-50 text-orange-600 border-orange-100"
            />
            <StatsCard 
              title="Total Earnings" 
              value="₹0" 
              icon={<FiDollarSign />} 
              colorClass="from-green-50 to-emerald-50 text-green-600 border-green-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}