import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleProtectedRoute from './routes/RoleProtected';
import ProtectedRoute from './routes/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import SamplesPage from './pages/SamplesPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import TestTypesPage from './pages/TestTypePage';
import CreateSamplePage from "./pages/CreateSamplePage";
import SampleDetailsPage from "./pages/SampleDetailsPage";
import UserDetailsPage from './pages/UserDetailsPage';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/UnauthorizedPage';


import UsersPage from './pages/UsersPage';
import Header from './components/layout/Header';
import ResultTrackerPage from './pages/ResultTrackerPage';
import DashboardLayout from './components/layout/DashboardLayout';
import EditPatientPage from './pages/EditPatientPage';
// import Nav from './components/layout/Nav';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="p-4">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<HomePage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/result-tracker" element={<ResultTrackerPage />} />
            </Route>
          </Route>

          <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>
            <Route path="/users/:id" element={<UserDetailsPage />} />
          </Route>

          <Route element={<RoleProtectedRoute allowedRoles={['admin', 'technician', 'collector']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/samples/:id" element={<SampleDetailsPage />} />
            <Route path="/test-types" element={<TestTypesPage />} />
          </Route>

          <Route element={<RoleProtectedRoute allowedRoles={['admin', 'collector']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/patients/:id" element={<PatientDetailsPage />} />
              <Route path="/patients/:id/edit" element={<EditPatientPage />} />
              <Route path="/create-sample" element={<CreateSamplePage />} />
              <Route path="/samples" element={<SamplesPage />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to='/unauthorized' replace />} />
        </Routes>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
