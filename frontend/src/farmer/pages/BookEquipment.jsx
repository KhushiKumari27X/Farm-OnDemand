import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import API from "../../utils/api";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";

const BookEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [equipment, setEquipment] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch equipment details to get price
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data } = await API.get(`/equipment/${id}`);
        setEquipment(data);
      } catch (err) {
        setError("Failed to load equipment details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, [id]);

  // Calculate total amount whenever dates change
  useEffect(() => {
    if (startDate && endDate && equipment) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day
      
      if (diffDays > 0) {
        setTotalAmount(diffDays * (equipment.pricePerDay || equipment.price || 0));
      } else {
        setTotalAmount(0);
      }
    }
  }, [startDate, endDate, equipment]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      return setError("End date must be after start date");
    }

    setSubmitting(true);
    setError("");

    try {
      await API.post("/bookings", {
        equipmentId: id,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
        totalAmount: totalAmount
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/farmer/bookings");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <FarmerSidebar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50">
      <FarmerSidebar />

      <div className="flex-1 min-h-screen">
        <FarmerNavbar />

        <div className="p-8 max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-green-600 mb-6 flex items-center gap-2 font-medium"
          >
            ← Back
          </button>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
            
            {equipment && (
              <p className="text-gray-500 mb-8 pb-6 border-b">
                You are booking: <span className="font-semibold text-green-700">{equipment.name}</span> for ₹{equipment.pricePerDay || equipment.price}/day.
              </p>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-green-50 text-green-700 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                <FiCheckCircle size={48} className="mb-4" />
                <h2 className="text-2xl font-bold mb-2">Booking Requested!</h2>
                <p>The owner has been notified. Redirecting to your bookings...</p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="max-w-md">
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    type="date" 
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input 
                    type="date" 
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                  />
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Duration:</span>
                    <span className="font-medium text-gray-800">
                      {startDate && endDate && new Date(startDate) <= new Date(endDate) 
                        ? `${Math.ceil(Math.abs(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1} days` 
                        : "0 days"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Price:</span>
                    <span className="text-2xl font-bold text-green-600">₹{totalAmount}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={submitting || totalAmount === 0}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-4 rounded-xl w-full shadow-lg shadow-green-200 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:shadow-none"
                >
                  <FiCalendar />
                  {submitting ? "Processing..." : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEquipment;