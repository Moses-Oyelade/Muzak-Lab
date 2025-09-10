import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  login as authLogin,
  logout as authLogout,
  getAccessToken,
  getUserRole,
  getUserName,
} from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const token = getAccessToken();
    const role = getUserRole();
    const username = getUserName();
    if (token && role) {
      setUser({ token, role, username });
      console.log(`Token: ${token}, Role: ${role} and Username: ${username}`)
      setLoading(false)
    } else if (token) {
      setUser({token})
      console.log('only Token:', token)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authLogin(username, password);
      setUser({ 
        token: data.access,
        role: data.role,
        username: data.username
       });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);