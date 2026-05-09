import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { 
  FiHome, 
  FiUsers, 
  FiUser, 
  FiTool, 
  FiCalendar, 
  FiPieChart, 
  FiMessageSquare, 
  FiSettings 
} from "react-icons/fi";

function AdminSidebar() {
  const navItems = [
    { path: "/admin", name: "Dashboard", icon: <FiHome />, end: true },
    { path: "/admin/farmers", name: "Farmers", icon: <FiUsers /> },
    { path: "/admin/owners", name: "Owners", icon: <FiUser /> },
    { path: "/admin/equipment", name: "Equipment", icon: <FiTool /> },
    { path: "/admin/bookings", name: "Bookings", icon: <FiCalendar /> },
    { path: "/admin/analytics", name: "Analytics", icon: <FiPieChart /> },
    { path: "/admin/feedback", name: "Feedback", icon: <FiMessageSquare /> },
    { path: "/admin/settings", name: "Settings", icon: <FiSettings /> },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
      isActive
        ? "bg-green-600 text-white shadow-md shadow-green-200"
        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-5 min-h-screen sticky top-0 h-screen overflow-y-auto hidden md:block">
      
      <div className="mb-8 ml-2 mt-2">
        {/* Placeholder for Logo if actual doesn't load */}
        <div className="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-800">
          <span className="text-green-600">Farm</span>OnDemand
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ml-2">Main Menu</div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink 
            key={item.name}
            to={item.path} 
            end={item.end}
            className={linkClass}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}
export default AdminSidebar;