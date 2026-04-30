"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { User } from 'firebase/auth';
import { AuthService } from '../services/AuthService';

interface AuthContextValue {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  login: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthorized: false,
  isLoading: true,
  login: async () => null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Suscribirse a cambios de Firebase Auth
    const unsubscribe = AuthService.subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const loggedUser = await AuthService.loginWithGoogle();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return loggedUser;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthorized: !!user, 
        isLoading, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
