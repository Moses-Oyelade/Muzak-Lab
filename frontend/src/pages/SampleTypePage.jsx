import { useEffect, useState } from "react";
import { getSampleTypes, } from "../services/sampleService";
import SampleForm from "../components/samples/SampleForm";
import TypeSample from "../components/samples/TypeSample";


const SampleTypePage = () => {
  const [sampleTypes, setSampleTypes] = useState([]);
  const [filters, setFilters] = useState({ status: "" });

  const fetchSampleTypes = () =>
    getSampleTypes().then((data) => setSampleTypes(data.results || []));

  useEffect(() => {
    fetchSampleTypes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Samples</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TypeSample samples={sampleTypes} filters={filters} setFilters={setFilters} />
        </div>
        <div>
          <SampleForm onSuccess={fetchSampleTypes} />
        </div>
      </div>
    </div>
  );
};

export default SampleTypePage;
