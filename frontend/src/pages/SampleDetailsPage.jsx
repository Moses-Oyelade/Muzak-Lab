import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSampleById } from "../services/sampleService";
import StatusBadge from "../components/samples/StatusBadge";
import { toTitleCase } from "../components/samples/TitleCase";

const SampleDetailsPage = () => {
  const { id } = useParams();
  const [sample, setSample] = useState(null);
  

  useEffect(() => {
    getSampleById(id).then(setSample);
  }, [id]);

  if (!sample) return <p>Loading...</p>;

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

      <Link
        to={`/samples/${id}/edit`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit Sample
      </Link>
    </div>
  );
};

export default SampleDetailsPage;
