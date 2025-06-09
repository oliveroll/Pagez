import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface ProfileContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  // Legacy support for existing code
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const updateProfile = (updates: Partial<User>) => {
    if (profile) {
      setProfile({
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const value: ProfileContextType = {
    profile,
    setProfile,
    updateProfile,
    isLoading,
    setIsLoading,
    profileImage,
    setProfileImage,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};