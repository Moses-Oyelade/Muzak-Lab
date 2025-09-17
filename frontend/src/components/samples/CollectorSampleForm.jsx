import React, { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function CollectorSampleForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sample_id: "",
    name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    identifier: "",
    sample_type: "",
    test_type: "",
    collection_date: new Date().toISOString().split("T")[0]
  });
  const [testTypes, setTestTypes] = useState([]);
  const [sampleTypes, setSampleTypes] =useState([]);

  const formatDateForBackend =(date) => 
    new Date(date).toISOString().split('T')[0];


  useEffect(() => {
    axiosClient.get("/test-types/")
      .then(res => setTestTypes(res.data.results || res.data || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  axiosClient.get('/sample-types')
    .then(res => setSampleTypes(res.data.results))
    .catch(err => console.error(err));
  }, []);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log('change form: ', form)
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Check if patient exists
      const patientRes = await axiosClient.get(`/patients?identifier=${form.identifier}`);
      let patientId;
      const results = patientRes.data.results || patientRes.data;

      if (Array.isArray(results) && results.length > 0) {
        if (window.confirm(
          `User with this ID: ${form.identifier} already exists, 
          Kindly input the correct ID or proceed 
          with the existing User`
        ))
        patientId = results[0].id; // existing

      } else {
        // Create patient
        const newPatient = await axiosClient.post("/patients/", {
          name: form.name,
          date_of_birth: formatDateForBackend(form.date_of_birth),
          gender: form.gender,
          phone: form.phone,
          email: form.email,
          identifier: form.identifier
        });
        patientId = newPatient.data.id;
      }

      // Create sample
      await axiosClient.post("/samples/", {
        sample_id: form.sample_id,
        patient_id: patientId,
        sample_type_id: form.sample_type,
        test_type_id: form.test_type,
        collection_date: formatDateForBackend(form.collection_date),
        // status: "collected"
      });
      
      console.log("sample form:" ,form)
      alert(`Sample ${form.sample_id} request created successfully!`);
      navigate('/samples')
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        alert(`Error: ${JSON.stringify(err.response.data)}`);
      } else {
        console.error(err);
        alert("Unexpected error creating sample request");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-200 shadow-lg rounded-2xl p-6 mt-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🧪 New Sample Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sample Info */}
        <div>
          <label className="block font-medium text-gray-700">Sample ID</label>
          <input
            name="sample_id"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="e.g. SMP-00234"
            value={form.sample_id}
            onChange={handleChange}
            required
          />
        </div>

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

        {/* Sample/Test Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Sample Type</label>
            <select
              name="sample_type"
              value={form.sample_type}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              required
            >
              <option value="">Select Sample Type</option>
              {sampleTypes.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Test Type</label>
            <select
              name="test_type"
              value={form.test_type}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
              required
            >
              <option value="">Select Test Type</option>
              {testTypes.map((tt) => (
                <option key={tt.id} value={tt.id}>
                  {tt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Collection Date</label>
          <input
            type="date"
            name="collection_date"
            className="w-full border rounded-lg p-2 mt-1"
            value={form.collection_date}
            onChange={handleChange}
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
  );
}
