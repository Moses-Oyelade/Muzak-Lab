import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSampleById } from "../services/sampleService";
import StatusBadge from "../components/samples/StatusBadge";
import { toTitleCase } from "../components/samples/TitleCase";
import LoadingSpinner from "../components/LoadingSpinner";

const SampleDetailsPage = () => {
  const { id } = useParams();
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    getSampleById(id).then(setSample);
    setLoading(false);
  }, [id]);

  if (!sample) return <p>Sample not found</p>;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sample Details</h2>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>ID:</strong> {sample.sample_id}</p>
        <p><strong>Patient:</strong> {sample.patient?.name}</p>
        <p><strong>Sample Type:</strong> {sample.sample_type?.name}</p>
        <p><strong>Test Type:</strong> {sample.test_type?.name}</p>
        <p><strong>Status:</strong> <StatusBadge status={toTitleCase(sample.status)} /></p>
        <p><strong>Collected By:</strong> {sample.collected_by?.username || "N/A"} - {`(${sample.collected_by?.role })`|| "(N/A)"}</p>
        <p><strong>Updated By:</strong> {sample.updated_by?.username || "N/A"}</p>
      </div>

      <div className="flex justify-between px-2">
        <Link
          to={`/samples/${id}/edit`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Sample
        </Link>
        <Link
          to={`/samples/`}
          className="mt-4 inline-block bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default SampleDetailsPage;
