import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogOut, FiUser, FiBell, FiInbox, FiCheckCircle, FiXCircle } from "react-icons/fi";
import API from "../../utils/api";

const FarmerNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await API.get("/bookings/mybookings");
        // Show recently updated bookings as notifications (accepted/rejected)
        const updates = data.filter(r => r.status !== 'pending').slice(0, 5);
        setNotifications(updates);
      } catch (err) {
        console.error("Failed to fetch farmer notifications");
      }
    };
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight hidden md:block">Farmer Dashboard</h1>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-gray-400 hover:text-green-600 transition-colors rounded-full hover:bg-green-50"
          >
            <FiBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {/* Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Booking Updates</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{notifications.length}</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 flex flex-col items-center">
                    <FiInbox className="text-gray-300 mb-2" size={24} />
                    <p className="text-sm text-gray-500">No new booking updates</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n._id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer" onClick={() => navigate('/farmer/bookings')}>
                      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.status === 'accepted' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {n.status === 'accepted' ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Booking {n.status}</p>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{n.equipment?.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{new Date(n.updatedAt || n.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Link to="/farmer/profile" className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-bold text-gray-800 leading-tight group-hover:text-green-600 transition-colors">{user?.name || 'Farmer Profile'}</span>
            <span className="text-xs text-green-600 font-medium">Verified User</span>
          </div>
          
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-green-200 border-2 border-white group-hover:scale-105 transition-transform">
            <FiUser size={18} />
          </div>
        </Link>

        <div className="h-8 w-px bg-gray-200"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-red-50"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default FarmerNavbar;