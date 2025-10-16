import React, { useState } from 'react';
import { Input } from '../components/Form/Input';
import { loginUser } from '../services/api';

// PUBLIC_INTERFACE
export default function Login(): React.ReactElement {
  /** Login page: accepts identifier (email/mobile) and password; uses loginUser API. */
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!identifier || !password) {
      setError('Please enter identifier and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({ identifier, password });
      if (res.ok) {
        setMessage('Login successful.');
        // Typically store token, redirect etc. Skipped for brevity.
      } else {
        setError(res.error || 'Login failed.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="login-title" style={{ padding: 24 }}>
      <h1 id="login-title">Login</h1>
      <form onSubmit={onSubmit} noValidate>
        <Input
          id="identifier"
          label="Email or Mobile"
          value={identifier}
          onChange={setIdentifier}
          type="text"
          required
          help="Enter your registered email or 10-digit mobile number."
        />
        <Input
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required
        />
        <div style={{ marginTop: 16 }}>
          <button className="theme-toggle" type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        {message && <p role="status" style={{ color: 'green', marginTop: 12 }}>{message}</p>}
        {error && <p role="alert" style={{ color: 'red', marginTop: 12 }}>{error}</p>}
      </form>
    </section>
  );
}
