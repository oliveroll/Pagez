import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock data - Replace with API calls
const bookData = {
  title: 'Beloved Girls',
  author: 'Sara Shepard',
  coverImage: 'https://via.placeholder.com/200x300/1a4480/ffffff?text=Book+Cover',
  pages: 189,
  level: 'Moderate',
  genre: 'Horror',
  series: 'Stories',
  rating: 4.4,
  dailyReaders: '5.8k',
  description: 'Set in the suburbs of Rosewood, Pennsylvania, the series follows the lives of four teenage girls nicknamed the Pretty Little Liars or simply the Liars, whose clique falls apart after the disappearance of their queen bee leader, Alison DiLaurentis.',
  authorThoughts: {
    name: 'Seth Rolins',
    comment: 'I think the book was amazing and took an awesome turn in the end. you have to read it and it\'s a must.',
    subComment: 'let me know your comments about it.',
    likes: '3k',
    comments: 354
  },
  readerThoughts: {
    name: 'Samantha Jackson',
    readingStatus: 'Reading "Pretty Little Liars"',
    comment: 'Fantastic book! #weeklyreadings',
    likes: '3k',
    comments: 354,
    timeAgo: '20 MINS AGO'
  }
};

export default function HomeScreen() {
  const handleBackPress = () => {
    // TODO: Backend developer - implement navigation to previous screen
    router.back();
  };

  const handleBookmarkPress = () => {
    // TODO: Backend developer - implement bookmark functionality
    console.log('Bookmark pressed');
  };

  const handleSharePress = () => {
    // TODO: Backend developer - implement share functionality
    console.log('Share pressed');
  };

  const handleStartReading = () => {
    // TODO: Backend developer - implement reading functionality
    router.push('/reading' as any);
  };

  const handleCommunityPress = () => {
    // TODO: Backend developer - navigate to community page
    router.push('/community');
  };

  const handleCreatePostPress = () => {
    // TODO: Backend developer - navigate to create post page
    router.push('/create-post' as any);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, i < fullStars ? styles.starFilled : styles.starEmpty]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBookmarkPress}>
            <Ionicons name="bookmark-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSharePress}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Book Cover */}
        <View style={styles.bookCoverContainer}>
          <Image source={{ uri: bookData.coverImage }} style={styles.bookCover} />
        </View>

        {/* Book Info */}
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{bookData.title}</Text>
          <Text style={styles.bookAuthor}>by {bookData.author}</Text>
        </View>

        {/* Book Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{bookData.pages}</Text>
            <Text style={styles.statLabel}>Pages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{bookData.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{bookData.genre}</Text>
            <Text style={styles.statLabel}>Genre</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{bookData.series}</Text>
            <Text style={styles.statLabel}>Series</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingLeft}>
            <View style={styles.starsContainer}>
              {renderStars(bookData.rating)}
            </View>
            <Text style={styles.ratingText}>{bookData.rating} Rating</Text>
          </View>
          <View style={styles.ratingRight}>
            <Text style={styles.dailyReaders}>{bookData.dailyReaders}</Text>
            <Text style={styles.dailyReadersLabel}>Daily Readers</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{bookData.description}</Text>

        {/* Author's Thoughts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Author's thoughts</Text>
          <View style={styles.thoughtCard}>
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Text style={styles.avatarText}>SR</Text>
              </View>
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>{bookData.authorThoughts.name}</Text>
                <Text style={styles.authorBadge}>✦ Author</Text>
              </View>
            </View>
            <Text style={styles.thoughtText}>{bookData.authorThoughts.comment}</Text>
            <Text style={styles.thoughtSubText}>{bookData.authorThoughts.subComment}</Text>
            <View style={styles.thoughtActions}>
              <View style={styles.actionItem}>
                <Ionicons name="heart-outline" size={18} color="#666" />
                <Text style={styles.actionText}>{bookData.authorThoughts.likes}</Text>
              </View>
              <View style={styles.actionItem}>
                <Ionicons name="chatbubble-outline" size={18} color="#666" />
                <Text style={styles.actionText}>{bookData.authorThoughts.comments}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reader's Thoughts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reader's thoughts</Text>
          <View style={styles.readerCard}>
            <View style={styles.readerHeader}>
              <View style={styles.readerAvatar}>
                <Text style={styles.avatarText}>SJ</Text>
              </View>
              <View style={styles.readerInfo}>
                <Text style={styles.readerName}>{bookData.readerThoughts.name}</Text>
                <Text style={styles.readerStatus}>{bookData.readerThoughts.readingStatus}</Text>
              </View>
            </View>
            <View style={styles.readerImageContainer}>
              <Image source={{ uri: bookData.coverImage }} style={styles.readerBookImage} />
            </View>
            <Text style={styles.readerComment}>{bookData.readerThoughts.comment}</Text>
            <View style={styles.readerActions}>
              <View style={styles.actionItem}>
                <Ionicons name="heart-outline" size={18} color="#666" />
                <Text style={styles.actionText}>{bookData.readerThoughts.likes}</Text>
              </View>
              <View style={styles.actionItem}>
                <Ionicons name="chatbubble-outline" size={18} color="#666" />
                <Text style={styles.actionText}>{bookData.readerThoughts.comments}</Text>
              </View>
              <Text style={styles.timeAgo}>{bookData.readerThoughts.timeAgo}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.communityButton} onPress={handleCommunityPress}>
            <Text style={styles.communityButtonText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePostPress}>
            <Text style={styles.createPostButtonText}>Create Post</Text>
          </TouchableOpacity>
        </View>

        {/* Reading Buttons */}
        <View style={styles.readingButtons}>
          <TouchableOpacity style={styles.blurbButton}>
            <Text style={styles.blurbButtonText}>Blurb</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startReadingButton} onPress={handleStartReading}>
            <Text style={styles.startReadingButtonText}>Start reading</Text>
            <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>

        {/* Bottom padding for scroll */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5722',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FF5722',
  },
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bookCoverContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  bookCover: {
    width: 160,
    height: 240,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF5722',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ratingLeft: {
    flex: 1,
    backgroundColor: '#FFF0E6',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  ratingRight: {
    flex: 1,
    backgroundColor: '#FFF0E6',
    padding: 15,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  starFilled: {
    color: '#FF5722',
  },
  starEmpty: {
    color: '#DDD',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  dailyReaders: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF5722',
    marginBottom: 2,
  },
  dailyReadersLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#999',
    marginBottom: 15,
  },
  thoughtCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FF5722',
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
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#000',
    marginBottom: 2,
  },
  authorBadge: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FF5722',
  },
  thoughtText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  thoughtSubText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    lineHeight: 20,
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
  actionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  readerCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  readerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  readerInfo: {
    flex: 1,
  },
  readerName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#000',
    marginBottom: 2,
  },
  readerStatus: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  readerImageContainer: {
    marginBottom: 15,
  },
  readerBookImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },
  readerComment: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#000',
    marginBottom: 15,
  },
  readerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#999',
    marginLeft: 'auto',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  communityButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  communityButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  createPostButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  createPostButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  readingButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  blurbButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  blurbButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
  },
  startReadingButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startReadingButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  bottomPadding: {
    height: 30,
  },
});