import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getPatientById, updatePatient } from "../services/patientService";
import patientServices from "../services/patientService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import UnauthorizedPage from "./UnauthorizedPage";

const EditPatientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientServices.getPatientById(id).then((data) => {
      setPatient(data);
      setFormData({ name: data.name, email: data.email });
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!patient) return <p className="p-4">Patient not found</p>;
  if (user?.role !== "admin") return <UnauthorizedPage />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await patientServices.updatePatient(id, formData);
    navigate(`/patients/${id}`); // redirect back to patient details
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPatientPage