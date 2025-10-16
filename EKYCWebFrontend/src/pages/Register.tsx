import React, { useState } from 'react';
import { Input } from '../components/Form/Input';
import { registerUser } from '../services/api';

/**
 * PUBLIC_INTERFACE
 */
export default function Register(): React.ReactElement {
  /** Registration page: validates email, mobile and password; posts to backend via registerUser. */
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!/\S+@\S+\.\S+/.test(email) || email.length > 50) {
      setError('Please enter a valid email (max 50 chars).');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError('Mobile must be exactly 10 digits.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser({ email, mobile, password });
      if (res.ok) {
        setMessage('Registered successfully. Please proceed to login.');
      } else {
        setError(res.error || 'Registration failed.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="register-title" className="form-section">
      <h1 id="register-title" className="form-heading">Register</h1>
      <form onSubmit={onSubmit} className="form-grid" noValidate>
        <Input
          id="email"
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          maxLength={50}
          required
          help="Enter a valid email address (max 50 chars)."
        />
        <Input
          id="mobile"
          label="Mobile Number"
          value={mobile}
          onChange={setMobile}
          type="tel"
          pattern="^\d{10}$"
          required
          help="10-digit mobile number linked to Aadhaar."
        />
        <Input
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required
          help="Minimum 8 characters."
        />
        <Input
          id="confirm"
          label="Confirm Password"
          value={confirm}
          onChange={setConfirm}
          type="password"
          required
        />

        <div style={{ marginTop: 'var(--spacing-4)' }}>
          <button className="btn-primary" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
        {message && <p role="status" style={{ color: '#166534', marginTop: 12 }}>{message}</p>}
        {error && <p role="alert" style={{ color: '#991b1b', marginTop: 12 }}>{error}</p>}
      </form>
    </section>
  );
}
