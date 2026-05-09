// import { useState, useEffect } from "react";
// import OwnerSidebar from "../components/OwnerSidebar";
// import OwnerNavbar from "../components/OwnerNavbar";
// import EquipmentCard from "../components/EquipmentCard";
// import API from "../../utils/api";
// import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import toast from "react-hot-toast";

// export default function ManageEquipment() {
//   const [equipment, setEquipment] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchMyEquipment = async () => {
//       try {
//         // Fetch all and filter by owner for now, or use a specific owner endpoint if it existed
//         const { data } = await API.get("/equipment");
//         const myEquipment = data.filter(item => item.owner?._id === user?._id || item.owner === user?._id);
//         setEquipment(myEquipment);
//       } catch (err) {
//         setError("Failed to load your equipment.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyEquipment();
//   }, [user?._id]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this equipment?")) {
//       try {
//         await API.delete(`/equipment/${id}`);
//         setEquipment(equipment.filter(item => item._id !== id));
//         toast.success("Equipment deleted successfully!");
//       } catch (err) {
//         toast.error("Failed to delete equipment.");
//       }
//     }
//   };

//   return (
//     <div className="flex bg-gray-50/50 min-h-screen">
//       <OwnerSidebar />
//       <div className="flex-1">
//         <OwnerNavbar />

//         <div className="p-8 max-w-7xl mx-auto space-y-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Manage Equipment</h1>
//               <p className="text-gray-500 mt-1">View, edit, and manage the machinery you've listed.</p>
//             </div>
//             <Link 
//               to="/owner/add" 
//               className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-green-200"
//             >
//               <FiPlus /> Add New
//             </Link>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
//               {error}
//             </div>
//           ) : equipment.length === 0 ? (
//             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
//               <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-2xl">
//                 🚜
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">No Equipment Listed</h3>
//               <p className="text-gray-500 mb-6">You haven't listed any machinery for rent yet.</p>
//               <Link 
//                 to="/owner/add" 
//                 className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-colors inline-block"
//               >
//                 List Your First Equipment
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {equipment.map((item) => (
//                 <EquipmentCard 
//                   key={item._id} 
//                   item={item} 
//                   onDelete={() => handleDelete(item._id)} 
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import EquipmentCard from "../components/EquipmentCard";
import API from "../../utils/api";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ManageEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyEquipment = async () => {
      try {
        const { data } = await API.get("/equipment");
        const myEquipment = data.filter(
          (item) =>
            item.owner?._id === user?._id ||
            item.owner === user?._id
        );
        setEquipment(myEquipment);
      } catch (err) {
        setError("Failed to load your equipment.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEquipment();
  }, [user?._id]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await API.delete(`/equipment/${id}`);
        setEquipment(equipment.filter((item) => item._id !== id));
        toast.success("Equipment deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete equipment.");
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <OwnerSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <OwnerNavbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 px-6 md:px-10 py-4 flex flex-col">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Manage Equipment
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                View, edit, and manage the machinery you've listed.
              </p>
            </div>

            <Link
              to="/owner/add"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-sm"
            >
              <FiPlus /> Add New
            </Link>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 flex flex-col">

            {loading ? (
              <div className="flex flex-1 justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-green-600"></div>
              </div>
            ) : error ? (
              <div className="flex flex-1 justify-center items-center">
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
                  {error}
                </div>
              </div>
            ) : equipment.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm max-w-md w-full">
                  <div className="text-4xl mb-3">🚜</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Equipment Listed
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    You haven't listed any machinery yet.
                  </p>

                  <Link
                    to="/owner/add"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
                  >
                    List Equipment
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
                {equipment.map((item) => (
                  <div
                    key={item._id}
                    className="transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <EquipmentCard
                      item={item}
                      onDelete={() => handleDelete(item._id)}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}