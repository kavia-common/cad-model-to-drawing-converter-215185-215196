import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Login form posts to backend and stores JWT via useAuth. */
  const { login, loading } = useAuth() || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
    } catch (error) {
      setErr(error?.message || 'Login failed');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 440, margin: '40px auto' }}>
      <h1>Sign in</h1>
      <p className="help">Use your account to access the CAD converter.</p>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" className="input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {err ? <div className="badge err" role="alert">{err}</div> : null}
        <div className="actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}
