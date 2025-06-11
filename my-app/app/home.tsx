import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useBooks } from '../src/context/BooksContext';
import { useAuth } from '../src/context/AuthContext';
import { COLORS } from '../src/constants/colors';
import { formatProgress } from '../src/utils/formatters';
import { TabBar } from '../src/components/TabBar';

const { width } = Dimensions.get('window');

const BookCard = ({ book, showProgress = false, size = 'medium' }) => {
  const cardWidth = size === 'large' ? width * 0.28 : width * 0.25;
  
  return (
    <TouchableOpacity 
      style={[styles.bookCard, { width: cardWidth }]} 
      onPress={() => router.push('/book-more')} // Navigate to book details
    >
      <View style={styles.bookCover}>
        <Image source={{ uri: book.coverUrl || book.cover }} style={styles.coverImage} />
        {book.tags && book.tags.includes('bestseller') && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>BESTSELLER</Text>
          </View>
        )}
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
        
        {showProgress && book.pageCount && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '58%' }]} />
          </View>
            <Text style={styles.progressText}>58%</Text>
          <Text style={styles.pageText}>
              Page 58/{book.pageCount}
          </Text>
        </View>
      )}
      </View>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ icon, title, iconColor = '#FF6B35' }) => (
  <View style={styles.sectionHeader}>
    <Text style={[styles.sectionIcon, { color: iconColor }]}>{icon}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

export default function HomeScreen() {
  const { books, trending, recommended, isLoading } = useBooks();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
          <Text style={styles.loadingText}>Loading books...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // For continue reading, we'll use the first few books as mock "currently reading"
  const continueReadingBooks = books.slice(0, 2);
  const communityFavorites = recommended;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile' as any)}>
          <View style={styles.menuButton} />
        </TouchableOpacity>
        
        <Text style={styles.pagezLogo}>pagez</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => router.push('/search')} // Navigate to search
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/profile' as any)}>
            <Image 
              source={{ uri: user?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 160 }]}
      >
        {/* Continue Reading Section */}
        <SectionHeader icon="📖" title="Continue Reading..." />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {continueReadingBooks.map((book) => (
            <BookCard key={book.id} book={book} showProgress={true} size="large" />
          ))}
        </ScrollView>

        {/* Trending Books Section */}
        <SectionHeader icon="🔥" title="Trending Books" />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {trending.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ScrollView>

        {/* Community Favorites Section */}
        <SectionHeader icon="👍" title="Community Favorites" />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {communityFavorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ScrollView>
        
        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  pagezLogo: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-trial',
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-trial',
    color: '#333333',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  bookCard: {
    marginRight: 15,
  },
  bookCover: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#F0F0F0',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: 'Bogart-Bold-trial',
  },
  progressContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-trial',
    color: '#333333',
    marginBottom: 2,
  },
  pageText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
  },
  bottomSpacing: {
    height: 20,
  },
  menuButton: {
    width: 30,
    height: 20,
    backgroundColor: '#000000',
    borderRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  bookInfo: {
    marginTop: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#666666',
  },
});

// TODO: Backend Integration Points
// 1. Replace mock data with API calls:
//    - continueReadingBooks: GET /api/user/reading-progress
//    - trendingBooks: GET /api/books/trending
//    - communityFavorites: GET /api/books/community-favorites
// 
// 2. User profile image: GET /api/user/profile
// 
// 3. Search functionality: Implement search API endpoint
// 
// 4. Book navigation: Ensure book/{id} route exists with proper book details
//
// 5. Add real book cover images from your book database
//
// 6. Implement proper authentication check for user-specific data