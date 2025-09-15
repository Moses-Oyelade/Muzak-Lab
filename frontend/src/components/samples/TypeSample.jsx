// import { Link } from "react-router-dom";
// import StatusBadge from "./StatusBadge";
import React from "react";

const TypeSample = ({ samples, filters, setFilters }) => {
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredSamples = samples.filter((s) =>
    filters.name ? s.name.toLowerCase().includes(filters.name.toLowerCase()) : true
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="block text-sm font-medium text-gray-700">
          Search Test Type
        </label>
        <input
          type="text"
          name="name"   // ✅ give it a name
          placeholder="Enter Test type..."
          value={filters.name}
          onChange={handleFilterChange}   // ✅ pass event directly
          className="mt-1 p-2 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
      </div>

      <ul className="space-y-2">
        {filteredSamples.map((sample) => (
          <li
            key={sample.id}
            className="p-3 border rounded bg-white flex justify-between items-center"
          >
            {sample.id} - {sample.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeSample;
