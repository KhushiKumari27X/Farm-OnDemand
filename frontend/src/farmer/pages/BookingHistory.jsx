import { useState, useEffect } from "react";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import BookingCard from "../components/BookingCard";
import API from "../../utils/api";
import { FiClock } from "react-icons/fi";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get("/bookings/mybookings");
        // Only show past or processed bookings
        const filtered = data.filter(b => b.status === "completed" || b.status === "cancelled" || b.status === "rejected");
        const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setHistory(sorted);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load booking history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <FarmerSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <FarmerNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Booking History</h1>
              <p className="text-gray-500 mt-2">View your past rentals and completed transactions.</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
                {error}
              </div>
            ) : history.length === 0 ? (
              <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <FiClock size={32} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">No History Found</h2>
                <p className="text-gray-500 text-lg">You don't have any past rentals yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((b) => (
                  <BookingCard key={b._id} data={b} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;