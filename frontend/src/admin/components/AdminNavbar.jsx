import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiBell, FiLogOut, FiMenu, FiUser, FiCalendar } from "react-icons/fi";
import API from "../../utils/api";

function AdminNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef();

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Fetch recent data for notifications
    const fetchNotifications = async () => {
      try {
        const [bookingsRes, farmersRes] = await Promise.all([
          API.get("/bookings"),
          API.get("/admin/users/farmer")
        ]);
        
        const recentBookings = bookingsRes.data.slice(0, 3).map(b => ({
          id: b._id,
          type: "booking",
          title: "New Booking",
          message: `${b.farmer?.name || 'A user'} booked ${b.equipment?.name || 'equipment'}`,
          time: new Date(b.createdAt).toLocaleDateString()
        }));

        const recentUsers = farmersRes.data.slice(0, 2).map(u => ({
          id: u._id,
          type: "user",
          title: "New User",
          message: `${u.name} registered as a farmer`,
          time: new Date(u.createdAt).toLocaleDateString()
        }));

        setNotifications([...recentBookings, ...recentUsers].sort((a,b) => new Date(b.time) - new Date(a.time)));
      } catch (err) {
        console.error("Failed to fetch notifications");
      }
    };
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">

      {/* Left - Mobile Menu */}
      <div className="flex items-center gap-6">
        <button className="md:hidden text-gray-500 hover:text-green-600 transition-colors">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Right - Profile & Actions */}
      <div className="flex items-center gap-5">
        
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
              <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                <h3 className="font-bold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 py-6">No new notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3">
                      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'booking' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                        {n.type === 'booking' ? <FiCalendar size={14} /> : <FiUser size={14} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200"></div>

        {/* Profile */}
        <Link to="/admin/settings" className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-green-700 transition-colors">{user?.name || "Administrator"}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || "Admin"}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center rounded-full text-sm font-bold shadow-sm shadow-green-200">
            {user?.name?.[0]?.toUpperCase() || "A"}
          </div>
        </Link>

        <button
          onClick={handleLogout}
          title="Logout"
          className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        >
          <FiLogOut size={20} />
        </button>

      </div>
    </header>
  );
}
export default AdminNavbar;