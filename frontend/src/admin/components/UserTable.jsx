import React from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiUser } from "react-icons/fi";

function UserTable({ users = [], onDelete }) {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <FiUser size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">No Users Found</h3>
        <p className="text-gray-500">There are currently no users in this category.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* HEADER */}
          <thead className="bg-gray-50/50 text-gray-500 uppercase tracking-wider font-semibold text-xs border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user._id}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-800">{user.email}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{user.phoneNumber || "No phone"}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize font-medium text-gray-700">{user.role}</span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      user.status !== "inactive"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status !== "inactive" ? "bg-green-500" : "bg-red-500"}`}></span>
                    {user.status !== "inactive" ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" title="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete && onDelete(user._id)}
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
      
      {/* Footer / Pagination Placeholder */}
      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between text-sm text-gray-500 bg-gray-50/30">
        <span>Showing {users.length} users</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
export default UserTable;