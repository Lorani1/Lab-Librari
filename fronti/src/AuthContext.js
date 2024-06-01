import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [userRole, setUserRole] = useState(null);
  const history = useHistory();

  const login = (authToken) => {
    localStorage.setItem('authToken', authToken);
    const decodedToken = jwtDecode(authToken);
    setUserRole(decodedToken.role); // Assuming the role is stored under 'role' in your JWT payload
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.setItem('logout-event', Date.now()); // Write a timestamp to trigger the event
    setIsAuthenticated(false);
    setUserRole(null);
    history.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role); // Assuming the role is stored under 'role' in your JWT payload
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
