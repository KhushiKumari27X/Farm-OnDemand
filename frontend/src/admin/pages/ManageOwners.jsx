import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import UserTable from "../components/UserTable";
import API from "../../utils/api";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

function ManageOwners() {
  const [owners, setOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const { data } = await API.get("/admin/users/owner");
        setOwners(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load owners");
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await API.delete(`/admin/users/${id}`);
        setOwners(owners.filter(o => o._id !== id));
        toast.success("Owner deleted successfully");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete owner");
      }
    }
  };

  const filteredOwners = owners.filter(o => 
    o.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50/50">
      <AdminSidebar />

      <div className="flex-1 min-h-screen">
        <AdminNavbar />

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Manage Owners</h1>
              <p className="text-gray-500 mt-1">View and manage registered equipment owner accounts.</p>
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search owners..." 
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
            <UserTable users={filteredOwners} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
export default ManageOwners;