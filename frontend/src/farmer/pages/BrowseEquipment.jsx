// import { useState, useEffect } from "react";
// import FarmerSidebar from "../components/FarmerSidebar";
// import FarmerNavbar from "../components/FarmerNavbar";
// import EquipmentCard from "../components/EquipmentCard";
// import SearchBar from "../components/SearchBar";
// import FilterBar from "../components/FilterBar";
// import API from "../../utils/api";

// const BrowseEquipment = () => {
//   const [equipmentData, setEquipmentData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");

//   useEffect(() => {
//     const fetchEquipment = async () => {
//       try {
//         const { data } = await API.get("/equipment");
//         setEquipmentData(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load equipment");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEquipment();
//   }, []);

//   const availableLocations = [...new Set(equipmentData.map((item) => item.location).filter(Boolean))];

//   const filteredEquipment = equipmentData.filter((item) => {
//     const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           item.description?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = typeFilter === "" || item.category === typeFilter;
//     const matchesLocation = locationFilter === "" || item.location === locationFilter;
//     return matchesSearch && matchesType && matchesLocation;
//   });

//   return (
//     <div className="flex bg-gray-50/50">
//       <FarmerSidebar />

//       <div className="flex-1 min-h-screen">
//         <FarmerNavbar />

//         <div className="p-8">
//           {/* Header Section */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Browse Equipment</h1>
//             <p className="text-gray-500 mt-2">Find and rent the best agricultural machinery for your needs.</p>
//           </div>

//           {/* Search & Filter Controls */}
//           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
//             <div className="flex-1">
//               <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//             </div>
//             <div className="md:w-1/2 lg:w-1/3">
//               <FilterBar 
//                 typeFilter={typeFilter} 
//                 setTypeFilter={setTypeFilter} 
//                 locationFilter={locationFilter} 
//                 setLocationFilter={setLocationFilter} 
//                 availableLocations={availableLocations}
//               />
//             </div>
//           </div>

//           {/* Content Area */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
//               {error}
//             </div>
//           ) : (
//             <>
//               {/* Grid Layout */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {filteredEquipment.map((item) => (
//                   <EquipmentCard key={item._id || item.id} data={item} />
//                 ))}
//               </div>

//               {/* Empty State */}
//               {filteredEquipment.length === 0 && (
//                 <div className="text-center py-20">
//                   <p className="text-gray-500 text-lg">No equipment found matching your criteria.</p>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowseEquipment;
import { useState, useEffect } from "react";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import EquipmentCard from "../components/EquipmentCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import API from "../../utils/api";

const BrowseEquipment = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data } = await API.get("/equipment");
        setEquipmentData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const availableLocations = [
    ...new Set(
      equipmentData.map((item) => item.location).filter(Boolean)
    ),
  ];

  const filteredEquipment = equipmentData.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "" || item.category === typeFilter;
    const matchesLocation =
      locationFilter === "" || item.location === locationFilter;

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <FarmerSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <FarmerNavbar />

        {/* MAIN CONTENT */}
        <div className="px-6 md:px-10 py-4 flex-1 flex flex-col">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Browse Equipment
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Find and rent the best agricultural machinery for your needs.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-3 flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="md:w-1/2 lg:w-1/3">
              <FilterBar
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                availableLocations={availableLocations}
              />
            </div>
          </div>

          {/* CONTENT AREA (FIXED HEIGHT BEHAVIOR) */}
          <div className="flex-1 flex flex-col">

            {loading ? (
              <div className="flex flex-1 justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-green-600"></div>
              </div>
            ) : error ? (
              <div className="flex flex-1 justify-center items-center">
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
                  {error}
                </div>
              </div>
            ) : (
              <>
                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
                  {filteredEquipment.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <EquipmentCard data={item} />
                    </div>
                  ))}
                </div>

                {/* EMPTY STATE */}
                {filteredEquipment.length === 0 && (
                  <div className="flex flex-1 flex-col justify-center items-center">
                    <p className="text-gray-500 text-lg font-medium">
                      No equipment found
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your filters or search keywords.
                    </p>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseEquipment;