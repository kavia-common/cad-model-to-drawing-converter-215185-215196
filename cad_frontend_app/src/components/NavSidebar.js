import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function NavSidebar() {
  /** Sidebar navigation with brand and auth controls. */
  const { isAuthenticated, user, logout } = useAuth() || {};
  const loc = useLocation();

  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
      <div className="brand">
        <span className="dot" /> CAD Converter
      </div>
      <nav className="nav">
        {isAuthenticated ? (
          <>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard">Dashboard</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/upload">Upload</NavLink>
          </>
        ) : (
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/login">Login</NavLink>
        )}
      </nav>
      <div style={{ marginTop: 'auto' }}>
        {isAuthenticated ? (
          <div className="card">
            <div style={{ fontSize: 12, color: '#6b7280' }}>Signed in</div>
            <div style={{ fontWeight: 600 }}>{user?.email || 'User'}</div>
            <div className="actions" style={{ marginTop: 8 }}>
              <button className="btn" onClick={() => logout()}>Logout</button>
            </div>
            <div className="help" style={{ marginTop: 8 }}>
              Loc: {loc.pathname}
            </div>
          </div>
        ) : (
          <div className="help">Please sign in to access features.</div>
        )}
      </div>
    </aside>
  );
}
