import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import Contacts from './pages/Contacts';
import Companies from './pages/Companies';
import Solutions from './pages/Solutions';
import Forums from './pages/Forums';
import Analytics from './pages/Analytics';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="container-fluid">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/users/contacts" element={<Contacts />} />
          <Route path="/users/companies" element={<Companies />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<AdminSettings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
