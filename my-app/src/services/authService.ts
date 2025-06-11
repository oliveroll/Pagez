import { MOCK_USERS } from '../constants/mockData';
import { User, LoginForm, RegisterForm } from '../types';

// Mock user data for social logins
const mockGoogleUser: User = {
  id: 'google-user-1',
  email: 'googleuser@gmail.com',
  displayName: 'Google User',
  username: 'googleuser',
  profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  isAuthor: false,
  bio: 'Signed up with Google',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  preferences: {
    favoriteGenres: [],
    readingGoal: 25,
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
    totalReadingLists: 3,
    followersCount: 0,
    followingCount: 0,
  },
};

const mockAppleUser: User = {
  id: 'apple-user-1',
  email: 'appleuser@icloud.com',
  displayName: 'Apple User',
  username: 'appleuser',
  profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face',
  isAuthor: false,
  bio: 'Signed up with Apple',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  preferences: {
    favoriteGenres: [],
    readingGoal: 30,
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
    totalReadingLists: 3,
    followersCount: 0,
    followingCount: 0,
  },
};

// Mock authentication service following MVP pattern
export const authService = {
  /**
   * Mock email/password login
   */
  loginWithEmail: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Find user by email in mock data
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user && password === 'password') { // Mock password check
      return { 
        user, 
        token: `mock-token-${user.id}-${Date.now()}`,
        refreshToken: `refresh-mock-token-${user.id}-${Date.now()}`,
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  /**
   * Mock Google authentication
   */
  loginWithGoogle: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate successful Google auth
    return { 
      user: mockGoogleUser, 
      token: `google-mock-token-${Date.now()}`,
      refreshToken: `google-refresh-token-${Date.now()}`,
    };
  },

  /**
   * Mock Apple authentication
   */
  loginWithApple: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1300));

    // Simulate successful Apple auth
    return { 
      user: mockAppleUser,
      token: `apple-mock-token-${Date.now()}`,
      refreshToken: `apple-refresh-token-${Date.now()}`,
    };
  },

  /**
   * Mock registration
   */
  register: async (form: RegisterForm) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock username uniqueness check
    const existingUser = MOCK_USERS.find(
      u => u.username.toLowerCase() === form.username.toLowerCase() || 
           u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (existingUser) {
      if (existingUser.email.toLowerCase() === form.email.toLowerCase()) {
        throw new Error('Email already exists');
      }
      if (existingUser.username.toLowerCase() === form.username.toLowerCase()) {
        throw new Error('Username already taken');
      }
    }

    // Create new user
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
        readingGoal: 25,
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
        totalReadingLists: 3,
        followersCount: 0,
        followingCount: 0,
      },
    };

    return {
      user: newUser,
      token: `register-mock-token-${Date.now()}`,
      refreshToken: `register-refresh-token-${Date.now()}`,
    };
  },

  /**
   * Mock password reset
   */
  forgotPassword: async (email: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Always return success (don't reveal if email exists)
    return {
      success: true,
      message: 'If an account with this email exists, you will receive password reset instructions.',
    };
  },

  /**
   * Mock logout
   */
  logout: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  },

  /**
   * Mock token refresh
   */
  refreshToken: async (refreshToken: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      token: `refreshed-mock-token-${Date.now()}`,
      refreshToken: `new-refresh-token-${Date.now()}`,
    };
  },

  /**
   * Mock username availability check
   */
  checkUsernameAvailability: async (username: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Check against existing mock users
    const exists = MOCK_USERS.some(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    return !exists;
  },

  /**
   * Mock email availability check
   */
  checkEmailAvailability: async (email: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Check against existing mock users
    const exists = MOCK_USERS.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    return !exists;
  },
}; 