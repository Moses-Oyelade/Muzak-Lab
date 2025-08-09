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

import UsersList from './components/users/UsersList';
import Header from './components/layout/Header';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Header />
      <div className="p-4">
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/samples" element={<SamplesPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/test-types" element={<TestTypesPage />} />
          <Route path="/samples/new" element={<CreateSamplePage />} />
          <Route path="/samples/:id" element={<SampleDetailsPage />} />
          <Route path="/users" element={<UsersList />} />
          <Route 
            path="/users/:id" 
            element={
            <RoleProtectedPage allowedRoles={['admin']}>
              <UserDetailsPage />
            </RoleProtectedPage>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorizedPage" element={<UnauthorizedPage />} />
          <Route path="*" element={<Navigate to='/unauthorizedPage' replace />} />
        </Routes>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
