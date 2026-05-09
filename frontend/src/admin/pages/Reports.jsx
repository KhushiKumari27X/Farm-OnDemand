import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function Reports() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <AdminNavbar />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Reports</h2>
          <p className="text-gray-600">Reports coming soon...</p>
        </div>
      </div>
    </div>
  );
}
export default Reports;