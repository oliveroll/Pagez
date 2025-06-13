import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onUserPress: (userId: string) => void;
  onBookPress?: (bookId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onUserPress,
  onBookPress,
}) => {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getTypeIcon = () => {
    switch (post.type) {
      case 'book-review':
        return 'book-outline';
      case 'quote':
        return 'chatbubble-ellipses-outline';
      case 'recommendation':
        return 'heart-outline';
      default:
        return 'chatbubble-outline';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={() => onUserPress(post.userId)}
        >
          <Image 
            source={{ uri: post.user.profilePicture || 'https://via.placeholder.com/40' }} 
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{post.user.displayName}</Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.postTypeContainer}>
          <Ionicons name={getTypeIcon()} size={16} color="#666" />
        </View>
      </View>

      {/* Book info if post is linked to a book */}
      {post.book && onBookPress && (
        <TouchableOpacity 
          style={styles.bookInfo}
          onPress={() => onBookPress(post.book!.id)}
        >
          <Image 
            source={typeof post.book.coverUrl === 'string' ? { uri: post.book.coverUrl } : post.book.coverUrl} 
            style={styles.bookCover}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{post.book.title}</Text>
            <Text style={styles.bookAuthor}>by {post.book.author}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Post content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Post image if exists */}
      {post.imageUrl && (
        <Image 
          source={{ uri: post.imageUrl }} 
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <Ionicons 
            name={post.isLiked ? 'heart' : 'heart-outline'} 
            size={20} 
            color={post.isLiked ? '#EB4D2A' : '#666'} 
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onComment(post.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Bogart-Semibold-trial',
    color: '#1E1E1E',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666',
    marginTop: 2,
  },
  postTypeContainer: {
    padding: 8,
  },
  bookInfo: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  bookCover: {
    width: 50,
    height: 70,
    borderRadius: 4,
    marginRight: 12,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Semibold-trial',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666',
  },
  content: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    color: '#1E1E1E',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Bogart-Medium-trial',
    color: '#4A90E2',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Medium-trial',
    color: '#666',
    marginLeft: 6,
  },
  likedText: {
    color: '#EB4D2A',
  },
}); 