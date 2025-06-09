import React from 'react';
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
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBooks } from '../src/context/BooksContext';
import { MOCK_POSTS, MOCK_AUTHORS } from '../src/constants/mockData';
import { COLORS } from '../src/constants/colors';
import { formatRelativeTime } from '../src/utils/formatters';

const { width: screenWidth } = Dimensions.get('window');

export default function CommunityScreen() {
  const { books, trending, isLoading } = useBooks();

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
      <Image source={{ uri: book.coverUrl || book.cover }} style={styles.bookCover} />
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
            <Image source={{ uri: post.book.coverUrl }} style={styles.smallBookCover} />
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
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/home' as any)}
          >
            <Ionicons name={post.isLiked ? "heart" : "heart-outline"} size={18} color={post.isLiked ? "#FF6B35" : "#666"} />
            <Text style={styles.engagementText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/home' as any)}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{post.commentsCount}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeAgo}>{new Date(post.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  const renderAuthorPost = (author: any) => (
    <View key={author.id} style={styles.authorContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => router.push('/home' as any)}
        >
          <Image source={{ uri: author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{author.name}</Text>
            <Text style={styles.authorBadge}>⭐ Author</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/home' as any)}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Text style={styles.authorPost}>{author.post}</Text>
      <Text style={styles.authorEngagement}>{author.engagement}</Text>

      <View style={styles.postFooter}>
        <View style={styles.engagement}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/home' as any)}
          >
            <Ionicons name="heart-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{author.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/home' as any)}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{author.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>pagez</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hot Topics Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => router.push('/home' as any)}
          >
            <Text style={styles.sectionTitle}>Hot topics</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <View style={styles.hotCommunityHeader}>
            <Ionicons name="flame" size={16} color="#FF6B35" />
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
        <View style={styles.section}>
          <Text style={styles.newAuthorsTitle}>New Authors Joined!</Text>
          {MOCK_AUTHORS.map(renderAuthorPost)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={24} color="#666" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/community')}
        >
          <Ionicons name="people" size={24} color="#FF6B35" />
          <Text style={[styles.navText, styles.activeNavTextOrange]}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/library')}
        >
          <Ionicons name="library" size={24} color="#666" />
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/home' as any)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B35',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  hotCommunityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 8,
  },
  hotCommunityText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
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
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FF6B35',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  authorBadge: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF6B35',
  },
  authorPost: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  authorEngagement: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 15,
  },
  newAuthorsTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  activeNavText: {
    color: '#333',
  },
  activeNavTextOrange: {
    color: '#FF6B35',
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
});