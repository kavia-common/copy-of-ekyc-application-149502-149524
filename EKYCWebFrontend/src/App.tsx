import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import BankDetails from './pages/BankDetails';
import SideNavLayout from './layout/SideNavLayout';
import './App.css';
import './theme.css';

// PUBLIC_INTERFACE
export default function App(): React.ReactElement {
  /** App root: uses SideNavLayout shell and registers routes. */
  return (
    <SideNavLayout>
      <Routes>
        <Route path="/" element={<div>Welcome to EKYC Dashboard</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bank" element={<BankDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SideNavLayout>
  );
}
