import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiMapPin, FiCalendar, FiBox } from "react-icons/fi";
import { getImageUrl } from "../../utils/api";

export default function EquipmentCard({ item, onDelete }) {
  const imageUrl = getImageUrl(item.image);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-green-700 shadow-sm">
          {item.category}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
            item.availabilityStatus === 'available' || !item.availabilityStatus 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {item.availabilityStatus || 'Available'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-1">{item.name}</h3>
        
        <div className="flex flex-col gap-2 text-gray-500 text-sm mb-4">
          <span className="flex items-center"><FiMapPin className="mr-2" /> {item.location || 'Not specified'}</span>
          <span className="flex items-center font-medium"><FiBox className="mr-2 text-green-600" /> Stock: {item.stock !== undefined ? item.stock : 1}</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-medium">Rental Price</p>
            <p className="text-lg font-bold text-green-600">₹{item.pricePerDay || item.price}<span className="text-xs font-normal text-gray-500">/day</span></p>
          </div>
          
          <div className="flex gap-2">
            <Link 
              to={`/owner/edit/${item._id}`} 
              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center"
              title="Edit"
            >
              <FiEdit2 size={18} />
            </Link>
            <button 
              onClick={onDelete} 
              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center"
              title="Delete"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}