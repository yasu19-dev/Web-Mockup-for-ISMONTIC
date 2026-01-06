import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    const mockUser = {
      id: '1',
      name: role === 'stagiaire' ? 'Zaid SAOUSAOU' : role === 'formateur' ? 'Prof. Bouchra EL AKEL' : 'Admin ISMONTIC',
      email,
      role: role, 
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}