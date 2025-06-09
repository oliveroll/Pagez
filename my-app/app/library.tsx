import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

// Mock data - Replace with real API calls
const bookmarkedBooks = [
  {
    id: '1',
    title: "Don't Look Back",
    author: 'Isaac Nelson',
    cover: 'https://via.placeholder.com/120x180/333/fff?text=Don%27t+Look+Back',
    badge: 'VOTED BEST THRILLER NOVEL 20XX',
  },
  {
    id: '2',
    title: 'Tarzan',
    author: 'Edgar Rice Burroughs',
    cover: 'https://via.placeholder.com/120x180/8B4513/fff?text=Tarzan',
  },
  {
    id: '3',
    title: 'Walk Into The Shadow',
    author: 'Estelle Darcy',
    cover: 'https://via.placeholder.com/120x180/2F4F2F/fff?text=Walk+Into+Shadow',
  },
];

const continueReadingBooks = [
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://via.placeholder.com/120x180/DAA520/fff?text=Dune',
    progress: 58,
    currentPage: 589,
  },
  {
    id: '5',
    title: 'City of Orange',
    author: 'David Yoon',
    cover: 'https://via.placeholder.com/120x180/FF4500/fff?text=City+of+Orange',
    progress: 58,
    currentPage: 589,
  },
  {
    id: '6',
    title: 'The Moon and Stars',
    author: 'Jenna Warren',
    cover: 'https://via.placeholder.com/120x180/483D8B/fff?text=Moon+%26+Stars',
    progress: 58,
    currentPage: 589,
  },
];

const HomeScreen = () => {
  // TODO: Replace with real API calls
  const handleBookPress = (bookId: string) => {
    router.push('/book-more' as any);
  };

  const handleViewAllBookmarks = () => {
    router.push('/home' as any);
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleProfilePress = () => {
    router.push('/home' as any);
  };

  const handleNavigation = (screen: string) => {
    if (screen === 'home') router.push('/home');
    else if (screen === 'community') router.push('/community');
    else if (screen === 'library') router.push('/library');
    else router.push('/home' as any);
  };

  const renderBookmarkItem = (book: any) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookmarkItem}
      onPress={() => handleBookPress(book.id)}
    >
      <View style={styles.bookCoverContainer}>
        {book.badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{book.badge}</Text>
          </View>
        )}
        <Image source={{ uri: book.cover }} style={styles.bookCover} />
      </View>
    </TouchableOpacity>
  );

  const renderContinueReadingItem = (book: any) => (
    <TouchableOpacity
      key={book.id}
      style={styles.continueReadingItem}
      onPress={() => handleBookPress(book.id)}
    >
      <View style={styles.bookCoverContainer}>
        <Image source={{ uri: book.cover }} style={styles.bookCover} />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressPercentage}>{book.progress}%</Text>
        <Text style={styles.progressPage}>Page {book.currentPage}</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${book.progress}%` }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>pagez</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSearchPress} style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/40x40/4CAF50/fff?text=U' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bookmarks Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.bookmarkIcon}>🔖</Text>
              <Text style={styles.sectionTitle}>Bookmarks</Text>
            </View>
            <TouchableOpacity onPress={handleViewAllBookmarks}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {bookmarkedBooks.map(renderBookmarkItem)}
          </ScrollView>
        </View>

        {/* Continue Reading Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.glassesIcon}>👓</Text>
              <Text style={styles.sectionTitle}>Continue Reading...</Text>
            </View>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {continueReadingBooks.map(renderContinueReadingItem)}
          </ScrollView>
        </View>

        {/* Additional Books Grid */}
        <View style={styles.additionalBooksGrid}>
          {bookmarkedBooks.map((book, index) => (
            <TouchableOpacity
              key={`additional-${book.id}`}
              style={styles.gridBookItem}
              onPress={() => handleBookPress(book.id)}
            >
              <Image source={{ uri: book.cover }} style={styles.gridBookCover} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('community')}
        >
          <Text style={styles.navIcon}>👥</Text>
          <Text style={styles.navLabel}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('library')}
        >
          <Text style={styles.navIcon}>📚</Text>
          <Text style={[styles.navLabel, styles.libraryNavLabel]}>Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B35',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookmarkIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
  glassesIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333333',
  },
  viewAllButton: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  bookmarkItem: {
    marginRight: 15,
  },
  bookCoverContainer: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    textAlign: 'center',
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  continueReadingItem: {
    marginRight: 15,
    width: 120,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressPercentage: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333333',
  },
  progressPage: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666666',
    marginTop: 2,
  },
  progressBarContainer: {
    marginTop: 8,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  additionalBooksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridBookItem: {
    width: '30%',
    marginBottom: 15,
  },
  gridBookCover: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666666',
  },
  activeNavLabel: {
    color: '#333333',
    fontFamily: 'Bogart-Bold-Trial',
  },
  libraryNavLabel: {
    color: '#FF6B35',
    fontFamily: 'Bogart-Bold-Trial',
  },
});

export default HomeScreen;