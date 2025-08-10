import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

const HomePage = () => {
  const [completedSamples, setCompletedSamples] = useState([]);
  const [statusFilter, setStatusFilter] = useState('completed'); // default filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Build query params
    const params = new URLSearchParams();
    if (statusFilter) params.append('status__icontains', statusFilter);
    if (startDate) params.append('updated_at__gte', startDate); // updated_at >= startDate
    if (endDate) params.append('updated_at__lte', endDate); // updated_at <= endDate

    axiosClient.get(`/samples?${params.toString()}`)
      .then(res => setCompletedSamples(res.data))
      .catch(err => console.error(err));
  }, [statusFilter, startDate, endDate]);

  return (
    <div>
      <h1>Welcome to Lab Tracker</h1>

      <div>
        <label>Status: </label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="collected">Collected</option>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Start Updated Date: </label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>

      <div>
        <label>End Updated Date: </label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      <h2>Samples</h2>
      <ul>
        {completedSamples.map(sample => (
          <li key={sample.id}>
            {sample.patient.name} - {sample.test_type.name} ({sample.status}) - Updated: {new Date(sample.updated_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
