import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { SvgXml } from 'react-native-svg';

const { width } = Dimensions.get('window');

// SVG Assets
const EllipseIcon = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="22" cy="22" r="21.5" stroke="black" stroke-opacity="0.26"/>
</svg>`;

const LeftArrowIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8_1656)">
<path d="M4.01001 11.98H19" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.013 5.98801L4.00195 12L10.013 18.012" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8_1656">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const SearchLoupeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8_1643)">
<path d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382Z" stroke="#898A8D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 19L15.71 15.71" stroke="#898A8D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8_1643">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const FilterSortIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8_1649)">
<path d="M19.9101 9H4.09009" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.202 13.036V17.796C15.202 18.468 14.822 19.085 14.219 19.385L11.371 20.809C10.189 21.401 8.799 20.541 8.799 19.22V13.036L4.692 9.868C4.256 9.531 4 9.012 4 8.46V5.778C4 4.796 4.796 4 5.778 4H18.222C19.204 4 20 4.796 20 5.778V8.46C20 9.011 19.744 9.53 19.308 9.868L15.202 13.036Z" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8_1649">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const ArrowRightIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8_1963)">
<path d="M7.505 3L16.5 12.027L7.5 21" stroke="#ABB0BA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8_1963">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const FilterBackgroundSVG = `<svg width="393" height="582" viewBox="0 0 393 582" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 48C0 31.1984 0 22.7976 3.2698 16.3803C6.14601 10.7354 10.7354 6.14601 16.3803 3.2698C22.7976 0 31.1984 0 48 0H345C361.802 0 370.202 0 376.62 3.2698C382.265 6.14601 386.854 10.7354 389.73 16.3803C393 22.7976 393 31.1984 393 48V582H0V48Z" fill="#ECECEC"/>
</svg>`;

const RatingStarsSVG = `<svg width="108" height="20" viewBox="0 0 108 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#EB4D2A"/>
<path d="M32 0L34.2451 6.90983H41.5106L35.6327 11.1803L37.8779 18.0902L32 13.8197L26.1221 18.0902L28.3673 11.1803L22.4894 6.90983H29.7549L32 0Z" fill="#EB4D2A"/>
<path d="M54 0L56.2451 6.90983H63.5106L57.6327 11.1803L59.8779 18.0902L54 13.8197L48.1221 18.0902L50.3673 11.1803L44.4894 6.90983H51.7549L54 0Z" fill="#EB4D2A"/>
<path d="M76 0L78.2451 6.90983H85.5106L79.6327 11.1803L81.8779 18.0902L76 13.8197L70.1221 18.0902L72.3673 11.1803L66.4894 6.90983H73.7549L76 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M98 0L100.245 6.90983H107.511L101.633 11.1803L103.878 18.0902L98 13.8197L92.1221 18.0902L94.3673 11.1803L88.4894 6.90983H95.7549L98 0Z" fill="#FE772A" fill-opacity="0.2"/>
</svg>`;

// Mock data - Backend developer should replace with API calls
const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: require('../../src/assets/images/search/The_Great_Gatsby.png'),
  },
  {
    id: '2',
    title: 'Percy Jackson and the Olympians',
    author: 'Rick Riordan',
    subtitle: 'The Chalice of the Gods',
    coverImage: require('../../src/assets/images/search/Percy_jackson.png'),
  },
  {
    id: '3',
    title: 'Fire Dance',
    author: 'Ilana C. Myer',
    coverImage: require('../../src/assets/images/search/Fire_Dance.png'),
  },
  {
    id: '4',
    title: 'Ghost Forest',
    author: 'Pik-Shuen Fung',
    coverImage: require('../../src/assets/images/search/Ghost_Forest.png'),
  },
  {
    id: '5',
    title: 'Tucked Away',
    author: 'Phyllis Rudin',
    coverImage: require('../../src/assets/images/search/LateNight.png'),
  },
  {
    id: '6',
    title: 'Late Night Thoughts',
    author: 'Written by Me',
    coverImage: require('../../src/assets/images/search/LateNight.png'),
  },
  {
    id: '7',
    title: 'Divergent',
    author: 'Veronica Roth',
    coverImage: require('../../src/assets/images/search/Divergent.png'),
  },
  {
    id: '8',
    title: 'Hood Feminism',
    author: 'Mikki Kendall',
    coverImage: require('../../src/assets/images/search/Hood_Feminism.png'),
  },
  {
    id: '9',
    title: 'The Art of War',
    author: 'Sun Tzu',
    coverImage: require('../../src/assets/images/search/The_Art_of_war.jpg'),
  },
];

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const SUGGESTION_WORDS = ['"The"', 'the', 'to'];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // TODO: Backend integration - Replace with actual API call
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // API call would go here
    // Example: searchBooks(query).then(results => setSearchResults(results))
  };

  const handleBookPress = (bookId: string) => {
    // TODO: Backend integration - Navigate to book details with real book data
    router.push(`/book/${bookId}` as any);
  };

  const handleProfilePress = () => {
    // TODO: Backend integration - Navigate to user profile
    router.push('/profile');
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleFilterPress = () => {
    setShowFilterMenu(true);
  };

  const handleCloseFilter = () => {
    setShowFilterMenu(false);
  };

  const handleClearFilters = () => {
    // TODO: Clear all filters
    console.log('Clear filters');
  };

  const handleDoneFilter = () => {
    setShowFilterMenu(false);
    // TODO: Apply filters
    console.log('Apply filters');
  };

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setSearchText(prev => prev.slice(0, -1));
    } else {
      setSearchText(prev => prev + key);
    }
  };

  const renderBookCard = (book: typeof MOCK_BOOKS[0]) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCard}
      onPress={() => handleBookPress(book.id)}
      activeOpacity={0.8}
    >
      <Image source={book.coverImage} style={styles.coverImage} />
    </TouchableOpacity>
  );

  const renderKeyboardKey = (key: string, isSpecial = false) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.keyboardKey,
        isSpecial && styles.specialKey,
      ]}
      onPress={() => handleKeyPress(key)}
      activeOpacity={0.7}
    >
      <Text style={[styles.keyText, isSpecial && styles.specialKeyText]}>
        {key}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button with Ellipse background */}
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <View style={styles.ellipseBackground}>
            <SvgXml xml={EllipseIcon} width={44} height={44} />
            <View style={styles.arrowContainer}>
              <SvgXml xml={LeftArrowIcon} width={24} height={24} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Search Input Container */}
        <View style={styles.searchInputContainer}>
          <View style={styles.searchIconContainer}>
            <SvgXml xml={SearchLoupeIcon} width={24} height={24} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Community"
            placeholderTextColor="#898A8D"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setShowKeyboard(true)}
            onSubmitEditing={() => handleSearch(searchText)}
          />
          <TouchableOpacity style={styles.filterButtonContainer} onPress={handleFilterPress}>
            <SvgXml xml={FilterSortIcon} width={24} height={24} />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../src/assets/images/homepage/profile.jpg')} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Books Grid */}
        <View style={styles.booksGrid}>
          {MOCK_BOOKS.map(renderBookCard)}
        </View>
      </ScrollView>

      {/* Word Suggestions */}
      <View style={styles.suggestions}>
        {SUGGESTION_WORDS.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionButton}
            onPress={() => setSearchText(word.replace(/"/g, ''))}
            activeOpacity={0.7}
          >
            <Text style={styles.suggestionText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Keyboard */}
      <View style={styles.keyboard}>
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyboardRow}>
            {row.map(key => renderKeyboardKey(key))}
          </View>
        ))}

        {/* Bottom keyboard row with special keys */}
        <View style={styles.keyboardRow}>
          {renderKeyboardKey('ABC', true)}
          {renderKeyboardKey('space', true)}
          {renderKeyboardKey('return', true)}
        </View>
      </View>

      {/* Bottom indicators */}
      <View style={styles.bottomIndicators}>
        <TouchableOpacity style={styles.emojiButton}>
          <Text style={styles.emoji}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.micButton}>
          <Text style={styles.micIcon}>🎤</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Menu Modal */}
      {showFilterMenu && (
        <View style={styles.filterOverlay}>
          <TouchableOpacity style={styles.filterBackdrop} onPress={handleCloseFilter} />
          <View style={styles.filterMenuContainer}>
            {/* SVG Background */}
            <View style={styles.filterMenuBackground}>
              <SvgXml xml={FilterBackgroundSVG} width={393} height={582} />
            </View>
            
            {/* Filter Content */}
            <View style={styles.filterMenu}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Search Filters</Text>
              </View>
              
              <View style={styles.filterContent}>
                {/* Author Filter */}
                <TouchableOpacity style={styles.filterItem}>
                  <View style={styles.filterItemContent}>
                    <Text style={styles.filterLabel}>Author</Text>
                    <Text style={styles.filterValue}>Steve McQueen, J.K. Rowlings, Elo...</Text>
                  </View>
                  <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                </TouchableOpacity>

                {/* Genre Filter */}
                <TouchableOpacity style={styles.filterItem}>
                  <View style={styles.filterItemContent}>
                    <Text style={styles.filterLabel}>Genre</Text>
                    <Text style={styles.filterValue}>Horror, Comedy, Zombie</Text>
                  </View>
                  <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                </TouchableOpacity>

                {/* Ratings Filter */}
                <TouchableOpacity style={styles.filterItem}>
                  <View style={styles.filterItemContent}>
                    <Text style={styles.filterLabel}>Ratings</Text>
                    <SvgXml xml={RatingStarsSVG} width={108} height={20} />
                  </View>
                  <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                </TouchableOpacity>

                {/* Age Ratings Filter */}
                <TouchableOpacity style={styles.filterItem}>
                  <View style={styles.filterItemContent}>
                    <Text style={styles.filterLabel}>Age Ratings</Text>
                    <Text style={styles.filterValue}>3+, 13+</Text>
                  </View>
                  <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                </TouchableOpacity>
              </View>

              <View style={styles.filterActions}>
                <TouchableOpacity 
                  style={styles.clearFiltersButton}
                  onPress={() => {
                    // Clear filters logic
                  }}
                >
                  <Text style={styles.clearFiltersText}>Clear Filters</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.doneButton}
                  onPress={() => setShowFilterMenu(false)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  ellipseBackground: {
    width: 44,
    height: 44,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    width: 245,
    height: 44,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 54,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.26)',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    marginRight: 4,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1E1E',
    lineHeight: 28,
    letterSpacing: -0.4,
    paddingVertical: 0,
    minWidth: 120,
  },
  filterButtonContainer: {
    padding: 4,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  bookCard: {
    width: '31%', // Exactly 3 books per row with space between
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  bookInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  bookTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  bookSubtitle: {
    fontSize: 9,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 2,
  },
  suggestions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  suggestionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  keyboard: {
    backgroundColor: '#D1D5DB',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  keyboardKey: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 6,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialKey: {
    backgroundColor: '#9CA3AF',
    paddingHorizontal: 16,
  },
  keyText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  specialKeyText: {
    color: '#FFFFFF',
  },
  bottomIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#D1D5DB',
  },
  emojiButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  micButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  filterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  filterMenuContainer: {
    width: 393,
    height: 582,
    flexShrink: 0,
    position: 'relative',
    alignSelf: 'center',
  },
  filterMenuBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  filterMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  filterHeader: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingLeft: 16,
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  filterContent: {
    flex: 1,
    alignItems: 'center',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 320,
    height: 80,
    paddingHorizontal: 16,
    marginHorizontal: 0,
    marginVertical: 2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 8,
  },
  filterItemContent: {
    flex: 1,
    width: 323,
  },
  filterLabel: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.6,
    marginBottom: 2,
  },
  filterValue: {
    overflow: 'hidden',
    color: '#ABB0BA',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.6,
    width: 280,
  },
  filterActions: {
    flexDirection: 'column',
    marginTop: 12,
    gap: 8,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  clearFiltersButton: {
    width: 320,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(137, 138, 141, 0.50)',
    backgroundColor: 'transparent',
  },
  clearFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#898A8D',
  },
  doneButton: {
    width: 320,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    backgroundColor: '#EB4D2A',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});