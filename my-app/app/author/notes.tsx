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

// Mock data - Replace with real API calls
const mockAuthorPosts = [
  {
    id: 1,
    author: {
      name: 'Seth Rolins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isAuthor: true,
    },
    content: "I think the book was amazing and took an awesome turn in the end. you have to read it and it's a must.\n\nlet me know your comments about it.",
    likes: 3000,
    comments: 354,
  },
  {
    id: 2,
    author: {
      name: 'Seth Rolins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isAuthor: true,
    },
    content: "I think the book was amazing and took an awesome turn in the end. you have to read it and it's a must.\n\nlet me know your comments about it.",
    likes: 3000,
    comments: 354,
  },
];

const mockUserAvatar = 'https://images.unsplash.com/photo-1494790108755-2616b6cfd7c3?w=100&h=100&fit=crop&crop=face';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = React.useState('Notes');

  const handleBackPress = () => {
    // TODO: Navigate back to previous screen
    router.back();
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleProfilePress = () => {
    router.push('/profile' as any);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    // TODO: Implement tab navigation logic
    // router.push(`/${tab.toLowerCase()}`);
  };

  const handlePostLike = (postId: number) => {
    // TODO: Implement like functionality with API call
    console.log('Like post:', postId);
  };

  const handlePostComment = (postId: number) => {
    router.push(`/post/${postId}/comments` as any);
  };

  const handleCreateNote = () => {
    router.push('/create-note' as any);
  };

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          {post.author.isAuthor && (
            <View style={styles.authorBadge}>
              <Ionicons name="star" size={12} color="#FF6B35" />
              <Text style={styles.authorBadgeText}>Author</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.postMenu}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Text style={styles.postText}>{post.content}</Text>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handlePostLike(post.id)}
        >
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.likes >= 1000 ? `${Math.floor(post.likes / 1000)}k` : post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handlePostComment(post.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Author's Space</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSettingsPress} style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Image source={{ uri: mockUserAvatar }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {['Dashboard', 'Books', 'Notes', 'Community', 'You'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.postsContainer}>
          {mockAuthorPosts.map(renderPost)}
        </View>

        {/* Create Note Button */}
        <View style={styles.createNoteContainer}>
          <TouchableOpacity style={styles.createNoteButton} onPress={handleCreateNote}>
            <Image source={{ uri: mockUserAvatar }} style={styles.createNoteAvatar} />
            <View style={styles.createNoteContent}>
              <Text style={styles.createNoteText}>Create a note</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4A90E2',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileButton: {
    padding: 2,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
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
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  postsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 4,
  },
  authorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0ED',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  authorBadgeText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF6B35',
  },
  postMenu: {
    padding: 8,
  },
  postContent: {
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 24,
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  createNoteContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  createNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createNoteAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  createNoteContent: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  createNoteText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
  },
});

// TODO: Backend Integration Points
// 1. Replace mockAuthorPosts with API call: GET /api/author-posts
// 2. Replace mockUserAvatar with user's actual profile image from auth context
// 3. Implement handlePostLike with API call: POST /api/posts/{id}/like
// 4. Implement handlePostComment navigation to comments screen
// 5. Implement handleCreateNote navigation to create post screen
// 6. Add real-time updates for likes/comments using WebSocket or polling
// 7. Implement tab navigation with proper routing and data fetching
// 8. Add pull-to-refresh functionality for posts
// 9. Implement infinite scroll for posts pagination
// 10. Add error handling and loading states for all API calls