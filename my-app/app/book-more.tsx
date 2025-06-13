import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { ReadingListModal } from '../src/components/ReadingListModal';
import { BlurbModal } from '../src/components/BlurbModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Header background SVG
const headerBackgroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="393" height="297" viewBox="0 0 393 297" fill="none">
  <path d="M0 40C0 17.9086 17.9086 0 40 0H353C375.091 0 393 17.9086 393 40V297H0V40Z" fill="#EB4D2A"/>
</svg>`;

// Gradient section SVG with extended top to avoid white space
const gradientSectionSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="393" height="110" viewBox="0 0 393 110" fill="none">
  <path d="M0 -10H393V110H0V-10Z" fill="url(#paint0_linear_4_2089)"/>
  <defs>
    <linearGradient id="paint0_linear_4_2089" x1="196.5" y1="-137" x2="196.5" y2="110" gradientUnits="userSpaceOnUse">
      <stop stop-color="#EB4D2A"/>
      <stop offset="1" stop-color="white"/>
    </linearGradient>
  </defs>
</svg>`;

// Add the star SVG for the rating
const starFilledSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M11 0L13.2451 6.90983H20.5106L14.6327 11.1803L16.8779 18.0902L11 13.8197L5.12215 18.0902L7.36729 11.1803L1.48944 6.90983H8.75486L11 0Z" fill="#EB4D2A"/>
</svg>`;

const starEmptySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M11 0L13.2451 6.90983H20.5106L14.6327 11.1803L16.8779 18.0902L11 13.8197L5.12215 18.0902L7.36729 11.1803L1.48944 6.90983H8.75486L11 0Z" fill="#FE772A" fill-opacity="0.2"/>
</svg>`;

