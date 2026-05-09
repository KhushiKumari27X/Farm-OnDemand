import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import API from "../../utils/api";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data } = await API.get("/feedback");
        setFeedbacks(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50/50">
        <AdminNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">User Feedback</h1>
            <p className="text-gray-500 mt-1">Review ratings and messages submitted by users.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr className="text-left text-gray-500 font-semibold tracking-wider uppercase text-xs">
                      <th className="py-4 px-6">User</th>
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6">Message</th>
                      <th className="py-4 px-6">Rating</th>
                      <th className="py-4 px-6">Date</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">
                    {feedbacks.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          No feedback has been submitted yet.
                        </td>
                      </tr>
                    ) : (
                      feedbacks.map((fb) => (
                        <tr key={fb._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 font-semibold text-gray-800">
                            {fb.user?.name || "Unknown User"}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                              fb.user?.role === "farmer" ? "bg-blue-50 text-blue-700" : 
                              fb.user?.role === "owner" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-700"
                            }`}>
                              {fb.user?.role || "Unknown"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600 max-w-md">
                            {fb.review}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center text-yellow-500">
                              <span className="font-bold mr-1">{fb.rating}</span>
                              <span className="text-lg">★</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-500 text-xs">
                            {new Date(fb.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Feedback;