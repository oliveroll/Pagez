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
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Replace with API calls
const mockBooks = [
  {
    id: '1',
    title: 'The Martian',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Italo Calvino',
    subtitle: 'Collezione di sabbia',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Harry Potter',
    subtitle: 'Chamber of Secrets',
    author: 'J.K. Rowling',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=200&h=300&fit=crop',
  },
];

const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Samantha Jackson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      currentBook: 'Pretty Little Liars',
    },
    book: {
      title: 'Love at First',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
    },
    rating: 3,
    maxRating: 5,
    text: 'Fantastic book! #weeklyreadings',
    likes: '3k',
    comments: '354',
    timeAgo: '20 MINS AGO',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
  },
];

const mockAuthors = [
  {
    id: '1',
    name: 'Seth Rolins',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    isAuthor: true,
    post: 'I think the book was amazing and took an awesome turn in the end. you have to read it and it\'s a must.',
    engagement: 'let me know your comments about it.',
    likes: '3k',
    comments: '354',
  },
];

export default function HomeScreen() {
  // TODO: Replace with actual API calls
  const fetchBooks = () => {
    // API call to get trending books
  };

  const fetchCommunityPosts = () => {
    // API call to get community posts
  };

  const fetchAuthors = () => {
    // API call to get new authors
  };

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
      onPress={() => router.push(`/book/${book.id}`)}
    >
      <Image source={{ uri: book.cover }} style={styles.bookCover} />
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
          onPress={() => router.push(`/profile/${post.user.name}`)}
        >
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.userActivity}>Reading "{post.user.currentBook}"</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/post-options')}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Image source={{ uri: post.image }} style={styles.postImage} />
        <View style={styles.bookInfo}>
          <Image source={{ uri: post.book.cover }} style={styles.smallBookCover} />
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(post.rating, post.maxRating)}
            </View>
            <Text style={styles.ratingText}>{post.rating}/{post.maxRating}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.postText}>{post.text}</Text>

      <View style={styles.postFooter}>
        <View style={styles.engagement}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/like-post')}
          >
            <Ionicons name="heart-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/comments')}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </View>
  );

  const renderAuthorPost = (author: any) => (
    <View key={author.id} style={styles.authorContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => router.push(`/author/${author.id}`)}
        >
          <Image source={{ uri: author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{author.name}</Text>
            <Text style={styles.authorBadge}>⭐ Author</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/post-options')}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Text style={styles.authorPost}>{author.post}</Text>
      <Text style={styles.authorEngagement}>{author.engagement}</Text>

      <View style={styles.postFooter}>
        <View style={styles.engagement}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/like-post')}
          >
            <Ionicons name="heart-outline" size={18} color="#666" />
            <Text style={styles.engagementText}>{author.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => router.push('/comments')}
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
            onPress={() => router.push('/hot-topics')}
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
              {mockBooks.map(renderBookCard)}
            </View>
          </ScrollView>
        </View>

        {/* Community Posts */}
        <View style={styles.section}>
          {mockPosts.map(renderCommunityPost)}
        </View>

        {/* New Authors Section */}
        <View style={styles.section}>
          <Text style={styles.newAuthorsTitle}>New Authors Joined!</Text>
          {mockAuthors.map(renderAuthorPost)}
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
        onPress={() => router.push('/create-post')}
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
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  smallBookCover: {
    width: 40,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  ratingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
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
});