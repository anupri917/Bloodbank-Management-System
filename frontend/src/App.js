import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Chatbot from './components/chat/Chatbot';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import UserDashboard from './pages/user/UserDashboard';
import './App.css';

// Simple auth check helper
const isAuthenticated = () => !!localStorage.getItem('token');
const getUserRole = () => localStorage.getItem('role');

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  const role = getUserRole();
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const auth = isAuthenticated();

  return (
    <Router>
      <div className="app-container">
        {auth && <Navbar />}
        <div className="main-content">
          {auth && <Sidebar />}
          <div className="page-content">
            <Routes>
              <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
              
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/worker" element={
                <ProtectedRoute allowedRoles={['ROLE_WORKER']}>
                  <WorkerDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/user" element={
                <ProtectedRoute allowedRoles={['ROLE_USER']}>
                  <UserDashboard />
                </ProtectedRoute>
              } />

              <Route path="/" element={
                <ProtectedRoute>
                  {getUserRole() === 'ROLE_ADMIN' ? <Navigate to="/admin" /> :
                   getUserRole() === 'ROLE_WORKER' ? <Navigate to="/worker" /> :
                   <Navigate to="/user" />}
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;