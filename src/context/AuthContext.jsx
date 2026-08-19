import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { setUnauthorizedHandler } from '../services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    api.auth.logout();
    setIsAuthenticated(false);
    setError(null);
  }, []);

  // Any request rejected with 401/403 means the stored token is no longer good.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setIsAuthenticated(false);
      setError('Your session expired. Please log in again.');
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  // A token in localStorage is not proof of a live session — verify it with the
  // backend before rendering the admin panel.
  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      if (!api.auth.isLoggedIn()) {
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        await api.auth.getMe();
        if (!cancelled) setIsAuthenticated(true);
      } catch (err) {
        // Only a rejected token invalidates the session. A missing /auth/me
        // route or an unreachable backend should not log the admin out.
        if (cancelled) return;
        if (err.status === 401 || err.status === 403) {
          api.auth.logout();
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    verify();
    return () => { cancelled = true; };
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      await api.auth.login(username, password);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err.message || 'Invalid credentials');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
