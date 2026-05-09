import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import API, { getImageUrl } from "../../utils/api";
import { FiMoreVertical, FiTool, FiSearch, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

function ManageEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data } = await API.get("/equipment");
        // Sort newest first
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEquipment(sorted);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await API.delete(`/equipment/${id}`);
        setEquipment(equipment.filter(e => e._id !== id));
        toast.success("Equipment deleted successfully");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete equipment");
      }
    }
  };

  const filteredEquipment = equipment.filter(e => 
    e.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminNavbar />

        <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Manage Equipment</h1>
              <p className="text-gray-500 mt-1">Oversee all agricultural machinery listed on the platform.</p>
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search equipment..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none w-full md:w-64 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Owner</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Price/Day</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredEquipment.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img 
                              src={getImageUrl(item.image)} 
                              alt={item.name} 
                              className="w-10 h-10 rounded-lg object-cover"
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" }}
                            />
                            <div>
                              <div className="font-semibold text-gray-800">{item.name}</div>
                              <div className="text-xs text-gray-500">{item._id.substring(18)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                          {item.owner?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                          ₹{item.pricePerDay || item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              item.availabilityStatus === "available" || !item.availabilityStatus
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.availabilityStatus === "available" || !item.availabilityStatus ? "bg-green-500" : "bg-gray-500"}`}></span>
                            {item.availabilityStatus || "Available"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleDelete(item._id)}
                              className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" 
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden">
                            <FiMoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredEquipment.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <FiTool size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-800 font-bold text-lg mb-1">No Equipment Found</p>
                  <p className="text-gray-500">There is no equipment matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ManageEquipment;