"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextValue {
  isAuthorized: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = () => {
    setIsAuthorized(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    setIsAuthorized(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
