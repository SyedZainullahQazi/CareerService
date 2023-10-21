import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/authContext/AuthContext';
import Dashboard from './pages/general/Dashboard';

import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute';
import GeneralProtectedRoute from './components/GeneralProtectedRoute/GeneralProtectedRoute';
import Signup from './pages/auth/UserAccess/Signup';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<GeneralProtectedRoute elementBody={<Dashboard />} />} />
        <Route path="/henlo" element={<><h1>Hello World</h1></>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
