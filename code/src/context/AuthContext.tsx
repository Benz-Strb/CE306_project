import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface User {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = [
  'admin@longdo.com',
  'nd.natthawutbenz@gmail.com',
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('gemflix-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string) => {
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    
    const newUser = { 
      email,
      isAdmin 
    };
    
    setUser(newUser);
    localStorage.setItem('gemflix-user', JSON.stringify(newUser));
    
    if (isAdmin) {
      console.log('🔐 Admin logged in:', email);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gemflix-user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};