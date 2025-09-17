import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import patientService from '../services/patientService';
import LoadingSpinner from '../components/LoadingSpinner';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const  params = new URLSearchParams();
    if (genderFilter) params.append("gender__icontains", genderFilter);
    if (searchQuery) params.append("name__icontains", searchQuery);
    params.append("page", currentPage);


    patientService.getAllPatients(params).then(data => {
      setPatients(data.results);
      setTotalPages(Math.ceil(data.count / limit));
      console.log("send patient:", data.result) 
      setLoading(false);
    });
  }, [genderFilter, searchQuery, currentPage]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="bg-slate-200 px-8 py-4 rounded-lg shadow-md flex justify-between items-end gap-4">
        {/* Gender Filter */}
        <div className='flex flex-wrap gap-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="mt-1 mr-2 p-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option value="">All</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

            {/* Patient Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search Patient
            </label>
            <input
              type="text"
              placeholder="Enter patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1 p-1 block w-56 rounded-md  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Patient registration */}
        <div>
          <Link to={'/create-patient'} >
            <button className='block bg-blue-600 text-white rounded p-2 hover:bg-blue-700'> Register Patient</button>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold p-4">Patients</h2>
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <ul className="space-y-1">
            {patients.map((patient) => (
              <li
                key={patient.id}
                className="flex justify-between items-center border bg-white p-2 rounded"
              >
                <span>
                  <strong>{patient.name}</strong> - {patient.identifier}
                </span>
                <Link
                  to={`/patients/${patient.id}`}
                  className="text-blue-700 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientsPage;
