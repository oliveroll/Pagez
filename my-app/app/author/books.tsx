import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Backend developer should replace with real API calls
const mockBooks = [
  {
    id: 1,
    title: "DON'T LOOK BACK",
    author: "ISAAC NELSON",
    coverImage: "https://via.placeholder.com/300x400/2D3748/FFFFFF?text=DON%27T+LOOK+BACK",
    award: "VOTED BEST THRILLER NOVEL 20XX"
  },
  {
    id: 2,
    title: "TARZAN",
    author: "Edgar Rice Burroughs",
    coverImage: "https://via.placeholder.com/300x400/8B4513/FFFFFF?text=TARZAN",
    price: "1€"
  },
  {
    id: 3,
    title: "WALK INTO THE SHADOW",
    author: "ESTELLE D'ARCY",
    coverImage: "https://via.placeholder.com/300x400/2F5233/FFFFFF?text=WALK+INTO+SHADOW",
  },
  {
    id: 4,
    title: "THE MARTIAN",
    author: "ANDY WEIR",
    coverImage: "https://via.placeholder.com/300x400/D2691E/FFFFFF?text=THE+MARTIAN",
  },
  {
    id: 5,
    title: "ITALO CALVINO",
    author: "Oscar Mondadori",
    coverImage: "https://via.placeholder.com/300x400/DC143C/FFFFFF?text=ITALO+CALVINO",
    subtitle: "Collezione di sabbia"
  }
];

const mockUserProfile = {
  name: "Author Name",
  avatar: "https://via.placeholder.com/40x40/FFB6C1/000000?text=A"
};

export default function HomeScreen() {
  // TODO: Backend developer - Replace with real API calls
  const handleBookPress = (bookId: number) => {
    console.log(`Book ${bookId} pressed`);
    router.push(`/book/${bookId}` as any);
  };

  const handleAddBook = () => {
    console.log('Add book pressed');
    router.push('/add-book' as any);
  };

  const handleTabPress = (tab: string) => {
    console.log(`${tab} tab pressed`);
    router.push(`/${tab.toLowerCase()}` as any);
  };

  const handleBackPress = () => {
    console.log('Back pressed');
    router.back();
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
    router.push('/settings' as any);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    router.push('/profile' as any);
  };

  const BookCard = ({ book }: { book: typeof mockBooks[0] }) => (
    <TouchableOpacity 
      style={styles.bookCard} 
      onPress={() => handleBookPress(book.id)}
      activeOpacity={0.8}
    >
      <View style={styles.bookCover}>
        {/* TODO: Backend developer - Replace with real book cover images */}
        <Image 
          source={{ uri: book.coverImage }} 
          style={styles.bookImage}
          resizeMode="cover"
        />
        {book.award && (
          <View style={styles.awardBadge}>
            <Text style={styles.awardText}>{book.award}</Text>
          </View>
        )}
        {book.price && (
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{book.price}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Author's Space</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            {/* TODO: Backend developer - Replace with real user avatar */}
            <Image 
              source={{ uri: mockUserProfile.avatar }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabPress('Dashboard')}>
          <Text style={styles.tabInactive}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Books')}>
          <Text style={styles.tabActive}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Notes')}>
          <Text style={styles.tabInactive}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Community')}>
          <Text style={styles.tabInactive}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('You')}>
          <Text style={styles.tabInactive}>You</Text>
        </TouchableOpacity>
      </View>

      {/* Books Grid */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.booksGrid}>
          {/* TODO: Backend developer - Replace mockBooks with real API data */}
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>

      {/* Add Book Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddBook}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingsButton: {
    padding: 5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabActive: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
  },
  tabInactive: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for the add button
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 15,
  },
  bookCard: {
    width: (screenWidth - 55) / 2, // Account for padding and gap
    marginBottom: 20,
  },
  bookCover: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#E5E5E5',
  },
  awardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  awardText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
  },
  priceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Bogart-Bold-Trial',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
  },
});