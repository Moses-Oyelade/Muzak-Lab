import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSampleById, updateSample, deleteSample, } from "../services/sampleService";
import { getTestTypes } from "../services/testTypeService";
import LoadingSpinner from "../components/LoadingSpinner";


const EditSamplePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [testTypes, setTestTypes] = useState([]);
  const [formData, setFormData] = useState({
    sample_id: "",
    status: "",
    sample_type: "",
    test_type_id: "",
  });

  useEffect(() => {
    getSampleById(id).then(setFormData);
    setLoading(false);
  }, [id]);

  const fetchTestTypes = () =>
      getTestTypes().then((data) => setTestTypes(data.results || []));
  
    useEffect(() =>{
      fetchTestTypes();
    }, []);



  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSample(id, formData);
    navigate(`/samples/${id}`);
  };


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this sample?")) {
      await deleteSample(id);
      navigate("/samples");
    }
  };

  if (!formData) return <p className="p-4">Sample not found</p>;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Sample</h2>
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="sample_id"
          value={formData.sample_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          readOnly
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="collected">Collected</option>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          name="sample-type"
          value={formData.sample_type?.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          readOnly
        />
        <select
          name="test_type_id"
          value={formData.test_type_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {testTypes.map((tt) => (
            <option key={tt.id} value={tt.id}>{tt.name}</option>
          ))}
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
