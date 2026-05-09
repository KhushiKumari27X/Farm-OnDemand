import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import { FiMapPin, FiStar, FiCalendar, FiCheckCircle, FiUser } from "react-icons/fi";
import API, { getImageUrl } from "../../utils/api";

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await API.get(`/equipment/${id}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load equipment details");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id]);

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

  if (error || !data) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <FarmerSidebar />
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">Oops!</h2>
            <p>{error || "Equipment not found"}</p>
            <button 
              onClick={() => navigate(-1)} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50">
      <FarmerSidebar />

      <div className="flex-1 min-h-screen">
        <FarmerNavbar />

        <div className="p-8 max-w-7xl mx-auto">
          {/* Breadcrumb / Back button */}
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-green-600 mb-6 flex items-center gap-2 transition-colors font-medium"
          >
            ← Back to Browse
          </button>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto bg-gray-50/50 flex items-center justify-center p-4">
                <img 
                  src={getImageUrl(data.image)} 
                  alt={data.name} 
                  className="w-full h-full object-contain mix-blend-multiply"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-semibold text-green-700 shadow">
                  {data.category}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{data.name}</h1>
                    <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100 text-yellow-700 font-semibold shadow-sm">
                      <FiStar className="fill-current mr-1" /> {data.rating ? Number(data.rating).toFixed(1) : "New"}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-gray-100">
                    <div className="flex items-center">
                      <FiMapPin className="mr-1.5 text-gray-400" />
                      <span>{data.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCheckCircle className="mr-1.5 text-green-500" />
                      <span>{data.reviewsCount || 0} Reviews</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {data.description || "No description provided for this equipment."}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability & Details</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <li className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <FiCheckCircle className="mr-2 text-green-500 flex-shrink-0" />
                      Status: <span className="ml-1 capitalize">{data.stock > 0 ? (data.availabilityStatus || "Available") : "Out of Stock"}</span>
                    </li>
                    <li className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <div className="w-4 h-4 rounded bg-gray-200 mr-2 flex items-center justify-center text-[10px] font-bold text-gray-600">#</div>
                      Stock Available: <span className="ml-1 font-bold text-gray-800">{data.stock !== undefined ? data.stock : 1} units</span>
                    </li>
                    {data.availableFrom && data.availableTo && (
                       <li className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 sm:col-span-2">
                         <FiCalendar className="mr-2 text-blue-500 flex-shrink-0" />
                         Available: <span className="ml-1 font-medium">{new Date(data.availableFrom).toLocaleDateString()} to {new Date(data.availableTo).toLocaleDateString()}</span>
                       </li>
                    )}
                  </ul>

                  {/* Owner Info */}
                  {data.owner && (
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-8">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                        <FiUser size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Owned by</p>
                        <p className="font-semibold text-gray-800">{data.owner.name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing & Booking Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-sm text-green-800 font-medium mb-1">Rental Price</p>
                    <div className="text-4xl font-bold text-green-700">
                      ₹{data.pricePerDay || data.price}<span className="text-lg font-normal text-green-600">/day</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/farmer/book/${id}`)}
                    disabled={data.availabilityStatus !== "available" || data.stock <= 0}
                    className={`w-full sm:w-auto text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                      data.availabilityStatus === "available" && data.stock > 0
                        ? "bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 shadow-green-200 hover:shadow-xl" 
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FiCalendar size={20} />
                    {data.stock <= 0 ? "Out of Stock" : (data.availabilityStatus === "available" ? "Book Equipment" : "Unavailable")}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;