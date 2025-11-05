import React from "react";
import { deleteTestType } from "../../services/testTypeService";
import { useAuth } from "../../context/AuthContext";

const TestTypeList = ({ samples, filters, setFilters, setSamples }) => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredSamples = samples.filter((s) =>
    filters.name ? s.name.toLowerCase().includes(filters.name.toLowerCase()) : true
  );

  const handleDelete = async (sampleId, samples_name) => {
        if (window.confirm(`Are you sure you want to delete ${samples_name}?`)) {
          await deleteTestType(sampleId);
          setSamples((prev) => prev.filter((s) => s.id !== sampleId));
        }
      };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="block text-sm font-medium text-gray-700">
          Search Test Type
        </label>
        <input
          type="text"
          name="name"   // ✅ give it a name
          placeholder="Enter test type..."
          value={filters.name}
          onChange={handleFilterChange}   // ✅ pass event directly
          className="mt-1 p-2 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
      </div>

      <ul className="space-y-1">
        {filteredSamples.map((sample) => (
          <li
            key={sample.id}
            className="p-2 border rounded bg-white flex justify-between items-center"
          >
            {sample.name}
            {(role === "admin"|| "technician") && (
              <button
                type="button"
                onClick={() => handleDelete(sample.id, sample.name)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestTypeList;
