"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  username: string;
  email?: string;
  disabled?: boolean;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verify token and get user info
  const verifyToken = async (authToken: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        const isValid = await verifyToken(storedToken);
        if (isValid) {
          setToken(storedToken);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    await verifyToken(newToken);
    router.push('/dashboard');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    router.push('/auth');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, isLoading }}>
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