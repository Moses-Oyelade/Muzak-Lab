import { useEffect, useState } from "react";
import { getTestTypes } from "../services/testTypeService";
import TestTypeList from "../components/testTypes/TestTypeList";
import TestTypeForm from "../components/testTypes/TestTypeForm";

export default function TestTypesPage() {
  const [testTypes, setTestTypes] = useState([]);
  const [filters, setFilters] = useState('');

  const fetchTestTypes = () =>
    getTestTypes().then((data) => setTestTypes(data.results || []));

  useEffect(() =>{
    fetchTestTypes();
  }, [])


  return (
      <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Test Types</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TestTypeList
            samples={testTypes} 
            filters={filters} 
            setFilters={setFilters} 
            setSamples={setTestTypes}
          />
        </div>
        <div>
          <TestTypeForm onSuccess={fetchTestTypes} />
        </div>
      </div>
    </div>
  );
};
