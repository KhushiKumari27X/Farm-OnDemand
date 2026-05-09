import { useState, useEffect } from "react";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import BookingCard from "../components/BookingCard";
import API from "../../utils/api";
import { FiArchive } from "react-icons/fi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const { data } = await API.get("/bookings/mybookings");
        // Sort bookings by created date, newest first
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sorted);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <FarmerSidebar />

      <div className="flex-1">
        <FarmerNavbar />

        <div className="p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Bookings</h1>
            <p className="text-gray-500 mt-2">Track and manage your equipment rentals.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
              {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <FiArchive size={32} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</h2>
              <p className="text-gray-500">You haven't rented any equipment yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <BookingCard key={b._id} data={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;