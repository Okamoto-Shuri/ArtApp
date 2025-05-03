import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user type
type User = {
  id: string;
  displayName: string;
  profileImage?: string;
};

// Define context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    // This would normally check for stored credentials or tokens
    // For mock purposes, we'll just set loading to false
    setIsLoading(false);
  }, []);

  // Login function
  const login = async () => {
    try {
      setIsLoading(true);
      
      // This would normally call an API to authenticate
      // For mock purposes, we'll just set a mock user
      setTimeout(() => {
        setUser({
          id: '12345',
          displayName: 'Art Explorer',
          profileImage: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // This would normally call an API to logout
      // For mock purposes, we'll just clear the user
      setTimeout(() => {
        setUser(null);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setIsLoading(false);
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}