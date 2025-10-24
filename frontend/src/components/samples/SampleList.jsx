import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { toTitleCase } from "./TitleCase";
import { useAuth } from "../../context/AuthContext";

const SampleList = ({ samples, filters, setFilters }) => {
  const { user } = useAuth();
  const role = user.role;
  
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
      !filters.status || s.status.toLowerCase() === filters.status.toLowerCase();
    
      return (
        matchesQuery && matchesSatus
    );
  });
  
  


  return (
    <div>
      <div className="p-4 flex justify-between">
        <div className="flex flex-wrap gap-2">
          <label className="block p-1 text-base font-medium text-gray-700">
            Search Sample
          </label>
          <input
            type="text"
            name="query"   // ✅ give it a name
            placeholder="Search by ID, Name, Sample-type, or Test-type..."
            value={filters.query || ""}
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
        </div>
        <div>
          <Link to={'/sample-types'}>
            <button className="border rounded-md text-white p-2 bg-blue-500 hover:bg-blue-700">
              Add Sample Type
            </button>
          </Link>
        </div>
      </div>

      <ul className="space-y-1">
        {filteredSamples.map((sample) => (
          <li
            key={sample.id}
            className="px-4 py-2 border rounded bg-white flex justify-between items-center"
          >
            { role === ('admin' && 'technician') ? 
              <Link
                to={`/samples/${sample.id}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {sample.sample_id} - {sample.sample_type.name} ({sample.test_type.name})
              </Link>
                :
              <span className="font-medium text-blue-600 ">
                {sample.sample_id} - {sample.sample_type.name} ({sample.test_type.name})
              </span>
            }
            <StatusBadge status={toTitleCase(sample.status)} />
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default SampleList;
