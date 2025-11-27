import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginRequest } from '../api/client';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth context (user, token, login, logout). */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function useAuthProvider() {
  /** Returns a Provider component to wrap the app with auth state. */
  return function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('auth_token') || '');
    const [user, setUser] = useState(() => {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate?.() || (() => {});
    const location = useLocation?.() || { pathname: '/' };

    // Memoize 'from' value to avoid unstable dependencies in login
    const loginFrom = useMemo(
      () => (location.state && location.state.from) || '/dashboard',
      [location.state]
    );

    useEffect(() => {
      if (token) localStorage.setItem('auth_token', token);
      else localStorage.removeItem('auth_token');
    }, [token]);

    useEffect(() => {
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      else localStorage.removeItem('auth_user');
    }, [user]);

    // Memoize navigation replacements to avoid excessive re-renders
    const stableNavigate = useCallback(
      (...args) => navigate(...args),
      [navigate]
    );

    const login = useCallback(async (email, password) => {
      setLoading(true);
      try {
        const jwt = await loginRequest(email, password);
        setToken(jwt);
        setUser({ email });
        stableNavigate(loginFrom, { replace: true });
      } finally {
        setLoading(false);
      }
    }, [loginFrom, stableNavigate]);

    const logout = useCallback(() => {
      setToken('');
      setUser(null);
      stableNavigate('/login', { replace: true });
    }, [stableNavigate]);

    const value = useMemo(
      () => ({ token, user, login, logout, loading, isAuthenticated: !!token }),
      [token, user, login, logout, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
}
