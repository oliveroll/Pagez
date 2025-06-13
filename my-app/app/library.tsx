import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';
import { TabBar } from '../src/components/TabBar';
import { useAuth } from '../src/context/AuthContext';
import { readingListsService, readingProgressService, booksService } from '../src/services';
import { ReadingList, ReadingProgress, Book } from '../src/types';
import { COLORS } from '../src/constants/colors';

// SVG Icons
const BookmarkIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill="#EB4D2A" stroke="#EB4D2A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const SearchIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 19L15.71 15.71" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const LibraryScreen = () => {
  const { user } = useAuth();
  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [currentlyReading, setCurrentlyReading] = useState<ReadingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (user) {
      loadLibraryData();
    }
  }, [user]);

  const loadLibraryData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load reading lists
      const listsResponse = await readingListsService.getUserReadingLists(user.id);
      if (listsResponse.success) {
        setReadingLists(listsResponse.data);
      }

      // Load currently reading
      const currentlyReadingResponse = await readingProgressService.getCurrentlyReading(user.id);
      if (currentlyReadingResponse.success) {
        setCurrentlyReading(currentlyReadingResponse.data);
      }
    } catch (error) {
      console.error('Error loading library data:', error);
    } finally {
      setLoading(false);
    }
  };

  const BookCard = ({ bookId, progress }: { bookId: string; progress?: ReadingProgress }) => {
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
      loadBook();
    }, [bookId]);

    const loadBook = async () => {
      try {
        const response = await booksService.getBookById(bookId);
        if (response.success) {
          setBook(response.data);
        }
      } catch (error) {
        console.error('Error loading book:', error);
      }
    };

    if (!book) {
      return (
        <View style={styles.bookCardLoading}>
          <ActivityIndicator size="small" color="#EB4D2A" />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.bookCard}
        onPress={() => router.push({
          pathname: '/book-more',
          params: { bookId: book.id }
        })}
      >
        <Image source={typeof book.coverUrl === 'string' ? { uri: book.coverUrl } : book.coverUrl} style={styles.bookCover} />
        {progress && (
          <View style={styles.progressOverlay}>
            <Text style={styles.progressText}>{progress.percentage}%</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EB4D2A" />
          <Text style={styles.loadingText}>Loading your library...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>pagez</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/search')} style={styles.headerButton}>
            <SvgXml xml={SearchIcon} width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowProfileMenu(!showProfileMenu)}>
            <Image 
              source={user?.profilePicture ? { uri: user.profilePicture } : require('../src/assets/images/homepage/profile.jpg')}
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

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* Reading Lists Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <SvgXml xml={BookmarkIcon} width={24} height={24} />
              <Text style={styles.sectionTitle}>My Reading Lists</Text>
            </View>
          </View>
          
          {readingLists.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {readingLists.map((list) => (
                <TouchableOpacity key={list.id} style={styles.readingListCard}>
                  <View style={styles.listCoverGrid}>
                    {list.coverImages.slice(0, 4).map((coverUrl, index) => (
                      <Image
                        key={index}
                        source={typeof coverUrl === 'string' ? { uri: coverUrl } : coverUrl}
                        style={styles.listCoverThumbnail}
                      />
                    ))}
                  </View>
                  <Text style={styles.listTitle} numberOfLines={2}>{list.name}</Text>
                  <Text style={styles.listBooksCount}>{list.totalBooks} books</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No reading lists yet</Text>
            </View>
          )}
        </View>

        {/* Continue Reading Section */}
        {currentlyReading.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Reading</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {currentlyReading.map((progress) => (
                <BookCard key={progress.id} bookId={progress.bookId} progress={progress} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      <TabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 36,
    fontFamily: 'Bogart-Bold-trial',
    color: '#EB4D2A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
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
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-trial',
    color: '#1E1E1E',
  },
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  readingListCard: {
    width: 120,
    marginRight: 15,
  },
  listCoverGrid: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  listCoverThumbnail: {
    width: '50%',
    height: '50%',
  },
  listTitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
    marginTop: 8,
  },
  listBooksCount: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
    marginTop: 2,
  },
  bookCard: {
    width: 100,
    marginRight: 15,
    position: 'relative',
  },
  bookCardLoading: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bookCover: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  progressOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(235, 77, 42, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 10,
    fontFamily: 'Bogart-Medium-trial',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#666666',
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

export default LibraryScreen; 