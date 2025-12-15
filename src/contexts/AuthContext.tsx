import React, { createContext, useContext, useState } from 'react';

type UserRole = 'stagiaire' | 'formateur' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Simulation de connexion
    const mockUser: User = {
      id: '1',
      name: role === 'stagiaire' ? 'Ahmed Bennani' : role === 'formateur' ? 'Prof. Samira El Amrani' : 'Admin ISMONTIC',
      email,
      role: role!,
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
