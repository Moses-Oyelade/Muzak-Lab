import React, { useState } from 'react';
import patientService from '../../services/patientService';
import axiosClient from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function PatientForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    identifier: "",
  });

  const formatDateForBackend =(date) => 
    new Date(date).toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const patientRes = await axiosClient.get(`/patients/?identifier=${form.identifier}`);

      const results = Array.isArray(patientRes.data.results)
      ? patientRes.data.results
      : Array.isArray(patientRes.data)
      ? patientRes.data
      : [];

      if (results.length > 0) {
        alert(`Patient: ${form.name} already exists!`);
      } else {
        // Create new patient
        const newform = { 
          ...form, 
          date_of_birth: formatDateForBackend(form.date_of_birth)
        };
        patientService.createPatient(newform)
        console.log('patient form:', form)
        console.log('patient Newform:', newform)
        alert(`Patient: ${form.name} registered successfully!`);
        navigate("/patients");
      }
    } catch (err) {
      if (err.response) {
        console.error(" Backend error:", err.response.data);
        alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
        console.error("Unexpected error:", err);
        alert("Unexpected error registering patient");
      }
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-slate-200 shadow-lg rounded-2xl p-6 mt-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        💉🤦‍♂️ Register Patients
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Patient Info */}
        <div>
          <label className="block font-medium text-gray-700">Patient Name</label>
          <input
            name="name"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="w-full border rounded-lg p-2 mt-1"
              value={form.date_of_birth}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              name="phone"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="e.g. 709-999-0067"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="e.g. johndoe@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Identifier</label>
          <input
            name="identifier"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="e.g. AA-001-06-NL"
            value={form.identifier}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md mt-4"
        >
          Submit Request
        </button>
      </form>
    </div>
  )
}
