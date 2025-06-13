import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useBooks } from '../src/context/BooksContext';
import { MOCK_POSTS, MOCK_AUTHORS } from '../src/constants/mockData';
import { COLORS } from '../src/constants/colors';
import { formatRelativeTime } from '../src/utils/formatters';
import { TabBar } from '../src/components/TabBar';

const { width: screenWidth } = Dimensions.get('window');

// Search icon SVG
const SearchIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 22L20 20" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Attention Fire SVG (cleaned up version)
const AttentionFireIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1422 11.6675C10.2983 12.488 8.87735 12.263 8.34353 11.2265L7.71407 9.9995C6.61713 11.066 6 12.5135 6 14.024V14.1665C6 17.3885 8.68604 20 12 20C15.314 20 18 17.3885 18 14.1665C18 12.5855 17.2641 11.09 15.9974 10.0985L15.0671 9.3695C14.126 8.6315 13.4672 7.607 13.1988 6.461L12.8563 5C11.2502 6.5615 10.5528 8.801 10.9987 10.967L11.1422 11.6675Z" fill="#FE772A" fill-opacity="0.22" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Define SVG strings directly
const thumbsUpSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8_289)">
<path d="M6.944 19H5.056C4.473 19 4 18.527 4 17.944V10.556C4 9.973 4.473 9.5 5.056 9.5H6.944C7.527 9.5 8 9.973 8 10.556V17.944C8 18.527 7.527 19 6.944 19Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.5719L11.649 5.82094C12.328 4.93594 13.654 4.91394 14.363 5.77494C14.628 6.09594 14.772 6.49994 14.772 6.91594V10.1869H17.868C18.469 10.1869 19.03 10.4869 19.364 10.9859L19.693 11.4769C19.988 11.9179 20.074 12.4669 19.927 12.9759L18.568 17.6979C18.346 18.4689 17.641 18.9999 16.839 18.9999H10.55C10.05 18.9999 9.572 18.7919 9.232 18.4259L8 17.0999" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8_289">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const chatBubbleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8_300)">
<path d="M15.5 14.5H8.5" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 10.5H15.5" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.151 16.396C3.421 15.096 3 13.598 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C10.402 21 8.904 20.579 7.604 19.849L3 21L4.151 16.396Z" stroke="#1E1E1E" stroke-width="1.5882" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8_300">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

