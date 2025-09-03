import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleProtectedPage from './routes/ProtectedRoute';
import ProtectedRoute from './routes/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import SamplesPage from './pages/SamplesPage';
import PatientsPage from './pages/PatientsPage';
import TestTypesPage from './pages/TestTypePage';
import CreateSamplePage from "./pages/CreateSamplePage";
import SampleDetailsPage from "./pages/SampleDetailsPage";
import UserDetailsPage from './pages/UserDetailsPage';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/UnauthorizedPage';

import UsersList from './components/users/UsersList';
import Header from './components/layout/Header';
import ResultTrackerPage from './pages/ResultTrackerPage';
// import Nav from './components/layout/Nav';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="p-4">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/result-tracker" 
            element={
              <ProtectedRoute>
                <ResultTrackerPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route element={<RoleProtectedPage allowedRoles={['admin']} />}>
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
          </Route>

          <Route element={<RoleProtectedPage allowedRoles={['admin', 'technician']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/samples/:id" element={<SampleDetailsPage />} />
            <Route path="/test-types" element={<TestTypesPage />} />
          </Route>

          <Route element={<RoleProtectedPage allowedRoles={['admin', 'collector']} />}>
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/samples/create" element={<CreateSamplePage />} />
            <Route path="/samples" element={<SamplesPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to='/unauthorized' replace />} />
        </Routes>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
