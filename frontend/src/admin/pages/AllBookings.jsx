import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import API from "../../utils/api";
import { FiMoreVertical, FiCalendar } from "react-icons/fi";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get("/bookings");
        // Sort descending
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sorted);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (s === "accepted") return "bg-green-50 text-green-700 border-green-200";
    if (s === "completed") return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="flex bg-gray-50/50">
      <AdminSidebar />

      <div className="flex-1 min-h-screen">
        <AdminNavbar />

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Platform Bookings</h1>
            <p className="text-gray-500 mt-1">Monitor all equipment rental transactions across the platform.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Booking ID</th>
                      <th className="px-6 py-4">Equipment</th>
                      <th className="px-6 py-4">Parties</th>
                      <th className="px-6 py-4">Dates</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                          {b._id.substring(18)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          {b.equipment?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs">
                            <span className="text-gray-400">F:</span> <span className="font-medium">{b.farmer?.name}</span>
                          </div>
                          <div className="text-xs mt-1">
                            <span className="text-gray-400">O:</span> <span className="font-medium">{b.owner?.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-xs flex items-center gap-2">
                          <FiCalendar className="text-gray-400" />
                          <div>
                            <div>{new Date(b.rentalStartDate).toLocaleDateString()}</div>
                            <div className="text-gray-400">to {new Date(b.rentalEndDate).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                          ₹{b.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                            <FiMoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bookings.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No bookings found on the platform yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AllBookings;