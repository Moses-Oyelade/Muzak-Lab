import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

export default function CollectorSampleForm() {
  const [form, setForm] = useState({
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

  useEffect(() => {
    axiosClient.get("/test-types/")
      .then(res => setTestTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  axiosClient.get('/sample-types')
    .then(res => setSampleTypes(res.data))
    .catch(err => console.error(err));
  }, []);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Check if patient exists
      const patientRes = await axiosClient.get(`/patients?identifier=${form.identifier}`);
      let patientId;

      if (patientRes.data.length > 0) {
        patientId = patientRes.data[0].id; // existing
      } else {
        // Create patient
        const newPatient = await axiosClient.post("/patients/", {
          name: form.name,
          date_of_birth: form.date_of_birth,
          gender: form.gender,
          phone: form.phone,
          email: form.email,
          identifier: form.identifier
        });
        patientId = newPatient.data.id;
      }

      // Create sample
      await axiosClient.post("/samples/", {
        patient_id: patientId,
        sample_type: form.sample_type,
        test_type: form.test_type,
        collection_date: form.collection_date,
        // status: "collected"
      });

      alert("Sample request created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating sample request");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Sample Request</h2>

      <input name="name" placeholder="Patient Name" value={form.name} onChange={handleChange} />
      <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="identifier" placeholder="Identifier" value={form.identifier} onChange={handleChange} required />

      <select
        name="sample_type"
        value={form.sample_type}
        onChange={handleChange}
        required
      >
        <option value="">Select Sample Type</option>
        {sampleTypes.map(st => (
            <option key={st.id} value={st.id}>
            {st.name}
            </option>
        ))}
      </select>

      <select name="test_type" value={form.test_type} onChange={handleChange} required>
        <option value="">Select Test Type</option>
        {testTypes.map(tt => (
          <option key={tt.id} value={tt.id}>{tt.name}</option>
        ))}
      </select>

      <input type="date" name="collection_date" value={form.collection_date} onChange={handleChange} />

      <button type="submit">Submit Request</button>
    </form>
  );
}
