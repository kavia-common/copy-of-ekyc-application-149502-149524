import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import BankDetails from './pages/BankDetails';
import './App.css';

// PUBLIC_INTERFACE
export default function App(): React.ReactElement {
  /** App root: navigation and route registration for Register, Login and BankDetails pages. */
  return (
    <div className="App">
      <header className="App-header" role="banner" aria-label="EKYC Header">
        <nav className="navbar" aria-label="Primary">
          <ul style={{ display: 'flex', gap: 16, listStyle: 'none', padding: 0 }}>
            <li><Link className="App-link" to="/register">Register</Link></li>
            <li><Link className="App-link" to="/login">Login</Link></li>
            <li><Link className="App-link" to="/bank">Bank Details</Link></li>
          </ul>
        </nav>
      </header>
      <main role="main" className="container" aria-live="polite">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bank" element={<BankDetails />} />
          <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
