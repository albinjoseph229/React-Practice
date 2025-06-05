import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components (we'll create these)
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PatientRegistration from './pages/PatientRegistration';
import PatientRecords from './pages/PatientRecords';
import MedicalPlanGenerator from './pages/MedicalPlanGenerator';
import Layout from './components/common/Layout';

// Auth context (we'll implement this)
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/patient-registration" element={
              <ProtectedRoute>
                <Layout>
                  <PatientRegistration />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/patient-records" element={
              <ProtectedRoute>
                <Layout>
                  <PatientRecords />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/medical-plan/:patientId" element={
              <ProtectedRoute>
                <Layout>
                  <MedicalPlanGenerator />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;