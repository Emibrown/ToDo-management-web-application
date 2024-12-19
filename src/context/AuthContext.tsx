"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextValue {
  csrfToken: string | null;
  login: (csrfToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  initialCsrfToken: string | null;
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ initialCsrfToken, children }) => {
  const [csrfToken, _setCsrfToken] = useState<string | null>(initialCsrfToken);

  const login = async (token: string) => {
    localStorage.setItem('csrfToken', token);
    window.location.href = '/';
  };

  const logout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      localStorage.removeItem('csrfToken');
      window.location.href = '/signin';
    } else {
      const data = await res.json();
      alert(data.error || 'Logout failed');
    }
  };


  return (
    <AuthContext.Provider value={{ csrfToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
