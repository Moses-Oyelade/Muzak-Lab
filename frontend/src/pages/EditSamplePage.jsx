import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSampleById, updateSample, deleteSample } from "../services/sampleService";

const EditSamplePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sample, setSample] = useState(null);

  useEffect(() => {
    getSampleById(id).then(setSample);
  }, [id]);

  const handleChange = (e) =>
    setSample({ ...sample, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSample(id, sample);
    navigate(`/samples/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this sample?")) {
      await deleteSample(id);
      navigate("/samples");
    }
  };

  if (!sample) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Sample</h2>
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="sample_id"
          value={sample.sample_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          readOnly
        />
        <select
          name="status"
          value={sample.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="collected">Collected</option>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSamplePage;
