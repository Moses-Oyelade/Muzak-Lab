import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import patientService from '../services/patientService';
import LoadingSpinner from '../components/LoadingSpinner';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientService.getAllPatients().then(data => {
      setPatients(data);
      console.log("send patient:", data) 
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul className="space-y-2">
          {patients.map((patient) => (
            <li
              key={patient.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <span>
                <strong>{patient.name}</strong> ({patient.email})
              </span>
              <Link
                to={`/patients/${patient.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientsPage;
