import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Replace with real API calls
const mockAuthorData = {
  name: 'J. K. Rowling',
  username: '@jkr',
  bio: 'Writer of Harry Potter and many more series, you know what. Writer sometimes known as Robert Galbraith',
  profileImage: 'https://via.placeholder.com/120x120', // Replace with actual image
  stats: {
    books: 5,
    posts: 145,
    followers: 8900, // 8.9K
  },
  isFollowing: true,
};

const mockBooks = [
  {
    id: 1,
    title: 'The Martian',
    author: 'Andy Weir',
    cover: 'https://via.placeholder.com/120x180/FF6B35/FFFFFF?text=THE+MARTIAN',
  },
  {
    id: 2,
    title: 'Italo Calvino',
    author: 'Oscar Mondadori',
    cover: 'https://via.placeholder.com/120x180/DC143C/FFFFFF?text=ITALO+CALVINO',
  },
  {
    id: 3,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    cover: 'https://via.placeholder.com/120x180/4169E1/FFFFFF?text=HARRY+POTTER',
  },
];

const mockTabs = ['Books', 'Notes', 'Community', 'You'];

export default function AuthorProfileScreen() {
  const handleBackPress = () => {
    // TODO: Implement navigation back
    router.back();
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleTabPress = (tab: string) => {
    router.push(`/${tab.toLowerCase()}` as any);
  };

  const handleFollowPress = () => {
    // TODO: Implement follow/unfollow API call
    console.log('Follow button pressed');
  };

  const handleBookPress = (bookId: number) => {
    router.push(`/book/${bookId}` as any);
  };

  const handleViewAllBooks = () => {
    router.push('/books' as any);
  };

  const formatFollowerCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4169E1" />
      
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
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: mockAuthorData.profileImage }} 
              style={styles.headerProfileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {mockTabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[
              styles.tab,
              tab === 'You' && styles.activeTab
            ]}
          >
            <Text style={[
              styles.tabText,
              tab === 'You' && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>This is how readers view your profile:</Text>
          
          <View style={styles.authorCard}>
            {/* Decorative papers */}
            <View style={styles.decorativePapers}>
              <View style={[styles.paper, styles.paper1]} />
              <View style={[styles.paper, styles.paper2]} />
              <View style={[styles.paper, styles.paper3]} />
              <View style={[styles.paper, styles.paper4]} />
            </View>
            
            {/* Pagez branding */}
            <View style={styles.brandingContainer}>
              <Text style={styles.pagezText}>pagez</Text>
              <Text style={styles.authorCardText}>AUTHOR CARD</Text>
            </View>
            
            {/* Author info */}
            <View style={styles.authorInfo}>
              <Image 
                source={{ uri: mockAuthorData.profileImage }} 
                style={styles.authorImage}
              />
              
              <Text style={styles.authorName}>{mockAuthorData.name}</Text>
              <Text style={styles.authorUsername}>{mockAuthorData.username}</Text>
              <Text style={styles.authorBio}>{mockAuthorData.bio}</Text>
              
              <TouchableOpacity 
                style={styles.followButton}
                onPress={handleFollowPress}
              >
                <Text style={styles.followButtonText}>
                  {mockAuthorData.isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
              
              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="book-outline" size={24} color="white" />
                  <Text style={styles.statNumber}>{mockAuthorData.stats.books}</Text>
                  <Text style={styles.statLabel}>Books</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Ionicons name="chatbubble-outline" size={24} color="white" />
                  <Text style={styles.statNumber}>{mockAuthorData.stats.posts}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={24} color="white" />
                  <Text style={styles.statNumber}>{formatFollowerCount(mockAuthorData.stats.followers)}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Books Section */}
        <View style={styles.booksSection}>
          <View style={styles.booksSectionHeader}>
            <View style={styles.booksHeaderLeft}>
              <Ionicons name="book" size={20} color="#FF4444" />
              <Text style={styles.booksSectionTitle}>Books</Text>
            </View>
            <TouchableOpacity onPress={handleViewAllBooks}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.booksScrollView}
          >
            {mockBooks.map((book) => (
              <TouchableOpacity
                key={book.id}
                onPress={() => handleBookPress(book.id)}
                style={styles.bookItem}
              >
                <Image source={{ uri: book.cover }} style={styles.bookCover} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
  },
  profileButton: {
    padding: 2,
  },
  headerProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tabContainer: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
  },
  activeTabText: {
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Bogart-Regular-Trial',
    marginBottom: 16,
  },
  authorCard: {
    backgroundColor: '#4169E1',
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativePapers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paper: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  paper1: {
    width: 60,
    height: 80,
    top: 20,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  paper2: {
    width: 50,
    height: 70,
    top: 30,
    right: 30,
    transform: [{ rotate: '20deg' }],
  },
  paper3: {
    width: 40,
    height: 60,
    bottom: 100,
    left: 30,
    transform: [{ rotate: '10deg' }],
  },
  paper4: {
    width: 55,
    height: 75,
    bottom: 80,
    right: 20,
    transform: [{ rotate: '-25deg' }],
  },
  brandingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  pagezText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
  },
  authorCardText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    letterSpacing: 1,
  },
  authorInfo: {
    alignItems: 'center',
    zIndex: 1,
  },
  authorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  authorName: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authorUsername: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    marginBottom: 12,
  },
  authorBio: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  followButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 32,
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
  },
  booksSection: {
    padding: 16,
    paddingTop: 0,
  },
  booksSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  booksHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  booksSectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    letterSpacing: 1,
  },
  booksScrollView: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  bookItem: {
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
});