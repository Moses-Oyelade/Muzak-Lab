import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { toTitleCase } from "./TitleCase";
import { useAuth } from "../../context/AuthContext";

const SampleList = ({ samples, filters, setFilters }) => {
  const { user } = useAuth();
  const role = user?.role;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredSamples = samples.filter((s) => {
    const q = filters.query?.toLowerCase() || "";
    const matchesQuery =
      s.patient.name.toLowerCase().includes(q) ||
      s.test_type.name.toLowerCase().includes(q) ||
      s.sample_type.name.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q) ||
      s.sample_id.toLowerCase().includes(q);

    const matchesStatus =
      !filters.status ||
      s.status.toLowerCase() === filters.status.toLowerCase();

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="px-2 md:px-4">
      {/* 🔍 Filters */}
      <div className="p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3 bg-gray-50 rounded-md">
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          <label className="text-sm md:text-base font-medium text-gray-700">
            Search Sample
          </label>
          <input
            type="text"
            name="query"
            placeholder="Search by ID, Name, Type..."
            value={filters.query || ""}
            onChange={handleFilterChange}
            className="p-2 w-full md:w-64 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border p-2 rounded text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Collected">Collected</option>
            <option value="Received">Received</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Link to="/sample-types">
            <button className="border rounded-md text-white px-3 py-2 bg-blue-500 hover:bg-blue-700 text-sm md:text-base">
              Add Sample Type
            </button>
          </Link>
        </div>
      </div>

      {/* 📋 Sample list */}
      <ul className="mt-3 space-y-2 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {filteredSamples.map((sample) => (
          <li
            key={sample.id}
            className="px-3 py-2 border rounded bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"
          >
            {(role === "admin" || role === "technician") ? (
              <Link
                to={`/samples/${sample.id}`}
                className="font-medium text-blue-600 hover:underline text-sm md:text-base"
              >
                {sample.sample_id} - {sample.sample_type.name} ({sample.test_type.name})
              </Link>
            ) : (
              <span className="font-medium text-blue-600 text-sm md:text-base">
                {sample.sample_id} - {sample.sample_type.name} ({sample.test_type.name})
              </span>
            )}
            <StatusBadge status={toTitleCase(sample.status)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleList;
