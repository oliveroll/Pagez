import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';
import { useBooks } from '../src/context/BooksContext';
import { useAuth } from '../src/context/AuthContext';
import { COLORS } from '../src/constants/colors';
import { formatProgress } from '../src/utils/formatters';
import { TabBar } from '../src/components/TabBar';
import { booksService, readingProgressService } from '../src/services';
import { Book, ReadingProgress } from '../src/types';

const { width } = Dimensions.get('window');

// Book background SVG for paper effect
const BookBackgroundSvg = `<svg width="114" height="165" viewBox="0 0 114 165" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.74">
<rect x="2" y="4" width="112" height="157" rx="4" fill="#F4F4F4"/>
<rect x="2.5" y="4.5" width="111" height="156" rx="3.5" stroke="black" stroke-opacity="0.19"/>
</g>
<rect width="112" height="165" rx="4" fill="#F4F4F4"/>
<rect x="0.5" y="0.5" width="111" height="164" rx="3.5" stroke="black" stroke-opacity="0.19"/>
</svg>`;

// Import SVG icons as strings
const AttentionFireIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_2650)">
<path d="M11.1422 11.6675C10.2983 12.488 8.87735 12.263 8.34353 11.2265L7.71407 9.9995C6.61713 11.066 6 12.5135 6 14.024V14.1665C6 17.3885 8.68604 20 12 20C15.314 20 18 17.3885 18 14.1665C18 12.5855 17.2641 11.09 15.9974 10.0985L15.0671 9.3695C14.126 8.6315 13.4672 7.607 13.1988 6.461L12.8563 5C11.2502 6.5615 10.5528 8.801 10.9987 10.967L11.1422 11.6675Z" fill="#FE772A" fill-opacity="0.22" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4_2650">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const ThumbsUpIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_2676)">
<path d="M6.944 19H5.056C4.473 19 4 18.527 4 17.944V10.556C4 9.973 4.473 9.5 5.056 9.5H6.944C7.527 9.5 8 9.973 8 10.556V17.944C8 18.527 7.527 19 6.944 19Z" fill="#FE772A" fill-opacity="0.22" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.572L11.649 5.821C12.328 4.936 13.654 4.914 14.363 5.775C14.628 6.096 14.772 6.5 14.772 6.916V10.187H17.868C18.469 10.187 19.03 10.487 19.364 10.986L19.693 11.477C19.988 11.918 20.074 12.467 19.927 12.976L18.568 17.698C18.346 18.469 17.641 19 16.839 19H10.55C10.05 19 9.572 18.792 9.232 18.426L8 17.1" fill="#FE772A" fill-opacity="0.22"/>
<path d="M8 10.572L11.649 5.821C12.328 4.936 13.654 4.914 14.363 5.775C14.628 6.096 14.772 6.5 14.772 6.916V10.187H17.868C18.469 10.187 19.03 10.487 19.364 10.986L19.693 11.477C19.988 11.918 20.074 12.467 19.927 12.976L18.568 17.698C18.346 18.469 17.641 19 16.839 19H10.55C10.05 19 9.572 18.792 9.232 18.426L8 17.1" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4_2676">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const GlassesIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_2663)">
<path d="M20.4749 14.0251C21.8417 15.3919 21.8417 17.608 20.4749 18.9748C19.108 20.3417 16.892 20.3417 15.5251 18.9748C14.1583 17.608 14.1583 15.3919 15.5251 14.0251C16.892 12.6583 19.108 12.6583 20.4749 14.0251Z" fill="#FE772A" fill-opacity="0.22" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.9031 4L19.5741 5.142C20.0561 5.471 20.3701 5.995 20.4341 6.576L21.4641 16" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.47488 14.0251C9.84172 15.3919 9.84172 17.608 8.47488 18.9748C7.10804 20.3417 4.89197 20.3417 3.52513 18.9748C2.15829 17.608 2.15829 15.3919 3.52513 14.0251C4.89197 12.6583 7.10804 12.6583 8.47488 14.0251Z" fill="#FE772A" fill-opacity="0.22" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 16.473C9.5 15.161 10.619 14.098 12 14.098C13.381 14.098 14.5 15.161 14.5 16.473" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.09701 4L4.42601 5.142C3.94401 5.471 3.63001 5.995 3.56701 6.576L2.53601 16" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4_2663">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const ProgressIcon = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 2C8.22227 2 8.93747 2.14226 9.60476 2.41866C10.272 2.69506 10.8784 3.10019 11.3891 3.61091C11.8998 4.12164 12.3049 4.72795 12.5813 5.39524C12.8577 6.06253 13 6.77773 13 7.5C13 8.22227 12.8577 8.93747 12.5813 9.60476C12.3049 10.2721 11.8998 10.8784 11.3891 11.3891C10.8784 11.8998 10.272 12.3049 9.60476 12.5813C8.93747 12.8577 8.22227 13 7.5 13C6.77773 13 6.06253 12.8577 5.39524 12.5813C4.72795 12.3049 4.12163 11.8998 3.61091 11.3891C3.10019 10.8784 2.69506 10.272 2.41866 9.60476C2.14226 8.93747 2 8.22227 2 7.5C2 6.77773 2.14226 6.06253 2.41866 5.39524C2.69506 4.72795 3.10019 4.12163 3.61091 3.61091C4.12164 3.10019 4.72795 2.69506 5.39524 2.41866C6.06254 2.14226 6.77773 2 7.5 2L7.5 2Z" stroke="url(#paint0_linear_8_742)" stroke-width="3"/>
<path d="M7.5 2C8.49465 2 9.47068 2.26973 10.3242 2.78046C11.1777 3.2912 11.8767 4.02383 12.3468 4.90036C12.817 5.77688 13.0406 6.76449 12.9939 7.75804C12.9473 8.75159 12.6321 9.71389 12.0818 10.5425C11.5316 11.3711 10.767 12.035 9.86938 12.4635C8.97176 12.892 7.97475 13.069 6.98448 12.9758C5.99422 12.8826 5.04777 12.5225 4.24589 11.934C3.44402 11.3456 2.81674 10.5506 2.43083 9.6339" stroke="#EB4D2A" stroke-width="3"/>
<defs>
<linearGradient id="paint0_linear_8_742" x1="7.5" y1="-11.4444" x2="7.5" y2="13" gradientUnits="userSpaceOnUse">
<stop stop-color="#4D4F54"/>
<stop offset="1" stop-color="#ABB0BA" stop-opacity="0.13"/>
</linearGradient>
</defs>
</svg>`;

const BookmarkIcon = `<svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H15V19L7.5 13.5399L0 19V0Z" fill="#EB4D2A"/>
<path d="M0 0H15V19L7.5 13.5399L0 19V0Z" fill="url(#paint0_linear_8_717)" fill-opacity="0.1"/>
<defs>
<linearGradient id="paint0_linear_8_717" x1="15" y1="25.9375" x2="15" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0.91311" stop-opacity="0"/>
<stop offset="0.958565" stop-color="white" stop-opacity="0.654555"/>
<stop offset="0.973271"/>
</linearGradient>
</defs>
</svg>`;

// Add the search icon SVG at the top with other SVG imports
const SearchIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_0_1801)">
<path d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 19L15.71 15.71" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_0_1801">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

// Mock data for homepage books using the actual images
const mockContinueReadingData = [
  {
    id: 'dune-progress',
    bookId: 'dune',
    userId: 'mock-user',
    currentPage: 589,
    totalPages: 1200,
    percentage: 49,
    status: 'reading' as const,
    lastReadAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'city-progress',
    bookId: 'city-of-orange',
    userId: 'mock-user',
    currentPage: 156,
    totalPages: 320,
    percentage: 49,
    status: 'reading' as const,
    lastReadAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'moon-progress',
    bookId: 'the-moon',
    userId: 'mock-user',
    currentPage: 89,
    totalPages: 280,
    percentage: 32,
    status: 'reading' as const,
    lastReadAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const ContinueReadingBookCard = ({ progress, size = 'large' }) => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    loadBookData();
  }, [progress.bookId]);

  const loadBookData = async () => {
    try {
      const response = await booksService.getBookById(progress.bookId);
      if (response.success) {
        setBook(response.data);
      }
    } catch (error) {
      console.error('Error loading book data:', error);
    }
  };

  if (!book) {
    return (
      <View style={styles.continueReadingCard}>
        <ActivityIndicator size="small" color={COLORS.primary[500]} />
      </View>
    );
  }

  const handleBookPress = () => {
    // Navigate to book details and pass the book data
    router.push({
      pathname: '/book-more',
      params: { bookId: book.id }
    });
  };

  return (
    <TouchableOpacity 
      style={styles.continueReadingCard}
      onPress={handleBookPress}
    >
      {/* Book cover taking up most of the space */}
      <View style={styles.bookCoverContainer}>
        <Image source={typeof book.coverUrl === 'string' ? { uri: book.coverUrl } : book.coverUrl} style={styles.continueReadingCover} />
        
        {/* Rectangle 64 overlay in top-right corner */}
        <View style={styles.rectangleOverlay}>
          <SvgXml xml={BookmarkIcon} width={20} height={25} />
        </View>
      </View>
      
      {/* Bottom section with progress info */}
      <View style={styles.bottomProgressSection}>
        {/* Percentage with progress icon */}
        <View style={styles.leftProgressInfo}>
          <Text style={styles.percentageText}>{progress.percentage}%</Text>
          <SvgXml xml={ProgressIcon} width={12} height={12} />
        </View>
        
        {/* Page information underneath */}
        <Text style={styles.pageInfoText}>
          {progress.totalPages ? `Page ${progress.currentPage}/${progress.totalPages}` : `Page ${progress.currentPage}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const BookCard = ({ book, size = 'medium' }) => {
  const cardWidth = size === 'large' ? width * 0.26 : width * 0.25;
  const backgroundScale = cardWidth / 120; // Scale to match book card width
  
  // Paper control - HEIGHT and POSITION separated
  const paperHeight = 250; // How tall the paper is (independent of position)
  const paperTopPosition = -40; // How much paper extends above book (negative = extends above)
  
  const handleBookPress = () => {
    // Navigate to book details and pass the book data
    router.push({
      pathname: '/book-more',
      params: { bookId: book.id }
    });
  };
  
  return (
    <TouchableOpacity 
      style={[styles.bookCard, { width: cardWidth }]} 
      onPress={handleBookPress}
    >
      <View style={styles.bookContainer}>
        {/* Paper background layers */}
        <View style={styles.paperBackground}>
          <SvgXml 
            xml={BookBackgroundSvg} 
            width={cardWidth - 4} 
            height={paperHeight}
            style={[styles.paperLayer, { 
              ...styles.paperLayer1, 
              top: paperTopPosition // Position the paper vertically
            }]}
          />
        </View>
        
        {/* Book cover */}
      <View style={styles.bookCover}>
          <Image source={typeof book.coverUrl === 'string' ? { uri: book.coverUrl } : book.coverUrl} style={styles.coverImage} />
          </View>
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ svgIcon, title }) => (
  <View style={styles.sectionHeader}>
    <SvgXml xml={svgIcon} width={24} height={24} style={styles.sectionIcon} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

export default function HomeScreen() {
  const { books, trending, recommended, isLoading } = useBooks();
  const { user } = useAuth();
  const [continueReading, setContinueReading] = useState<ReadingProgress[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Service-based state
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [communityFavorites, setCommunityFavorites] = useState<Book[]>([]);
  const [currentlyReading, setCurrentlyReading] = useState<ReadingProgress[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, [user]);

  const loadHomeData = async () => {
    console.log('loadHomeData called, user:', user?.displayName || 'No user');
    
    setServicesLoading(true);
    try {
      console.log('Starting parallel data loading...');
      
      if (user) {
        // Load all data including user-specific content when authenticated
        const [trendingResponse, allBooksResponse, progressResponse] = await Promise.all([
          booksService.getTrendingBooks(),
          booksService.getAllBooks(),
          readingProgressService.getCurrentlyReading(user.id)
        ]);

        console.log('Data loaded (authenticated):', {
          trending: trendingResponse.success,
          allBooks: allBooksResponse.success,
          progress: progressResponse.success
        });

        // Process trending books
        if (trendingResponse.success) {
          setTrendingBooks(trendingResponse.data.slice(0, 10));
        }

        // Process community favorites (top rated books)
        if (allBooksResponse.success) {
          const topRated = allBooksResponse.data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10);
          setCommunityFavorites(topRated);
        }

        // Process currently reading
        if (progressResponse.success) {
          setCurrentlyReading(progressResponse.data);
        }
      } else {
        // Load public content only when not authenticated
        console.log('Loading public content for unauthenticated user...');
        const [trendingResponse, allBooksResponse] = await Promise.all([
          booksService.getTrendingBooks(),
          booksService.getAllBooks()
        ]);

        console.log('Public data loaded:', {
          trending: trendingResponse.success,
          allBooks: allBooksResponse.success
        });

        // Process trending books
        if (trendingResponse.success) {
          setTrendingBooks(trendingResponse.data.slice(0, 10));
        }

        // Process community favorites (top rated books)
        if (allBooksResponse.success) {
          const topRated = allBooksResponse.data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10);
          setCommunityFavorites(topRated);
        }

        // Show mock continue reading data for unauthenticated users
        setCurrentlyReading(mockContinueReadingData);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      console.log('Setting servicesLoading to false');
      setServicesLoading(false);
    }
  };

  // Debug logging
  console.log('Home Screen Debug:', { 
    isLoading, 
    servicesLoading, 
    user: user?.displayName || 'No user',
    trendingBooksCount: trendingBooks.length,
    communityFavoritesCount: communityFavorites.length 
  });

  if (servicesLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EB4D2A" />
          <Text style={styles.loadingText}>
            Loading books... (isLoading: {isLoading ? 'true' : 'false'}, servicesLoading: {servicesLoading ? 'true' : 'false'})
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setShowProfileMenu(false);
                router.push('/followers');
              }}
            >
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
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 160 }]}
      >
        {/* Continue Reading Section */}
        <SectionHeader svgIcon={GlassesIcon} title="Continue Reading..." />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {currentlyReading.map((progress) => (
            <ContinueReadingBookCard key={progress.id} progress={progress} />
          ))}
        </ScrollView>

        {/* Trending Books Section */}
        <SectionHeader svgIcon={AttentionFireIcon} title="Trending Books" />
        
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
        <SectionHeader svgIcon={ThumbsUpIcon} title="Community Favorites" />
        
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
      <TabBar />
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
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-trial',
    color: '#1E1E1E',
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
  bookContainer: {
    position: 'relative',
  },
  paperBackground: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperLayer: {
    position: 'absolute',
  },
  paperLayer1: {
    top: 4,
    left: 0,
    opacity: 1,
  },
  paperLayer2: {
    top: 2,
    left: -1,
    opacity: 0.5,
  },
  bookCover: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 1,
  },
  coverImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#F0F0F0',
    resizeMode: 'cover',
  },
  bookInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
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
    color: '#666666',
  },
  menuButton: {
    width: 30,
    height: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
  },
  bottomSpacing: {
    height: 60,
  },
  bookmarkOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  progressSection: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
  progressIcon: {
    marginLeft: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-trial',
    color: '#EB4D2A',
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
    backgroundColor: '#EB4D2A',
    borderRadius: 2,
  },
  pageText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
  },
  
  // Continue Reading section styles
  continueReadingCard: {
    display: 'flex',
    width: 112,
    height: 210,
    padding: 8,
    paddingTop: 178,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 64.815 },
    shadowOpacity: 0.03,
    shadowRadius: 46.852,
    elevation: 8,
    marginRight: 16,
  },
  frameBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  continueReadingContent: {
    position: 'relative',
    zIndex: 1,
    padding: 12,
    flex: 1,
  },
  bookCoverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 43,
    borderRadius: 8,
    overflow: 'hidden',
  },
  continueReadingCover: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
    resizeMode: 'cover',
  },
  rectangleOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  continueProgressSection: {
    marginTop: 12,
    alignItems: 'center',
  },
  circularProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  circularProgress: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#EB4D2A',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressText: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#EB4D2A',
  },
  circularProgressIcon: {
    marginLeft: 6,
  },
  continuePageText: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  bottomProgressSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  leftProgressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  percentageText: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: -0.48,
  },
  rightPageInfo: {
    alignItems: 'flex-end',
  },
  pageInfoText: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: -0.4,
    marginTop: -15,
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