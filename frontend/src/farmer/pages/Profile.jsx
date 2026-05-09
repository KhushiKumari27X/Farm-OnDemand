// import { useState, useEffect } from "react";
// import FarmerSidebar from "../components/FarmerSidebar";
// import FarmerNavbar from "../components/FarmerNavbar";
// import { FiUser, FiMail, FiPhone, FiMapPin, FiSettings, FiShield, FiSave, FiX } from "react-icons/fi";
// import toast from "react-hot-toast";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     address: ""
//   });

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (userData) {
//       setUser(userData);
//       setFormData({
//         name: userData.name || "",
//         email: userData.email || "",
//         phoneNumber: userData.phoneNumber || "",
//         address: userData.address || ""
//       });
//     }
//   }, []);

//   const handleSave = () => {
//     setLoading(true);
//     setTimeout(() => {
//       const updatedUser = { ...user, ...formData };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       setLoading(false);
//       setIsEditing(false);
//       toast.success("Profile updated successfully!");
//     }, 800);
//   };

//   return (
//     <div className="flex bg-gray-50/50 min-h-screen">
//       <FarmerSidebar />
//       <div className="flex-1 flex flex-col h-screen overflow-hidden">
//         <FarmerNavbar />

//         <div className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-4xl mx-auto space-y-8">
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Profile</h1>
//               <p className="text-gray-500 mt-2">Manage your personal information and account settings.</p>
//             </div>

//             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//               {/* Header Cover */}
//               <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-400 relative">
//                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
//               </div>

//               <div className="px-8 pb-8 relative">
//                 {/* Profile Avatar */}
//                 <div className="absolute -top-16 border-4 border-white rounded-full bg-white shadow-md">
//                   <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center text-green-600 text-5xl">
//                     <FiUser />
//                   </div>
//                 </div>

//                 <div className="flex justify-end pt-4">
//                   {isEditing ? (
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => setIsEditing(false)}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
//                       >
//                         <FiX /> Cancel
//                       </button>
//                       <button 
//                         onClick={handleSave}
//                         disabled={loading}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-green-200 disabled:opacity-70"
//                       >
//                         {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <FiSave />}
//                         Save Changes
//                       </button>
//                     </div>
//                   ) : (
//                     <button 
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors border border-gray-200 shadow-sm"
//                     >
//                       <FiSettings /> Edit Profile
//                     </button>
//                   )}
//                 </div>

//                 <div className="mt-8">
//                   <div className="flex items-center gap-3 mb-1">
//                     {isEditing ? (
//                       <input 
//                         type="text" 
//                         value={formData.name}
//                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                         className="text-2xl font-bold text-gray-800 border-b border-gray-300 outline-none focus:border-green-500 pb-1"
//                       />
//                     ) : (
//                       <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'Farmer Name'}</h2>
//                     )}
//                     <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
//                       <FiShield size={12} /> Verified
//                     </span>
//                   </div>
//                   <p className="text-gray-500 font-medium">Joined April 2026</p>
//                 </div>

//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-6">
//                     <div>
//                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Contact Information</label>
//                       <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
//                         <div className="flex items-center gap-4 text-gray-700">
//                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
//                             <FiMail />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-xs text-gray-400 font-medium">Email Address</p>
//                             {isEditing ? (
//                               <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded px-2 py-1 outline-none focus:border-green-500 mt-1" />
//                             ) : (
//                               <p className="font-semibold">{user?.email || 'Not provided'}</p>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-4 text-gray-700">
//                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
//                             <FiPhone />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-xs text-gray-400 font-medium">Phone Number</p>
//                             {isEditing ? (
//                               <input type="text" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} className="w-full bg-white border border-gray-200 rounded px-2 py-1 outline-none focus:border-green-500 mt-1" />
//                             ) : (
//                               <p className="font-semibold">{user?.phoneNumber || '+91 98765 43210'}</p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-4 text-gray-700">
//                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
//                             <FiMapPin />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-xs text-gray-400 font-medium">Location</p>
//                             {isEditing ? (
//                               <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-white border border-gray-200 rounded px-2 py-1 outline-none focus:border-green-500 mt-1" />
//                             ) : (
//                               <p className="font-semibold">{user?.address || 'Punjab, India'}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Account Security</label>
//                       <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-semibold text-gray-700">Password</p>
//                             <p className="text-xs text-gray-500">Last changed 2 months ago</p>
//                           </div>
//                           <button className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
//                             Update
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { useState, useEffect } from "react";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSettings, FiShield, FiSave, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || ""
      });
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }, 800);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <FarmerSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <FarmerNavbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col px-4 md:px-6 py-4">

          <div className="max-w-4xl mx-auto w-full space-y-6">

            {/* Header */}
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                My Profile
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your personal information and account settings.
              </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

              {/* Header Cover */}
              <div className="h-28 bg-gradient-to-r from-green-600 to-emerald-400 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              </div>

              <div className="px-6 pb-6 relative">

                {/* Avatar */}
                <div className="absolute -top-14 border-4 border-white rounded-full bg-white shadow-md">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center text-green-600 text-4xl">
                    <FiUser />
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end pt-3">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                      >
                        <FiX /> Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium disabled:opacity-70"
                      >
                        {loading ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <FiSave />
                        )}
                        Save
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
                    >
                      <FiSettings /> Edit
                    </button>
                  )}
                </div>

                {/* Name */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-1">
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="text-xl font-bold text-gray-800 border-b border-gray-300 outline-none focus:border-green-500"
                      />
                    ) : (
                      <h2 className="text-xl font-bold text-gray-800">
                        {user?.name || "Farmer Name"}
                      </h2>
                    )}
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      <FiShield size={12} /> Verified
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Joined April 2026</p>
                </div>

                {/* Info Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Contact */}
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">
                      Contact Information
                    </label>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">

                      {/* Email */}
                      <div className="flex items-center gap-3">
                        <FiMail className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Email</p>
                          {isEditing ? (
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full border rounded px-2 py-1 text-sm"
                            />
                          ) : (
                            <p className="font-medium">{user?.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3">
                        <FiPhone className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Phone</p>
                          {isEditing ? (
                            <input
                              value={formData.phoneNumber}
                              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                              className="w-full border rounded px-2 py-1 text-sm"
                            />
                          ) : (
                            <p className="font-medium">{user?.phoneNumber}</p>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Location</p>
                          {isEditing ? (
                            <input
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              className="w-full border rounded px-2 py-1 text-sm"
                            />
                          ) : (
                            <p className="font-medium">{user?.address}</p>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Security */}
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">
                      Account Security
                    </label>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-700">Password</p>
                        <p className="text-xs text-gray-500">Last changed 2 months ago</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white border rounded text-sm">
                        Update
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;