// Update the SVG strings to make them more visible
const starSvg = `<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 0L5.51031 3.10942H8.77975L6.13472 5.03115L7.14503 8.14058L4.5 6.21885L1.85497 8.14058L2.86528 5.03115L0.220246 3.10942H3.48969L4.5 0Z" fill="#EB4D2A"/>
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

// Add the share button SVG definition after other SVG definitions
const shareButtonSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_1827)">
<path d="M8.55286 10.1141C9.59439 11.1556 9.59439 12.8443 8.55286 13.8858C7.51133 14.9273 5.82268 14.9273 4.78115 13.8858C3.73962 12.8443 3.73962 11.1556 4.78115 10.1141C5.82268 9.07256 7.51133 9.07256 8.55286 10.1141Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.2189 4.78115C20.2604 5.82268 20.2604 7.51133 19.2189 8.55286C18.1773 9.59439 16.4887 9.59439 15.4472 8.55286C14.4056 7.51133 14.4056 5.82268 15.4472 4.78115C16.4887 3.73962 18.1773 3.73962 19.2189 4.78115Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.2189 15.4471C20.2604 16.4886 20.2604 18.1773 19.2189 19.2188C18.1773 20.2603 16.4887 20.2603 15.4472 19.2188C14.4056 18.1773 14.4056 16.4886 15.4472 15.4471C16.4887 14.4056 18.1773 14.4056 19.2189 15.4471Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.04004 10.81L14.96 7.85001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.04004 13.19L14.96 16.15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_1827">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

// Define the book data interface
interface BookData {
  id?: string;
  title: string;
  author: string;
  coverImage: any; // Can be a string URL or a require() result
  pages: number;
  level: string;
  genre: string;
  series: string;
  rating: number;
  dailyReaders: string;
  description: string;
  progress?: number;
  currentPage?: number;
  totalPages?: number;
  authorThoughts: {
    name: string;
    comment: string;
    subComment: string;
    likes: string;
    comments: string;
  };
  readerThoughts: {
    name: string;
    readingStatus: string;
    comment: string;
    likes: string;
    comments: string;
    timeAgo: string;
  };
}

// Mock data for books - simplified structure
const mockBooks = [
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: require('../src/assets/images/homepage/Dune.png'),
    progress: 58,
    currentPage: 589,
    totalPages: 1200,
    pages: 1200,
    level: 'Advanced',
    genre: 'Sci-Fi',
    series: 'Dune',
    rating: 4.7,
    dailyReaders: '12.4k',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
  },
  {
    id: 'city-of-orange',
    title: 'City of Orange',
    author: 'David Yoon',
    coverImage: require('../src/assets/images/homepage/City_of_Orange.png'),
    progress: 58,
    currentPage: 589,
    totalPages: 320,
    pages: 320,
    level: 'Moderate',
    genre: 'Fiction',
    series: 'Standalone',
    rating: 4.2,
    dailyReaders: '3.5k',
    description: 'A man wakes up in an unknown landscape, injured and alone. He used to live in a place called California, but how did he wind up here with a head wound and a bottle of pills in his pocket?',
  },
  {
    id: 'the-moon',
    title: 'The Moon and Stars',
    author: 'Jenna Warren',
    coverImage: require('../src/assets/images/homepage/The_Moon.png'),
    progress: 58,
    currentPage: 589,
    totalPages: 280,
    pages: 280,
    level: 'Easy',
    genre: 'Romance',
    series: 'Moon Series',
    rating: 4.5,
    dailyReaders: '7.2k',
    description: 'A heartwarming tale of love and discovery under the night sky, as two strangers find connection through their shared passion for astronomy.',
  },
  {
    id: 'dont-look-back',
    title: "Don't Look Back",
    author: 'Isaac Nelson',
    coverImage: require('../src/assets/images/homepage/Dont_look_back.png'),
    pages: 340,
    level: 'Moderate',
    genre: 'Thriller',
    series: 'Standalone',
    rating: 4.3,
    dailyReaders: '8.9k',
    description: "A gripping psychological thriller about a woman who cannot remember her past and the dangerous secrets that threaten to consume her present.",
  },
  {
    id: 'tarzan',
    title: 'Tarzan',
    author: 'Edgar Rice Burroughs',
    coverImage: require('../src/assets/images/homepage/Tarzan.png'),
    pages: 290,
    level: 'Easy',
    genre: 'Adventure',
    series: 'Tarzan Series',
    rating: 4.1,
    dailyReaders: '6.3k',
    description: 'The story of a boy raised by apes in the African jungle after the death of his parents.',
  },
];

// Update the defaultBookData to ensure the likes and comments are strings
const defaultBookData = {
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
    comments: '354'
  },
  readerThoughts: {
    name: 'Samantha Jackson',
    readingStatus: 'Reading "Pretty Little Liars"',
    comment: 'Fantastic book! #weeklyreadings',
    likes: '3k',
    comments: '354',
    timeAgo: '20 MINS AGO'
  }
};

export default function BookDetailsScreen() {
  const params = useLocalSearchParams();
  const { bookId } = params;
  const [bookData, setBookData] = useState<BookData>(defaultBookData as BookData);
  const [isReadingListModalVisible, setIsReadingListModalVisible] = useState(false);
  const [isBlurbModalVisible, setIsBlurbModalVisible] = useState(false);

  // Find the book by ID from our mock data
  useEffect(() => {
    if (bookId) {
      const foundBook = mockBooks.find(book => book.id === bookId);
      
      if (foundBook) {
        // Merge found book with default data for any missing fields
        setBookData({
          ...defaultBookData,
          ...foundBook,
          // If the found book has an image object, use it, otherwise keep default
          coverImage: foundBook.coverImage || defaultBookData.coverImage
        });
      }
    }
  }, [bookId]);

  const handleBackPress = () => {
    router.back();
  };

  const handleBookmarkPress = () => {
    setIsReadingListModalVisible(true);
  };

  const currentBook = {
    id: typeof bookId === 'string' ? bookId : (bookData.id || Date.now().toString()),
    title: bookData.title,
    author: bookData.author,
    coverImage: bookData.coverImage,
  };

  const handleAddNewList = () => {
    // TODO: Implement add new list functionality
    console.log('Add new list pressed');
  };

  const handleSharePress = () => {
    // TODO: Backend developer - implement share functionality
    console.log('Share pressed');
  };

  const handleStartReading = () => {
    router.push({
      pathname: '/reading',
      params: {
        bookId: currentBook.id,
        title: currentBook.title,
        author: currentBook.author
      }
    });
  };

  const handleCommunityPress = () => {
    // TODO: Backend developer - navigate to community page
    router.push('/community');
  };

  const handleCreatePostPress = () => {
    // TODO: Backend developer - navigate to create post page
    router.push('/create-post' as any);
  };

  const handleBlurbPress = () => {
    setIsBlurbModalVisible(true);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <View key={i} style={{marginRight: 4}}>
          <SvgXml xml={i < fullStars ? starFilledSvg : starEmptySvg} width={22} height={22} />
        </View>
      );
    }
    return stars;
  };

  // Function to determine font size based on text length - more aggressive scaling
  const getFontSize = (text: string) => {
    if (!text) return 20;
    
    const length = text.length;
    if (length > 12) return 14;
    if (length > 8) return 16;
    if (length > 6) return 18;
    return 20;
  };

  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}>
        <SvgXml 
          xml={headerBackgroundSvg} 
          width={screenWidth} 
          height={297} 
          style={styles.headerSvg}
        />
      </View>

      {/* Gradient Section */}
      <View style={styles.gradientSection}>
        <SvgXml 
          xml={gradientSectionSvg} 
          width={screenWidth} 
          height={110} 
          style={styles.gradientSvg}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header Actions */}
        <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
          <View style={styles.headerRightButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBookmarkPress}>
            <Ionicons name="bookmark-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSharePress}>
              <SvgXml xml={shareButtonSvg} width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingBottom: 200,
            flexGrow: 1
          }}
          bounces={true}
          alwaysBounceVertical={true}>
      {/* Book Cover */}
      <View style={styles.bookCoverContainer}>
          {typeof bookData.coverImage === 'string' ? (
        <Image source={{ uri: bookData.coverImage }} style={styles.bookCover} />
          ) : (
            <Image source={bookData.coverImage} style={styles.bookCover} />
          )}
      </View>

      {/* Book Info */}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{bookData.title}</Text>
        <Text style={styles.bookAuthor}>by {bookData.author}</Text>
      </View>

        {/* Book Stats - Centered container with left-aligned text */}
        <View style={styles.statsContainerWrapper}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
              <Text style={styles.statNumber} numberOfLines={1}>
                {bookData.pages}
              </Text>
          <Text style={styles.statLabel}>Pages</Text>
        </View>
        <View style={styles.statItem}>
              <Text style={styles.statNumber} numberOfLines={1}>
                {bookData.level}
              </Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statItem}>
              <Text style={styles.statNumber} numberOfLines={1}>
                {bookData.genre}
              </Text>
          <Text style={styles.statLabel}>Genre</Text>
        </View>
        <View style={styles.statItem}>
              <Text style={styles.statNumber} numberOfLines={1}>
                {bookData.series}
              </Text>
          <Text style={styles.statLabel}>Series</Text>
          </View>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <View style={styles.ratingContent}>
          <View style={styles.starsContainer}>
            {renderStars(bookData.rating)}
          </View>
          <Text style={styles.ratingText}>{bookData.rating} Rating</Text>
        </View>
          </View>
          <View style={styles.dailyReadersBox}>
            <View style={styles.dailyReadersContent}>
          <Text style={styles.dailyReaders}>{bookData.dailyReaders}</Text>
          <Text style={styles.dailyReadersLabel}>Daily Readers</Text>
            </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{bookData.description}</Text>

      {/* Author's Thoughts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Author's thoughts</Text>
        <View style={styles.thoughtCard}>
          <View style={styles.authorInfo}>
              <Image 
                source={require('../src/assets/images/Book_details/Authors thoughts/profile.jpg')} 
                style={styles.authorAvatar} 
              />
            <View style={styles.authorDetails}>
              <Text style={styles.authorName}>{bookData.authorThoughts.name}</Text>
                <View style={styles.authorBadgeContainer}>
                  <Text style={styles.authorStarText}>★</Text>
                  <Text style={styles.authorBadge}>Author</Text>
                </View>
            </View>
          </View>
          <Text style={styles.thoughtText}>{bookData.authorThoughts.comment}</Text>
          <Text style={styles.thoughtSubText}>{bookData.authorThoughts.subComment}</Text>
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
      </View>

      {/* Reader's Thoughts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Reader's thoughts</Text>
        <View style={styles.readerCard}>
            {/* Reader Header */}
          <View style={styles.readerHeader}>
              <Image 
                source={require('../src/assets/images/Book_details/Authors thoughts/profile.jpg')} 
                style={styles.readerAvatar} 
              />
            <View style={styles.readerInfo}>
              <Text style={styles.readerName}>{bookData.readerThoughts.name}</Text>
              <Text style={styles.readerStatus}>{bookData.readerThoughts.readingStatus}</Text>
            </View>
          </View>
            
            {/* Reader Image Container with Background Image */}
          <View style={styles.readerImageContainer}>
              <Image 
                source={require('../src/assets/images/Book_details/Authors thoughts/Reader_thoughts_bg.png')} 
                style={styles.readerBackgroundImage} 
                resizeMode="cover"
              />
              <View style={styles.bookCoverOverlay}>
                <Image 
                  source={typeof bookData.coverImage === 'string' ? { uri: bookData.coverImage } : bookData.coverImage} 
                  style={styles.readerBookCover} 
                />
              </View>
          </View>
            
        <Text style={styles.readerComment}>{bookData.readerThoughts.comment}</Text>
        <View style={styles.readerActions}>
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
            <Text style={styles.timeAgo}>20 MINS AGO</Text>
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
      <TouchableOpacity style={styles.blurbButton} onPress={handleBlurbPress}>
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

<ReadingListModal
  visible={isReadingListModalVisible}
  onClose={() => setIsReadingListModalVisible(false)}
  currentBook={currentBook}
/>

<BlurbModal
  visible={isBlurbModalVisible}
  onClose={() => setIsBlurbModalVisible(false)}
  bookTitle={bookData.title}
  bookAuthor={bookData.author}
  blurbText={bookData.description}
/>
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 297,
    zIndex: 1,
    backgroundColor: '#EB4D2A',
  },
  headerSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gradientSection: {
    position: 'absolute',
    top: 280, // Overlap with the header
    left: 0,
    right: 0,
    height: 110,
    zIndex: 2,
    overflow: 'hidden',
  },
  gradientSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 15,
    zIndex: 3,
  },
  headerButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 260,
    zIndex: 4,
    paddingBottom: 20,
  },
  bookCoverContainer: {
    alignItems: 'center',
    marginTop: -175,
    marginBottom: 15,
    zIndex: 5,
  },
  bookCover: {
    width: 140,
    height: 210,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop: 0,
    width: '100%',
  },
  bookTitle: {
    color: '#1E1E1E',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -1.2,
    marginBottom: 2,
    maxWidth: 320,
  },
  bookAuthor: {
    color: '#EB5F2A',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: -0.8,
    marginBottom: 8,
    maxWidth: 320,
  },
  statsContainerWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '80%',
    maxWidth: 300,
    paddingHorizontal: 0,
  },
  statItem: {
    alignItems: 'center',
    width: '25%',
    height: 42,
    paddingRight: 0,
  },
  statNumber: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.8,
    marginBottom: 0,
    textAlign: 'center',
  },
  statLabel: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.48,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 12,
    marginTop: 3,
    gap: 10,
  },
  ratingBox: {
    flex: 1,
    backgroundColor: 'rgba(254, 119, 42, 0.10)',
    borderRadius: 10,
    height: 65,
    justifyContent: 'center',
  },
  ratingContent: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  dailyReadersBox: {
    flex: 1,
    backgroundColor: 'rgba(254, 119, 42, 0.10)',
    borderRadius: 10,
    height: 65,
    justifyContent: 'center',
  },
  dailyReadersContent: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'center',
  },
  ratingText: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.48,
    marginTop: 2,
  },
  dailyReaders: {
    color: '#EB4D2A',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.8,
    marginBottom: 0,
  },
  dailyReadersLabel: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.48,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
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
    fontFamily: 'Bogart-Regular-trial',
    color: '#999',
    marginBottom: 15,
  },
  thoughtCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
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
  thoughtText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  thoughtSubText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
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
  iconText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666',
    marginLeft: 4,
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
    marginRight: 12,
  },
  readerInfo: {
    flex: 1,
  },
  readerName: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-trial',
    color: '#000',
    marginBottom: 2,
  },
  readerStatus: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666',
  },
  readerImageContainer: {
    marginBottom: 15,
    position: 'relative',
    width: 313,
    height: 176,
    flexShrink: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  readerBackgroundImage: {
    width: '100%',
    height: '275.345%',
    position: 'absolute',
    top: -90.253,
    left: 0,
  },
  bookCoverOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  readerBookCover: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  readerComment: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-trial',
    color: '#000',
    marginBottom: 15,
  },
  readerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  timeAgo: {
    color: '#ABB0BA',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.64,
    marginLeft: 'auto',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 25,
    marginTop: 10,
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
    fontFamily: 'Bogart-Bold-trial',
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
    fontFamily: 'Bogart-Bold-trial',
    color: '#333',
  },
  readingButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 30,
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
    fontFamily: 'Bogart-Bold-trial',
    color: 'white',
  },
  startReadingButton: {
    flex: 1,
    backgroundColor: '#EB4D2A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startReadingButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-trial',
    color: 'white',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  bottomPadding: {
    height: 150, // Significantly increased for better scrolling
  },
  actionTextBold: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#333',
    marginLeft: 4,
    fontWeight: '500',
  },
});