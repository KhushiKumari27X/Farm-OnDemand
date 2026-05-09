import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FiHome,
  FiTool,
  FiList,
  FiClock,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

const FarmerSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menu = [
    { name: "Dashboard", path: "/farmer", icon: <FiHome /> },
    { name: "Browse Equipment", path: "/farmer/browse", icon: <FiTool /> },
    { name: "My Bookings", path: "/farmer/bookings", icon: <FiList /> },
    { name: "History", path: "/farmer/history", icon: <FiClock /> },
    { name: "Profile", path: "/farmer/profile", icon: <FiUser /> },
    { name: "Feedback", path: "/farmer/feedback", icon: <FiMessageSquare /> },
  ];

  return (
    <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 min-h-screen flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <img src={logo} alt="Farm On-Demand" className="h-16 md:h-20 object-contain w-auto scale-110" />
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 mt-2 px-4">
          Farmer Control Panel
        </div>
        <ul className="space-y-1.5">
          {menu.map((item) => {
            const isActive = currentPath === item.path || (currentPath.startsWith(item.path) && item.path !== "/farmer");
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-green-50 text-green-700 shadow-sm border border-green-100/50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-lg ${isActive ? "text-green-600" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-6 border-t border-gray-100">
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-4 text-white shadow-lg shadow-green-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-xl transform translate-x-8 -translate-y-8"></div>
          <h4 className="font-bold mb-1 relative z-10">Need Help?</h4>
          <p className="text-sm text-green-50 mb-3 relative z-10">Contact support 24/7</p>
          <a 
            href="mailto:support@farmondemand.com"
            className="block text-center bg-white text-green-700 w-full py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors relative z-10"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FarmerSidebar;