import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import JobDetailPage from './pages/JobDetailPage';
import PrivateRoute from './routes/PrivateRoute';
import NavSidebar from './components/NavSidebar';
import { useAuthProvider } from './hooks/useAuth';

// PUBLIC_INTERFACE
function App() {
  /** Root application with routing and sidebar layout. */

  const AuthProvider = useAuthProvider();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <NavSidebar />
          <main className="app-main">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <UploadPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <PrivateRoute>
                    <JobDetailPage />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
