import React from 'react';
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

// Mock data for homepage books using the actual images
const homepageBooks = {
  trending: [
    {
      id: 'dont-look-back',
      title: "Don't Look Back",
      author: 'Isaac Nelson',
      coverImage: require('../src/assets/images/homepage/Dont_look_back.png'),
    },
    {
      id: 'tarzan',
      title: 'Tarzan',
      author: 'Edgar Rice Burroughs',
      coverImage: require('../src/assets/images/homepage/Tarzan.png'),
    },
    {
      id: 'walk-into-shadow',
      title: 'Walk Into the Shadow',
      author: 'John Waters',
      coverImage: require('../src/assets/images/homepage/Salman.png'),
    },
  ],
  communityFavorites: [
    {
      id: 'harry-potter',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      coverImage: require('../src/assets/images/homepage/Harry_potter.png'),
    },
    {
      id: 'sisters',
      title: 'Sisters',
      author: 'Raina Telgemeier',
      coverImage: require('../src/assets/images/homepage/Sisters.png'),
    },
    {
      id: 'the-summer',
      title: 'The Summer',
      author: 'Kathryn Williams',
      coverImage: require('../src/assets/images/homepage/The_Summer.png'),
    },
  ],
};

const BookCard = ({ book, size = 'medium' }) => {
  const cardWidth = size === 'large' ? width * 0.26 : width * 0.25;
  const backgroundScale = cardWidth / 120; // Scale to match book card width
  
  // Paper control - HEIGHT and POSITION separated
  const paperHeight = 250; // How tall the paper is (independent of position)
  const paperTopPosition = -40; // How much paper extends above book (negative = extends above)
  
  return (
    <TouchableOpacity 
      style={[styles.bookCard, { width: cardWidth }]} 
      onPress={() => router.push('/book-more')}
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
          <Image source={book.coverImage} style={styles.coverImage} />
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
          <Text style={styles.loadingText}>Loading books...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile' as any)}>
          <View style={styles.menuButton} />
        </TouchableOpacity>
        
        <Text style={styles.pagezLogo}>pagez</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/profile' as any)}>
            <Image 
              source={{ uri: user?.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 160 }]}
      >
        {/* Trending Books Section */}
        <SectionHeader svgIcon={AttentionFireIcon} title="Trending Books" />
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {homepageBooks.trending.map((book) => (
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
          {homepageBooks.communityFavorites.map((book) => (
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  pagezLogo: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-trial',
    color: '#EB4D2A',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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