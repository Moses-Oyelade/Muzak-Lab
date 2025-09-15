import { useState } from "react";
import { createSampleType } from "../../services/sampleService";

const SampleForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSampleType(formData);
    setFormData({ name: ""});
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">Add Sample Type</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Sample Type Name"
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
};

export default SampleForm;
