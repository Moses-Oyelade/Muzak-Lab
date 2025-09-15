import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadges";

const SampleList = ({ samples, filters, setFilters }) => {
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredSamples = samples.filter((s) =>
    filters.status ? s.status === filters.status : true
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="collected">Collected</option>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
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
            <StatusBadge status={sample.status} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleList;
