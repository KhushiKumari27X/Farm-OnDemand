function StatsCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
          <h2 className="text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center text-sm">
          <span className={`font-semibold ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
          <span className="text-gray-400 ml-2">from last month</span>
        </div>
      )}

      {/* Decorative gradient blob */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
export default StatsCard;