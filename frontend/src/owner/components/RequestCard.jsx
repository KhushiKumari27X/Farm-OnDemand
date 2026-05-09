import { FiCalendar, FiUser, FiMapPin, FiCheckCircle, FiXCircle, FiDollarSign } from "react-icons/fi";

export default function RequestCard({ request, onUpdateStatus }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold shadow-sm">Accepted</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold shadow-sm">Rejected</span>;
      case "completed":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold shadow-sm">Completed</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold shadow-sm">Pending</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-sm">
            <FiUser />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{request.farmer?.name || "Unknown Farmer"}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <FiMapPin className="text-gray-400" /> {request.farmer?.address || "No address provided"}
            </p>
          </div>
        </div>
        <div className="text-right flex items-center md:flex-col gap-3 md:gap-1">
          {getStatusBadge(request.status)}
          <span className="text-sm font-medium text-gray-500">{formatDate(request.createdAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-4 flex gap-4 items-center">
          <img 
            src={request.equipment?.image ? (request.equipment.image.startsWith('http') ? request.equipment.image : `http://localhost:5000${request.equipment.image}`) : "https://via.placeholder.com/150"} 
            alt={request.equipment?.name} 
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Equipment</p>
            <p className="font-bold text-gray-800 line-clamp-1">{request.equipment?.name || "Unknown Machine"}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-center">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Booking Period</p>
          <p className="font-semibold text-gray-800 flex items-center gap-2">
            <FiCalendar className="text-green-600" /> 
            {formatDate(request.rentalStartDate)} - {formatDate(request.rentalEndDate)}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-green-50/50 p-4 rounded-xl border border-green-50 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Estimated Total</p>
            <p className="font-bold text-xl text-green-700">₹{request.totalAmount || "0"}</p>
          </div>
        </div>

        {request.status === "pending" && (
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => onUpdateStatus(request._id, "rejected")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors font-bold"
            >
              <FiXCircle /> Decline
            </button>
            <button 
              onClick={() => onUpdateStatus(request._id, "accepted")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-200 transition-colors font-bold"
            >
              <FiCheckCircle /> Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}