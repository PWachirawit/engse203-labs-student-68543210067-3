import { createContext, useContext, useMemo, useState } from 'react';
import { apiFetch, setAuthToken } from '../services/apiClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const result = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(result.token);
    setUser(result.user);
    return result.user;
  }

  function logout() {
    setAuthToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ user, isStaff: user?.role === 'staff', login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
