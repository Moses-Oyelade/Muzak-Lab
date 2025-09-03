// src/pages/UserDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  getPatientById  from '../services/patientService';
import LoadingSpinner from '../components/LoadingSpinner';

const PatientsPage = () => {
  const { id } = useParams();  // ✅ Extract ID from URL
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatientById(id).then(setPatient);
  }, [id]);

  if (!patient) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Patient</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>ID:</strong> {patient._id}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default PatientsPage;
