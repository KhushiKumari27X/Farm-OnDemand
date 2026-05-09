const FilterBar = ({ typeFilter, setTypeFilter, locationFilter, setLocationFilter, availableLocations }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full h-full">
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-700 min-w-0"
      >
        <option value="">All Categories</option>
        <option value="Tractor">Tractor</option>
        <option value="Harvester">Harvester</option>
        <option value="Seeder">Seeder</option>
        <option value="Plow">Plow</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-700 min-w-0 truncate"
      >
        <option value="">All Locations</option>
        {availableLocations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;