export default function CommunityScreen() {
  const { books, trending, isLoading } = useBooks();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary[500]} />
        <Text style={{ marginTop: 10, color: COLORS.text.secondary }}>Loading community...</Text>
      </View>
    );
  }

  const renderStars = (rating: number, maxRating: number) => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? '#FF6B35' : '#DDD'}
        />
      );
    }
    return stars;
  };

  const renderBookCard = (book: any, index: number) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCard}
      onPress={() => router.push('/book-more' as any)}
    >
      <Image source={typeof book.coverUrl === 'string' ? { uri: book.coverUrl } : book.coverUrl} style={styles.bookCover} />
      {index === 1 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>1</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderCommunityPost = (post: any) => (
    <View key={post.id} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => router.push('/home' as any)}
        >
          <Image source={{ uri: post.user.profilePicture }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.displayName}</Text>
            <Text style={styles.userActivity}>@{post.user.username}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/home' as any)}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postText}>{post.content}</Text>

      {/* Only show book info if the post has a book */}
      {post.book && (
        <View style={styles.postContent}>
          <View style={styles.bookInfo}>
            <Image source={typeof post.book.coverUrl === 'string' ? { uri: post.book.coverUrl } : post.book.coverUrl} style={styles.smallBookCover} />
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle}>{post.book.title}</Text>
              <Text style={styles.bookAuthor}>by {post.book.author}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {renderStars(Math.floor(post.book.rating), 5)}
                </View>
                <Text style={styles.ratingText}>{post.book.rating}/5</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={styles.postFooter}>
        <View style={styles.engagement}>
          <View style={styles.engagementButton}>
            <SvgXml xml={thumbsUpSvg} width={18} height={18} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '500',
              color: '#333',
              marginLeft: 4,
            }}>3k</Text>
          </View>
          <View style={styles.engagementButton}>
            <SvgXml xml={chatBubbleSvg} width={18} height={18} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '500',
              color: '#333',
              marginLeft: 4,
            }}>354</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{new Date(post.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  const renderAuthorPost = (author: any, index: number) => {
    // Only render the first author
    if (index > 0) return null;
    
    return (
      <View key={author.id} style={styles.authorContainer}>
        <View style={styles.authorInfo}>
          <Image 
            source={require('../src/assets/images/Book_details/Authors thoughts/profile.jpg')} 
            style={styles.authorAvatar} 
          />
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>Seth Rolins</Text>
            <View style={styles.authorBadgeContainer}>
              <Text style={styles.authorStarText}>★</Text>
              <Text style={styles.authorBadge}>Author</Text>
            </View>
          </View>
        </View>
        <Text style={styles.authorThoughtText}>
          I think the book was amazing and took an awesome turn in the end. you have to read it and it's a must.{'\n\n'}let me know your comments about it.
        </Text>
        <View style={styles.thoughtActions}>
          <View style={styles.actionItem}>
            <SvgXml xml={thumbsUpSvg} width={18} height={18} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '500',
              color: '#333',
              marginLeft: 4,
            }}>3k</Text>
          </View>
          <View style={styles.actionItem}>
            <SvgXml xml={chatBubbleSvg} width={18} height={18} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '500',
              color: '#333',
              marginLeft: 4,
            }}>354</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pagezLogo}>pagez</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/search')}>
            <SvgXml xml={SearchIcon} width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setShowProfileMenu(!showProfileMenu)}
          >
            <Image 
              source={require('../src/assets/images/homepage/profile.jpg')} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Dropdown Menu */}
      {showProfileMenu && (
        <View style={styles.profileMenuContainer}>
          <View style={styles.profileMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Followings</Text>
              <Text style={styles.menuItemCount}>2.1K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Followers</Text>
              <Text style={styles.menuItemCount}>234</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>My posts</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/profile')}
            >
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Hot Topics Section */}
      <View style={styles.hotTopicsSection}>
        <TouchableOpacity
          style={styles.hotTopicsHeader}
          onPress={() => router.push('/home' as any)}
        >
          <Text style={styles.hotTopicsTitle}>Hot topics</Text>
          <Ionicons name="chevron-up" size={20} color="#1E1E1E" />
        </TouchableOpacity>
      </View>

      {/* Activity Sections */}
      <View style={styles.activitiesInHeader}>
        <TouchableOpacity style={styles.activitySection}>
          <Text style={styles.activityTitle}>Following Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.activitySection}>
          <Text style={styles.activityTitle}>My Activities</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hot in Community Section */}
          <View style={styles.hotCommunitySection}>
            <View style={styles.hotCommunityHeader}>
              <SvgXml xml={AttentionFireIcon} width={24} height={24} />
              <Text style={styles.hotCommunityText}>Hot in community</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.booksScroll}>
              <View style={styles.booksContainer}>
                {trending.slice(0, 5).map(renderBookCard)}
              </View>
            </ScrollView>
          </View>

          {/* Community Posts */}
          <View style={styles.section}>
            {MOCK_POSTS.map(renderCommunityPost)}
          </View>

          {/* New Authors Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>New Authors Joined!</Text>
            {MOCK_AUTHORS.map(renderAuthorPost)}
          </View>
        </ScrollView>

        {/* Gradient Blur Overlay */}
        <View style={styles.gradientOverlay} />
      </View>

      {/* Bottom Navigation */}
      <TabBar />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/home' as any)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  pagezLogo: {
    fontSize: 36,
    fontFamily: 'Bogart-Bold-trial',
    color: '#EB4D2A',
    fontWeight: 'normal',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  hotTopicsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  hotTopicsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotTopicsTitle: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.8,
  },
  activitiesInHeader: {
    paddingHorizontal: 20,
  },
  activitySection: {
    marginBottom: 16,
  },
  activityTitle: {
    color: '#ABB0BA',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.8,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F4EFEA',
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  hotCommunitySection: {
    marginBottom: 20,
  },
  hotCommunityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 12,
  },
  hotCommunityText: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.8,
  },
  section: {
    marginBottom: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    color: '#999',
    marginBottom: 15,
  },
  booksScroll: {
    paddingLeft: 20,
  },
  booksContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingRight: 20,
  },
  bookCard: {
    position: 'relative',
    marginBottom: 10,
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Bogart-Bold-Trial',
  },
  postContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  userActivity: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  postContent: {
    position: 'relative',
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  smallBookCover: {
    width: 40,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  postText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginBottom: 15,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagement: {
    flexDirection: 'row',
    gap: 20,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  engagementText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
  },
  authorContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EB4D2A',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#000',
    marginBottom: 2,
  },
  authorBadgeContainer: {
    flexDirection: 'row',
    padding: 2,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(235, 77, 42, 0.20)',
    alignSelf: 'flex-start',
  },
  authorStarText: {
    color: '#EB4D2A',
    fontSize: 10,
    marginRight: 1,
  },
  authorBadge: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-trial',
    color: '#EB4D2A',
  },
  authorThoughtText: {
    color: '#404040',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.64,
    marginBottom: 15,
  },
  thoughtActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  bookDetails: {
    flex: 1,
    marginLeft: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 4,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#F4EFEA',
    opacity: 0.8,
    // Note: React Native doesn't support CSS filter/backdrop-filter directly
    // We're using a combination of opacity and shadow to create a similar effect
    shadowColor: '#F4EFEA',
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 20,
  },
  profileMenuContainer: {
    position: 'absolute',
    top: 120,
    right: 20,
    zIndex: 1000,
  },
  profileMenu: {
    width: 244,
    height: 195,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.22)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 64.815 },
    shadowOpacity: 0.03,
    shadowRadius: 46.852,
    elevation: 10,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#000',
  },
  menuItemCount: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#999',
  },
});