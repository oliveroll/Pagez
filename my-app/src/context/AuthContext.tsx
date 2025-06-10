import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { AuthContextType, LoginForm, RegisterForm, User } from '../types';
import { MOCK_USERS } from '../constants/mockData';

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
      // Mock login - find user by email
      const mockUser = MOCK_USERS.find(u => u.email === form.email);
      if (mockUser && form.password === 'password') { // Mock password check
        setUser(mockUser);
        setIsAuthenticated(true);
        // TODO: Store user ID in AsyncStorage for persistence in real app
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (form: RegisterForm): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock registration - create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: form.email,
        displayName: form.displayName,
        username: form.username,
        isAuthor: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          favoriteGenres: [],
          notificationsEnabled: true,
          privacySettings: {
            profileVisibility: 'public',
            readingListsVisibility: 'public',
            activityVisibility: 'friends',
          },
        },
        stats: {
          totalBooksRead: 0,
          currentlyReading: 0,
          totalReadingLists: 0,
          followersCount: 0,
          followingCount: 0,
        },
      };

      setUser(newUser);
      setIsAuthenticated(true);
      // TODO: Store user ID in AsyncStorage for persistence in real app
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setUser(null);
      setIsAuthenticated(false);
      // TODO: Clear stored auth from AsyncStorage in real app
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
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