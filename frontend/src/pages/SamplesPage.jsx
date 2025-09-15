import { useEffect, useState } from "react";
import { getAllSamples } from "../services/sampleService";
import SampleList from "../components/samples/SampleList";

const SamplesPage = () => {
  const [samples, setSamples] = useState([]);
  const [filters, setFilters] = useState({ status: "" });

  const fetchSamples = () =>
    getAllSamples().then((data) => setSamples(data.results || []));

  useEffect(() => {
    fetchSamples();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Samples</h2>
      <div>
        <div className="md:col-span-2">
          <SampleList samples={samples} filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default SamplesPage;
