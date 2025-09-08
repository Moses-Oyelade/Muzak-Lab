import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  patientService from '../services/patientService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const PatientDetailsPage = () => {
  const { id } = useParams();  // extracting Patient id from URL
  const navigate = useNavigate();
  const { user } = useAuth();
 
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientService.getPatientById(id).then(data => {
      setPatient(data);
      console.log(data);
      setLoading(false);
    });
  }, [id]);

  console.log(user)

  if (loading) return <LoadingSpinner />;
  if (!patient) return <p className='p-4'>Patient not found!</p>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await patientService.deletePatient(id);
      alert('delete successfully')
      navigate("/patients");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Patient</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>ID:</strong> {patient.identifier}</p>
      <p><strong>DOB:</strong> {patient.date_of_birth}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Created:</strong> {new Date(patient.createdAt).toLocaleDateString()}</p>

      {user?.role === "admin" && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => navigate(`/patients/${id}/edit`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsPage;
