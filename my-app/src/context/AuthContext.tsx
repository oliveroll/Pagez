import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { AuthContextType, LoginForm, RegisterForm, User } from '../types';
import { authService } from '../services/authService';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Mock authentication - in real app, this would check stored tokens
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, this would check AsyncStorage for stored auth tokens
        // For now, we'll just set the loading to false since we're using mock auth
        // TODO: Implement AsyncStorage when adding real authentication
        
        // Auto-login disabled to show onboarding flow
        // Uncomment the lines below if you want to skip onboarding for testing
        // const mockUser = MOCK_USERS[0]; // Alex Johnson
        // if (mockUser) {
        //   setUser(mockUser);
        //   setIsAuthenticated(true);
        // }
      } catch (error) {
        // Silently handle any errors during auth check
        console.log('Auth check completed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (form: LoginForm): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.loginWithEmail(form.email, form.password);
      setUser(response.user);
      setIsAuthenticated(true);
      // TODO: Store tokens in AsyncStorage for persistence in real app
      // localStorage.setItem('authToken', response.token);
      // localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (form: RegisterForm): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.register(form);
      setUser(response.user);
      setIsAuthenticated(true);
      // TODO: Store tokens in AsyncStorage for persistence in real app
      // localStorage.setItem('authToken', response.token);
      // localStorage.setItem('refreshToken', response.refreshToken);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      // TODO: Clear stored auth from AsyncStorage in real app
      // localStorage.removeItem('authToken');
      // localStorage.removeItem('refreshToken');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.loginWithGoogle();
      setUser(response.user);
      setIsAuthenticated(true);
      // TODO: Store tokens in AsyncStorage for persistence in real app
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.loginWithApple();
      setUser(response.user);
      setIsAuthenticated(true);
      // TODO: Store tokens in AsyncStorage for persistence in real app
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      return await authService.checkUsernameAvailability(username);
    } catch (error) {
      return false;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      setUser(updatedUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    loginWithGoogle,
    loginWithApple,
    forgotPassword,
    checkUsernameAvailability,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return function AuthComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return null; // Or loading component
    }

    if (!isAuthenticated) {
      router.replace('/onboarding');
      return null;
    }

    return <Component {...props} />;
  };
};

export default AuthContext; 