import { useState, useEffect } from "react";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import API from "../../utils/api";
import { FiDollarSign, FiTrendingUp, FiCreditCard } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Earnings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await API.get("/bookings/requests");
        // Only count completed/accepted bookings for earnings
        setBookings(data.filter(req => req.status === "completed" || req.status === "accepted"));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  const totalEarnings = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  
  // Mock chart data for premium visual effect
  const chartData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: totalEarnings > 0 ? totalEarnings : 2780 },
    { name: 'May', earnings: 0 },
    { name: 'Jun', earnings: 0 },
  ];

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <OwnerNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Earnings Overview</h1>
              <p className="text-gray-500 mt-2">Track your revenue and financial performance.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-green-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <p className="text-green-50 font-medium mb-1">Total Balance</p>
                    <h3 className="text-4xl font-bold">₹{totalEarnings.toLocaleString()}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                    <FiDollarSign />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-50 relative z-10">
                  <FiTrendingUp /> <span>+12.5% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                    <FiCreditCard />
                  </div>
                  <p className="text-gray-500 font-medium">Pending Payouts</p>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 ml-14">₹0</h3>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
                    <FiTrendingUp />
                  </div>
                  <p className="text-gray-500 font-medium">Completed Rentals</p>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 ml-14">{bookings.length}</h3>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Trend</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dx={-10} tickFormatter={(val) => `₹${val}`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value) => [`₹${value}`, 'Earnings']}
                    />
                    <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                      <th className="px-6 py-4 font-semibold uppercase tracking-wider">Farmer</th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wider">Equipment</th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.slice(0, 5).map((booking, i) => (
                      <tr key={booking._id || i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">{booking.farmer?.name || "Farmer"}</td>
                        <td className="px-6 py-4 text-gray-600">{booking.equipment?.name || "Machine"}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-green-600 text-right">
                          +₹{booking.totalAmount || "0"}
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}