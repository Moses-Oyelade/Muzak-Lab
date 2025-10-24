import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { toTitleCase } from "../components/samples/TitleCase";
import StatusBadge from "../components/samples/StatusBadge";

export default function ResultTrackerPage() {
  const [samples, setSamples] = useState([]);
  const [statusFilter, setStatusFilter] = useState("completed");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter) params.append("status__icontains", statusFilter);
    if (startDate) params.append("updated_at__gte", startDate);
    if (endDate) params.append("updated_at__lte", endDate);
    if (searchQuery) params.append("patient__name__icontains", searchQuery);
    params.append("page", currentPage);

    axiosClient
      .get(`/samples?${params.toString()}`)
      .then((res) => {
        setSamples(res.data.results);
        setTotalPages(Math.ceil(res.data.count / limit));
      })
      .catch((err) => console.error(err));
  }, [statusFilter, startDate, endDate, searchQuery, currentPage]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-slate-200 p-4 rounded-lg shadow-md flex flex-wrap justify-between items-center gap-4">
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
            className="mt-1 px-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-1 px-2 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option value="">All</option>
            <option value="collected">Collected</option>
            <option value="received">Received</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="flex gap-4 mx-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 px-2 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 px-2 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Samples</h2>

        {samples.length === 0 ? (
          <p className="text-gray-500">No samples found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {samples.map((sample) => (
              <li
                key={sample.id}
                className="bg-slate-200 p-4 rounded-lg shadow-md border border-gray-200"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {sample.patient?.name || "Unknown Patient"}
                </p>
                <p className="text-sm text-gray-600">
                  Test: {sample.test_type?.name || "N/A"}
                </p>
                
                <StatusBadge status={toTitleCase(sample.status)} />
                <p className="text-xs text-gray-500 mt-2">
                  Updated:{" "}
                  {new Date(sample.updated_at).toLocaleDateString("en-US")}
                </p>
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
}
