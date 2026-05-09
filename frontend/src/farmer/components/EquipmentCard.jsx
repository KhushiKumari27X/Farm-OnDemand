import { useNavigate } from "react-router-dom";
import { FiMapPin, FiStar } from "react-icons/fi";
import { getImageUrl } from "../../utils/api";

const EquipmentCard = ({ data }) => {
  const navigate = useNavigate();

  // Handle image path (local upload vs external URL)
  const imageUrl = getImageUrl(data.image);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 flex-shrink-0 bg-gray-50/50 flex items-center justify-center p-2">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-green-700 shadow-sm">
          {data.category || "Equipment"}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-yellow-600 flex items-center gap-1 shadow-sm">
          <FiStar className="fill-current" /> {data.rating ? Number(data.rating).toFixed(1) : "New"}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{data.name}</h2>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FiMapPin className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{data.location || "Local Area"}</span>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-5">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Rental Price</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{data.pricePerDay || data.price}<span className="text-sm font-normal text-gray-500">/day</span>
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium border ${
                data.availabilityStatus === "available" || !data.availabilityStatus
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : "bg-red-50 text-red-700 border-red-200"
              }`}>
                {data.availabilityStatus || "Available"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/farmer/equipment/${data._id || data.id}`)}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl border border-gray-200 transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => navigate(`/farmer/book/${data._id || data.id}`)}
              disabled={data.availabilityStatus && data.availabilityStatus !== "available"}
              className={`flex-1 font-semibold py-2.5 rounded-xl shadow-md transition-all ${
                data.availabilityStatus && data.availabilityStatus !== "available"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white hover:shadow-lg"
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;