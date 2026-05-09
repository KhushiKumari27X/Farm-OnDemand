const StatsCard = ({ title, value, icon, colorClass = "from-green-50 to-emerald-50 text-green-600 border-green-100" }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border p-6 flex items-center gap-6 hover:shadow-md transition-all ${colorClass.split(" ")[colorClass.split(" ").length-1]}`}>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClass.split(" ").slice(0, 3).join(" ")} flex items-center justify-center text-2xl shadow-sm`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;