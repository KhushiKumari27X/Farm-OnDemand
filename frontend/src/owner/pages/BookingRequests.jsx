import { useState, useEffect } from "react";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import RequestCard from "../components/RequestCard";
import API from "../../utils/api";
import { FiInbox } from "react-icons/fi";
import toast from "react-hot-toast";

export default function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const { data } = await API.get("/bookings/requests");
      // Filter out only pending ones for the "Requests" page
      setRequests(data.filter(req => req.status === "pending"));
    } catch (err) {
      setError("Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      setRequests(requests.filter((req) => req._id !== id));
      toast.success(`Booking ${status} successfully!`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <OwnerNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Booking Requests</h1>
              <p className="text-gray-500 mt-2">Manage incoming rental requests from farmers.</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
                {error}
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center max-w-2xl mx-auto mt-10">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-3xl">
                  <FiInbox />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Pending Requests</h3>
                <p className="text-gray-500 text-lg">You're all caught up! There are no new booking requests at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <RequestCard 
                    key={req._id} 
                    request={req} 
                    onUpdateStatus={handleUpdateStatus} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}