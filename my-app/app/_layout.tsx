import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';

import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { BooksProvider } from '../src/context/BooksContext';
import { ReadingListsProvider } from '../src/context/ReadingListsContext';
import { ProfileProvider } from '../src/context/ProfileContext';
import { ReadingListProvider } from '../src/context/ReadingListContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Auth Navigation Component
function AuthNavigator() {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // User is authenticated, navigate to home
        router.replace('/home');
      } else {
        // User is not authenticated, navigate to onboarding
        router.replace('/onboarding');
      }
    }
  }, [isAuthenticated, isLoading, user]);

  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="library" options={{ headerShown: false }} />
      <Stack.Screen name="community" options={{ headerShown: false }} />
      <Stack.Screen name="book-more" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="author" options={{ headerShown: false }} />
      <Stack.Screen name="setup" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Bogart-Bold-trial': require('../src/assets/fonts/Bogart-Bold-trial.ttf'),
    'Bogart-Regular-trial': require('../src/assets/fonts/Bogart-Regular-trial.ttf'),
    'Bogart-Medium-trial': require('../src/assets/fonts/Bogart-Medium-trial.ttf'),
    'Bogart-Light-trial': require('../src/assets/fonts/Bogart-Light-trial.ttf'),
    'Bogart-Semibold-trial': require('../src/assets/fonts/Bogart-Semibold-trial.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen when fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep splash screen visible while fonts load
  }

  return (
    <AuthProvider>
      <ProfileProvider>
        <BooksProvider>
          <ReadingListsProvider>
            <ReadingListProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <AuthNavigator />
              </ThemeProvider>
            </ReadingListProvider>
          </ReadingListsProvider>
        </BooksProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
