import { useCallback, useEffect, useState } from "react";
import { getAllSamples } from "../services/sampleService";
import SampleList from "../components/samples/SampleList";
import LoadingSpinner from '../components/LoadingSpinner';

const SamplesPage = () => {
  const [samples, setSamples] = useState([]);
  const [filters, setFilters] = useState({ status: "" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;


  const fetchSamples = useCallback(() => {      // Wrap with useCallback() to avoid infinit loop
    const params = new URLSearchParams();
    params.append('page', currentPage);


    getAllSamples(params).then((data) => {
      setSamples(data.results || []);
      setTotalPages(Math.ceil(data.count / limit));
      setLoading(false)
    })
  }, [currentPage]);

  useEffect(() => {
    fetchSamples();
  }, [fetchSamples]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Samples</h2>
      <div>
        <div className="md:col-span-2">
          <SampleList samples={samples} filters={filters} setFilters={setFilters} />
        </div>
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

export default SamplesPage;
