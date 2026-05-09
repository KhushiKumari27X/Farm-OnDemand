import { FiCalendar, FiPhone } from "react-icons/fi";

const BookingCard = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formattedStartDate = data.rentalStartDate ? new Date(data.rentalStartDate).toLocaleDateString() : "N/A";
  const formattedEndDate = data.rentalEndDate ? new Date(data.rentalEndDate).toLocaleDateString() : "N/A";

  const imageUrl = data.equipment?.image?.startsWith("http") 
    ? data.equipment.image 
    : data.equipment?.image ? `http://localhost:5000${data.equipment.image}` : "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
      
      {/* Thumbnail */}
      <div className="w-full md:w-32 h-24 flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={data.equipment?.name || "Equipment"} 
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{data.equipment?.name || "Unknown Equipment"}</h3>
            <p className="text-sm text-gray-500 font-mono mt-1">ID: {data._id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(data.status)}`}>
            {data.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center text-gray-600 text-sm">
            <FiCalendar className="mr-2 text-green-600" />
            <span>{formattedStartDate} - {formattedEndDate}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FiPhone className="mr-2 text-green-600" />
            <span>{data.owner?.phoneNumber || "Contact pending"}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 block">Total Amount</span>
            <span className="text-lg font-bold text-green-600">₹{data.totalAmount}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookingCard;