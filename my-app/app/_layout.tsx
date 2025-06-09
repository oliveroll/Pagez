import { Tabs } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { BooksProvider } from '../src/context/BooksContext';
import { ReadingListsProvider } from '../src/context/ReadingListsContext';
import { ProfileProvider } from '../src/context/ProfileContext';

export default function AppLayout() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BooksProvider>
          <ReadingListsProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',   // Customize as needed
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
        }}
      />
               <Tabs.Screen
                 name="test"
                 options={{
                   title: 'Test',
                 }}
               />
    </Tabs>
          </ReadingListsProvider>
        </BooksProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
