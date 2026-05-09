import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import AnalyticsChart from "../components/AnalyticsChart";

function Analytics() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <AdminNavbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}
export default Analytics;