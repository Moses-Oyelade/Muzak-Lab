import { useEffect, useState } from 'react';
import { getSamples } from '../services/sampleService';

const SamplesPage = () => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    getSamples().then(res => setSamples(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Samples</h2>
      <ul className="space-y-2">
        {samples.map(sample => (
          <li key={sample.id} className="p-2 border rounded">
            {sample.sample_id} - {sample.test_type.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SamplesPage;
