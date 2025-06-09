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
} from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data - Replace with API calls
const continueReadingBooks = [
  {
    id: 1,
    title: 'DUNE',
    author: 'FRANK HERBERT',
    progress: 58,
    currentPage: 589,
    totalPages: 1200,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'CITY OF ORANGE',
    author: 'DAVID YOON',
    progress: 58,
    currentPage: 589,
    totalPages: null,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'THE MOON AND STARS',
    author: 'Jenna Warren',
    progress: 58,
    currentPage: 589,
    totalPages: null,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
  },
];

const trendingBooks = [
  {
    id: 4,
    title: "DON'T LOOK BACK",
    author: 'ISAAC NELSON',
    badge: 'VOTED BEST THRILLER NOVEL 20XX',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'TARZAN',
    author: 'Edgar Rice Burroughs',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'WALK INTO THE SHADOW',
    author: 'ESTELLE DARCY',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
  },
];

const communityFavorites = [
  {
    id: 7,
    title: 'HARRY POTTER',
    author: 'DEATHLY',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop',
  },
  {
    id: 8,
    title: 'Sisters',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'The Summer',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
  },
];

const BookCard = ({ book, showProgress = false, size = 'medium' }) => {
  const cardWidth = size === 'large' ? width * 0.28 : width * 0.25;
  
  return (
    <TouchableOpacity 
      style={[styles.bookCard, { width: cardWidth }]} 
      onPress={() => router.push(`/book/${book.id}` as any)} // Navigate to book details
    >
      <View style={styles.bookCover}>
        <Image source={{ uri: book.cover }} style={styles.coverImage} />
        {book.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{book.badge}</Text>
          </View>
        )}
      </View>
      
      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${book.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{book.progress}%</Text>
          <Text style={styles.pageText}>
            Page {book.currentPage}{book.totalPages ? `/${book.totalPages}` : ''}
          </Text>
        </View>
      )}
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/menu' as any)}>
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
          
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
          {trendingBooks.map((book) => (
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
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabLabelActive}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/community')} // Navigate to community
        >
          <Text style={styles.tabIcon}>🔗</Text>
          <Text style={styles.tabLabel}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/library')} // Navigate to library
        >
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={styles.tabLabel}>Library</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  pagezLogo: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
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
    fontFamily: 'Bogart-Bold-Trial',
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
    fontFamily: 'Bogart-Bold-Trial',
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
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333333',
    marginBottom: 2,
  },
  pageText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666666',
  },
  bottomSpacing: {
    height: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIconActive: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.6,
  },
  tabLabelActive: {
    fontSize: 12,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B35',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666666',
  },
  menuButton: {
    width: 30,
    height: 20,
    backgroundColor: '#000000',
    borderRadius: 15,
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