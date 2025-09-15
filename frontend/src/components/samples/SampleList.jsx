import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { toTitleCase } from "./TitleCase";

const SampleList = ({ samples, filters, setFilters }) => {

  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }

  const filteredSamples = samples.filter((s) => {
    const q = filters.query?.toLowerCase() || "";

    const matchesQuery =
      s.patient.name.toLowerCase().includes(q) || 
      s.test_type.name.toLowerCase().includes(q) || 
      s.sample_type.name.toLowerCase().includes(q) || 
      s.status.toLowerCase().includes(q) || 
      s.sample_id.toLowerCase().includes(q);

    const matchesSatus = 
      !filters.satus || s.status.toLowerCase() === filters.status.toLowerCase();
    
      return (
        matchesQuery && matchesSatus
    );
  });
  
  


  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="block text-sm font-medium text-gray-700">
          Search Sample
        </label>
        <input
          type="text"
          name="query"   // ✅ give it a name
          placeholder="Search by ID, Name, Sample-type, or Test-type..."
          value={filters.name}
          onChange={handleFilterChange}   // ✅ pass event directly
          className="mt-1 p-2 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Collected">Collected</option>
          <option value="Received">Received</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="p-2">
          <Link to={'/sample-types'}>
            <button class>
              Add Sample Type
            </button>
          </Link>
        </div>
      </div>

      <ul className="space-y-2">
        {filteredSamples.map((sample) => (
          <li
            key={sample.id}
            className="p-3 border rounded bg-white flex justify-between items-center"
          >
            <Link
              to={`/samples/${sample.id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {sample.sample_id} - {sample.test_type.name}
            </Link>
            <StatusBadge status={toTitleCase(sample.status)} />
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default SampleList;
