// import React, { useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import AdminNavbar from "../components/AdminNavbar";
// import { FiSave, FiLock, FiBell, FiSettings, FiUser } from "react-icons/fi";
// import toast from "react-hot-toast";

// function Settings() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(false);

//   const handleSave = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       toast.success("Settings saved successfully!");
//     }, 800);
//   };

//   return (
//     <div className="flex bg-gray-50/50">
//       <AdminSidebar />

//       <div className="flex-1 min-h-screen">
//         <AdminNavbar />

//         <div className="p-8 max-w-5xl mx-auto space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Platform Settings</h1>
//             <p className="text-gray-500 mt-1">Manage your account and platform-wide configurations.</p>
//           </div>

//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
//             {/* Sidebar Tabs */}
//             <div className="w-full md:w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col gap-2">
//               <button 
//                 onClick={() => setActiveTab("profile")}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'profile' ? 'bg-white text-green-700 shadow-sm border border-gray-200/60' : 'text-gray-600 hover:bg-white/60'}`}
//               >
//                 <FiUser /> Profile Settings
//               </button>
//               <button 
//                 onClick={() => setActiveTab("security")}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'security' ? 'bg-white text-green-700 shadow-sm border border-gray-200/60' : 'text-gray-600 hover:bg-white/60'}`}
//               >
//                 <FiLock /> Security
//               </button>
//               <button 
//                 onClick={() => setActiveTab("notifications")}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'notifications' ? 'bg-white text-green-700 shadow-sm border border-gray-200/60' : 'text-gray-600 hover:bg-white/60'}`}
//               >
//                 <FiBell /> Notifications
//               </button>
//               <button 
//                 onClick={() => setActiveTab("platform")}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'platform' ? 'bg-white text-green-700 shadow-sm border border-gray-200/60' : 'text-gray-600 hover:bg-white/60'}`}
//               >
//                 <FiSettings /> Platform
//               </button>
//             </div>

//             {/* Content Area */}
//             <div className="flex-1 p-8 md:p-12">
//               <form onSubmit={handleSave} className="max-w-2xl h-full flex flex-col">
                
//                 {activeTab === "profile" && (
//                   <div className="space-y-6 flex-1">
//                     <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Profile Settings</h2>
                    
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
//                         <input type="text" defaultValue="Administrator" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                         <input type="email" defaultValue="admin@farmondemand.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / Notes</label>
//                       <textarea rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all"></textarea>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "security" && (
//                   <div className="space-y-6 flex-1">
//                     <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Security Settings</h2>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
//                       <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
//                       <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
//                       <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "notifications" && (
//                   <div className="space-y-6 flex-1">
//                     <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Notification Preferences</h2>
                    
//                     <div className="space-y-4">
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
//                         <span className="text-gray-700 font-medium">Email alerts for new bookings</span>
//                       </label>
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
//                         <span className="text-gray-700 font-medium">Email alerts for new user registrations</span>
//                       </label>
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
//                         <span className="text-gray-700 font-medium">Weekly summary reports</span>
//                       </label>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "platform" && (
//                   <div className="space-y-6 flex-1">
//                     <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Platform Configuration</h2>
                    
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Commission (%)</label>
//                         <input type="number" defaultValue="5" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">Currency Symbol</label>
//                         <input type="text" defaultValue="₹" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all" />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Maintenance Mode</label>
//                       <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-all">
//                         <option value="off">Off - Platform is live</option>
//                         <option value="on">On - Disable public access</option>
//                       </select>
//                     </div>
//                   </div>
//                 )}

//                 <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
//                   <button 
//                     type="submit"
//                     disabled={loading}
//                     className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-70 flex items-center gap-2"
//                   >
//                     {loading ? (
//                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                     ) : (
//                       <><FiSave /> Save Changes</>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;
import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { FiSave, FiLock, FiBell, FiSettings, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully!");
    }, 800);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <AdminNavbar />

        {/* MAIN CONTENT */}
        <div className="flex-1 px-6 md:px-8 py-4 flex flex-col">

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Platform Settings
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your account and platform-wide configurations.
            </p>
          </div>

          {/* CARD */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex overflow-hidden">

            {/* LEFT TABS */}
            <div className="w-64 border-r border-gray-100 p-4 space-y-2 bg-gray-50/60">

              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition ${
                  activeTab === 'profile'
                    ? 'bg-white text-green-700 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                <FiUser /> Profile Settings
              </button>

              <button 
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition ${
                  activeTab === 'security'
                    ? 'bg-white text-green-700 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                <FiLock /> Security
              </button>

              <button 
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition ${
                  activeTab === 'notifications'
                    ? 'bg-white text-green-700 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                <FiBell /> Notifications
              </button>

              <button 
                onClick={() => setActiveTab("platform")}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition ${
                  activeTab === 'platform'
                    ? 'bg-white text-green-700 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                <FiSettings /> Platform
              </button>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 flex flex-col p-6">

              <form onSubmit={handleSave} className="flex flex-col flex-1">

                {/* CONTENT AREA */}
                <div className="flex-1 space-y-5">

                  {activeTab === "profile" && (
                    <>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Profile Settings
                      </h2>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Administrator"
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue="admin@farmondemand.com"
                            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Bio / Notes
                        </label>
                        <textarea
                          rows="3"
                          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === "security" && (
                    <>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Security Settings
                      </h2>

                      <input type="password" placeholder="Current Password" className="w-full border rounded-lg px-3 py-2.5" />
                      <input type="password" placeholder="New Password" className="w-full border rounded-lg px-3 py-2.5" />
                      <input type="password" placeholder="Confirm Password" className="w-full border rounded-lg px-3 py-2.5" />
                    </>
                  )}

                  {activeTab === "notifications" && (
                    <>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Notification Preferences
                      </h2>

                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked />
                        Email alerts for bookings
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked />
                        User registration alerts
                      </label>
                    </>
                  )}

                  {activeTab === "platform" && (
                    <>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Platform Configuration
                      </h2>

                      <div className="grid md:grid-cols-2 gap-5">
                        <input type="number" defaultValue="5" className="border rounded-lg px-3 py-2.5" />
                        <input type="text" defaultValue="₹" className="border rounded-lg px-3 py-2.5" />
                      </div>

                      <select className="border rounded-lg px-3 py-2.5">
                        <option>Platform Live</option>
                        <option>Maintenance Mode</option>
                      </select>
                    </>
                  )}

                </div>

                {/* BUTTON FIXED */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm flex items-center gap-2"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <><FiSave /> Save Changes</>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;