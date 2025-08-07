import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SamplesPage from './pages/SamplesPage';
import PatientsPage from './pages/PatientsPage';
import TestTypesPage from './pages/TestTypesPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/samples" element={<SamplesPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/test-types" element={<TestTypesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
