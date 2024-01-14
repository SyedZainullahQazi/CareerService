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
import Profile from './pages/general/Profile';
import JoinEvent from './pages/general/JoinEvent';
import OurTeam from './pages/general/OurTeam';
import Sessions from './pages/general/Sessions';
import Scholarship from './pages/general/Scholarship';
import ManageEvents from './pages/admin/events/ManageEvents';
import CreateEvent from './pages/admin/events/CreateEvent';
import EventOptions from './pages/admin/events/EventOptions';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<GeneralProtectedRoute elementBody={<Dashboard />} />} />
        
        <Route path="/profile" element={<GeneralProtectedRoute elementBody={<Profile/>}/>} />
        <Route path="/join-event" element={<GeneralProtectedRoute elementBody={<JoinEvent/>}/>}/>
        <Route path="/team" element={<GeneralProtectedRoute elementBody={<OurTeam/>}/>}/>

        <Route path="/sessions" element={<GeneralProtectedRoute elementBody={<Sessions/>}/>}/>
        <Route path="/scholarship" element={<GeneralProtectedRoute elementBody={<Scholarship/>}/>}/>
        <Route path="/henlo" element={<><h1>Hello World</h1></>} />

        <Route path="/create-events" element={<AdminProtectedRoute elementBody={<ManageEvents/>}/>}/>
        <Route path="/manage-events" element={<AdminProtectedRoute elementBody={<CreateEvent/>}/>}/>
        <Route path="/event-options" element={<AdminProtectedRoute elementBody={<EventOptions />}/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
