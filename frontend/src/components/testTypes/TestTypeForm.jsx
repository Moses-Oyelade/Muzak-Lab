import { useState } from "react";
import { createTestType } from "../../services/testTypeService";
import { Link } from "react-router-dom";

const TestTypeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTestType(formData);
    setFormData({ name: "", description: "" });
    if (onSuccess) onSuccess();
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">Add Test Type</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Test Type Name"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <div className="flex justify-between px-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <Link
          // type="button"
          to={'/samples/'}
          className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </Link>
        
      </div>
      
    </form>
  );
};

export default TestTypeForm;
