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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { MOCK_AUTHORS } from '../../src/constants/mockData';

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

const RatingStars1SVG = `<svg width="108" height="20" viewBox="0 0 108 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#EB4D2A"/>
<path d="M32 0L34.2451 6.90983H41.5106L35.6327 11.1803L37.8779 18.0902L32 13.8197L26.1221 18.0902L28.3673 11.1803L22.4894 6.90983H29.7549L32 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M54 0L56.2451 6.90983H63.5106L57.6327 11.1803L59.8779 18.0902L54 13.8197L48.1221 18.0902L50.3673 11.1803L44.4894 6.90983H51.7549L54 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M76 0L78.2451 6.90983H85.5106L79.6327 11.1803L81.8779 18.0902L76 13.8197L70.1221 18.0902L72.3673 11.1803L66.4894 6.90983H73.7549L76 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M98 0L100.245 6.90983H107.511L101.633 11.1803L103.878 18.0902L98 13.8197L92.1221 18.0902L94.3673 11.1803L88.4894 6.90983H95.7549L98 0Z" fill="#FE772A" fill-opacity="0.2"/>
</svg>`;

const RatingStars2SVG = `<svg width="108" height="20" viewBox="0 0 108 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#EB4D2A"/>
<path d="M32 0L34.2451 6.90983H41.5106L35.6327 11.1803L37.8779 18.0902L32 13.8197L26.1221 18.0902L28.3673 11.1803L22.4894 6.90983H29.7549L32 0Z" fill="#EB4D2A"/>
<path d="M54 0L56.2451 6.90983H63.5106L57.6327 11.1803L59.8779 18.0902L54 13.8197L48.1221 18.0902L50.3673 11.1803L44.4894 6.90983H51.7549L54 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M76 0L78.2451 6.90983H85.5106L79.6327 11.1803L81.8779 18.0902L76 13.8197L70.1221 18.0902L72.3673 11.1803L66.4894 6.90983H73.7549L76 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M98 0L100.245 6.90983H107.511L101.633 11.1803L103.878 18.0902L98 13.8197L92.1221 18.0902L94.3673 11.1803L88.4894 6.90983H95.7549L98 0Z" fill="#FE772A" fill-opacity="0.2"/>
</svg>`;

const RatingStars3SVG = `<svg width="108" height="20" viewBox="0 0 108 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#EB4D2A"/>
<path d="M32 0L34.2451 6.90983H41.5106L35.6327 11.1803L37.8779 18.0902L32 13.8197L26.1221 18.0902L28.3673 11.1803L22.4894 6.90983H29.7549L32 0Z" fill="#EB4D2A"/>
<path d="M54 0L56.2451 6.90983H63.5106L57.6327 11.1803L59.8779 18.0902L54 13.8197L48.1221 18.0902L50.3673 11.1803L44.4894 6.90983H51.7549L54 0Z" fill="#EB4D2A"/>
<path d="M76 0L78.2451 6.90983H85.5106L79.6327 11.1803L81.8779 18.0902L76 13.8197L70.1221 18.0902L72.3673 11.1803L66.4894 6.90983H73.7549L76 0Z" fill="#FE772A" fill-opacity="0.2"/>
<path d="M98 0L100.245 6.90983H107.511L101.633 11.1803L103.878 18.0902L98 13.8197L92.1221 18.0902L94.3673 11.1803L88.4894 6.90983H95.7549L98 0Z" fill="#FE772A" fill-opacity="0.2"/>
</svg>`;

const RatingStars4SVG = `<svg width="108" height="20" viewBox="0 0 108 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#EB4D2A"/>
<path d="M32 0L34.2451 6.90983H41.5106L35.6327 11.1803L37.8779 18.0902L32 13.8197L26.1221 18.0902L28.3673 11.1803L22.4894 6.90983H29.7549L32 0Z" fill="#EB4D2A"/>
<path d="M54 0L56.2451 6.90983H63.5106L57.6327 11.1803L59.8779 18.0902L54 13.8197L48.1221 18.0902L50.3673 11.1803L44.4894 6.90983H51.7549L54 0Z" fill="#EB4D2A"/>
<path d="M76 0L78.2451 6.90983H85.5106L79.6327 11.1803L81.8779 18.0902L76 13.8197L70.1221 18.0902L72.3673 11.1803L66.4894 6.90983H73.7549L76 0Z" fill="#EB4D2A"/>
<path d="M98 0L100.245 6.90983H107.511L101.633 11.1803L103.878 18.0902L98 13.8197L92.1221 18.0902L94.3673 11.1803L88.4894 6.90983H95.7549L98 0Z" fill="#FE772A" fill-opacity="0.2"/>
</svg>`;

const RatingStars5SVG = `<svg width="108" height="20" viewBox="0 0 108 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#EB4D2A"/>
<path d="M32 0L34.2451 6.90983H41.5106L35.6327 11.1803L37.8779 18.0902L32 13.8197L26.1221 18.0902L28.3673 11.1803L22.4894 6.90983H29.7549L32 0Z" fill="#EB4D2A"/>
<path d="M54 0L56.2451 6.90983H63.5106L57.6327 11.1803L59.8779 18.0902L54 13.8197L48.1221 18.0902L50.3673 11.1803L44.4894 6.90983H51.7549L54 0Z" fill="#EB4D2A"/>
<path d="M76 0L78.2451 6.90983H85.5106L79.6327 11.1803L81.8779 18.0902L76 13.8197L70.1221 18.0902L72.3673 11.1803L66.4894 6.90983H73.7549L76 0Z" fill="#EB4D2A"/>
<path d="M98 0L100.245 6.90983H107.511L101.633 11.1803L103.878 18.0902L98 13.8197L92.1221 18.0902L94.3673 11.1803L88.4894 6.90983H95.7549L98 0Z" fill="#EB4D2A"/>
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

// Mock data for filter options
const genres = [
  { id: 'genre-1', name: 'Horror', description: 'Scary, suspenseful stories' },
  { id: 'genre-2', name: 'Comedy', description: 'Humorous, light-hearted tales' },
  { id: 'genre-3', name: 'Zombie', description: 'Undead apocalypse stories' },
  { id: 'genre-4', name: 'Romance', description: 'Love stories and relationships' },
  { id: 'genre-5', name: 'Sci-Fi', description: 'Science fiction and futuristic tales' },
];

const ratings = [
  { id: 'rating-1', name: '⭐', value: 1 },
  { id: 'rating-2', name: '⭐⭐', value: 2 },
  { id: 'rating-3', name: '⭐⭐⭐', value: 3 },
  { id: 'rating-4', name: '⭐⭐⭐⭐', value: 4 },
  { id: 'rating-5', name: '⭐⭐⭐⭐⭐', value: 5 },
];

const ageRatings = [
  { id: 'age-1', name: '3+', description: 'Content suitable for ages 3 and up' },
  { id: 'age-2', name: '7+', description: 'Content suitable for ages 7 and up' },
  { id: 'age-3', name: '13+', description: 'Content suitable for ages 13 and up' },
  { id: 'age-4', name: '16+', description: 'Content suitable for ages 16 and up' },
  { id: 'age-5', name: '18+', description: 'Content suitable for ages 18 and up' },
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
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [authorSearch, setAuthorSearch] = useState('');
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<string[]>([]);

  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [showAgeRatingsModal, setShowAgeRatingsModal] = useState(false);

  const [genreSearch, setGenreSearch] = useState('');
  const [ratingsSearch, setRatingsSearch] = useState('');
  const [ageRatingsSearch, setAgeRatingsSearch] = useState('');

  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [selectedRatingsIds, setSelectedRatingsIds] = useState<string[]>([]);
  const [selectedAgeRatingsIds, setSelectedAgeRatingsIds] = useState<string[]>([]);

  const [filteredGenres, setFilteredGenres] = useState<string[]>([]);
  const [filteredRatings, setFilteredRatings] = useState<string[]>([]);
  const [filteredAgeRatings, setFilteredAgeRatings] = useState<string[]>([]);

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
    // Clear all selected filters
    setSelectedAuthorIds([]);
    setSelectedGenreIds([]);
    setSelectedRatingsIds([]);
    setSelectedAgeRatingsIds([]);
    
    // Clear all filtered values
    setFilteredAuthors([]);
    setFilteredGenres([]);
    setFilteredRatings([]);
    setFilteredAgeRatings([]);
    
    // Clear search fields
    setAuthorSearch('');
    setGenreSearch('');
    setRatingsSearch('');
    setAgeRatingsSearch('');
    
    console.log('All filters cleared');
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

  const toggleAuthorSelect = (id: string) => {
    setSelectedAuthorIds(prev =>
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const toggleGenreSelect = (id: string) => {
    setSelectedGenreIds(prev =>
      prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
    );
  };

  const toggleRatingsSelect = (id: string) => {
    setSelectedRatingsIds(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const toggleAgeRatingsSelect = (id: string) => {
    setSelectedAgeRatingsIds(prev =>
      prev.includes(id) ? prev.filter(arid => arid !== id) : [...prev, id]
    );
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

  const authors = MOCK_AUTHORS || [];

  const AuthorModal = () => (
    <View style={styles.filterOverlay}>
      <TouchableOpacity style={styles.filterBackdrop} onPress={handleCloseFilter} />
      <View style={styles.filterMenuContainer}>
        {/* SVG Background */}
        <View style={styles.filterMenuBackground}>
          <SvgXml xml={FilterBackgroundSVG} width={393} height={582} />
        </View>
        
        {/* Filter Content */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.filterMenu}>
            <View style={styles.authorHeaderRow}>
              <Text style={styles.filterTitle}>Search Filters <Text style={styles.authorHeaderGray}>Authors</Text></Text>
            </View>
            <View style={styles.authorSearchBar}>
              <SvgXml xml={SearchLoupeIcon} width={20} height={20} style={{marginLeft: 12, marginRight: 8}} />
              <TextInput
                style={styles.authorSearchInput}
                placeholder="Search Authors"
                placeholderTextColor="#898A8D"
                value={authorSearch}
                onChangeText={setAuthorSearch}
                blurOnSubmit={false}
                returnKeyType="search"
              />
            </View>
            <ScrollView 
              style={{flex: 1, marginTop: 12, maxHeight: 380}}
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              nestedScrollEnabled={true}
            >
              {authors.filter(a => a.displayName.toLowerCase().includes(authorSearch.toLowerCase())).map((author, idx) => (
                <TouchableOpacity
                  key={author.id}
                  style={selectedAuthorIds.includes(author.id) ? styles.authorBoxSelected : styles.authorBox}
                  onPress={() => toggleAuthorSelect(author.id)}
                  activeOpacity={0.8}
                >
                  <Image source={{uri: author.profilePicture}} style={styles.authorAvatar} />
                  <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={selectedAuthorIds.includes(author.id) ? styles.authorNameSelected : styles.authorName}>{author.displayName}</Text>
                    <Text style={styles.authorSubtitle} numberOfLines={1}>{author.books && author.books.length > 0 ? author.books.map(b => b.title).join(', ') : 'No books'}</Text>
                  </View>
                  <View style={selectedAuthorIds.includes(author.id) ? styles.authorRadioSelected : styles.authorRadioUnselected} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => {
                // Get the names of selected authors
                const selectedNames = authors
                  .filter(author => selectedAuthorIds.includes(author.id))
                  .map(author => author.displayName);
                
                // Update filtered authors
                setFilteredAuthors(selectedNames);
                setShowAuthorModal(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );

  const GenreModal = () => (
    <View style={styles.filterOverlay}>
      <TouchableOpacity style={styles.filterBackdrop} onPress={handleCloseFilter} />
      <View style={styles.filterMenuContainer}>
        <View style={styles.filterMenuBackground}>
          <SvgXml xml={FilterBackgroundSVG} width={393} height={582} />
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.filterMenu}>
            <View style={styles.authorHeaderRow}>
              <Text style={styles.filterTitle}>Search Filters <Text style={styles.authorHeaderGray}>Genres</Text></Text>
            </View>
            <View style={styles.authorSearchBar}>
              <SvgXml xml={SearchLoupeIcon} width={20} height={20} style={{marginLeft: 12, marginRight: 8}} />
              <TextInput
                style={styles.authorSearchInput}
                placeholder="Search Genres"
                placeholderTextColor="#898A8D"
                value={genreSearch}
                onChangeText={setGenreSearch}
                blurOnSubmit={false}
                returnKeyType="search"
              />
            </View>
            <ScrollView 
              style={{flex: 1, marginTop: 12, maxHeight: 380}}
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              nestedScrollEnabled={true}
            >
              {genres.filter(g => g.name.toLowerCase().includes(genreSearch.toLowerCase())).map((genre) => (
                <TouchableOpacity
                  key={genre.id}
                  style={selectedGenreIds.includes(genre.id) ? styles.authorBoxSelected : styles.authorBox}
                  onPress={() => toggleGenreSelect(genre.id)}
                  activeOpacity={0.8}
                >
                  <View style={{flex: 1}}>
                    <Text style={selectedGenreIds.includes(genre.id) ? styles.authorNameSelected : styles.authorName}>{genre.name}</Text>
                    <Text style={styles.authorSubtitle} numberOfLines={1}>{genre.description}</Text>
                  </View>
                  <View style={selectedGenreIds.includes(genre.id) ? styles.authorRadioSelected : styles.authorRadioUnselected} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => {
                const selectedNames = genres
                  .filter(genre => selectedGenreIds.includes(genre.id))
                  .map(genre => genre.name);
                
                setFilteredGenres(selectedNames);
                setShowGenreModal(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );

  const RatingsModal = () => (
    <View style={styles.filterOverlay}>
      <TouchableOpacity style={styles.filterBackdrop} onPress={handleCloseFilter} />
      <View style={styles.filterMenuContainer}>
        <View style={styles.filterMenuBackground}>
          <SvgXml xml={FilterBackgroundSVG} width={393} height={582} />
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.filterMenu}>
            <View style={styles.authorHeaderRow}>
              <Text style={styles.filterTitle}>Search Filters <Text style={styles.authorHeaderGray}>Ratings</Text></Text>
            </View>
            <View style={styles.authorSearchBar}>
              <SvgXml xml={SearchLoupeIcon} width={20} height={20} style={{marginLeft: 12, marginRight: 8}} />
              <TextInput
                style={styles.authorSearchInput}
                placeholder="Search Ratings"
                placeholderTextColor="#898A8D"
                value={ratingsSearch}
                onChangeText={setRatingsSearch}
                blurOnSubmit={false}
                returnKeyType="search"
              />
            </View>
            <ScrollView 
              style={{flex: 1, marginTop: 12, maxHeight: 380}}
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              nestedScrollEnabled={true}
            >
              {ratings.filter(r => r.name.toLowerCase().includes(ratingsSearch.toLowerCase())).map((rating) => (
                <TouchableOpacity
                  key={rating.id}
                  style={selectedRatingsIds.includes(rating.id) ? styles.authorBoxSelected : styles.authorBox}
                  onPress={() => toggleRatingsSelect(rating.id)}
                  activeOpacity={0.8}
                >
                  <View style={{flex: 1}}>
                    <Text style={selectedRatingsIds.includes(rating.id) ? styles.authorNameSelected : styles.authorName}>
                      {rating.value} Star{rating.value > 1 ? 's' : ''}
                    </Text>
                    <SvgXml 
                      xml={
                        rating.value === 1 ? RatingStars1SVG :
                        rating.value === 2 ? RatingStars2SVG :
                        rating.value === 3 ? RatingStars3SVG :
                        rating.value === 4 ? RatingStars4SVG :
                        RatingStars5SVG
                      } 
                      width={108} 
                      height={20} 
                      style={{marginTop: 4}} 
                    />
                  </View>
                  <View style={selectedRatingsIds.includes(rating.id) ? styles.authorRadioSelected : styles.authorRadioUnselected} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => {
                const selectedValues = ratings
                  .filter(rating => selectedRatingsIds.includes(rating.id))
                  .map(rating => rating.value + " Star" + (rating.value > 1 ? 's' : ''));
                
                setFilteredRatings(selectedValues);
                setShowRatingsModal(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );

  const AgeRatingsModal = () => (
    <View style={styles.filterOverlay}>
      <TouchableOpacity style={styles.filterBackdrop} onPress={handleCloseFilter} />
      <View style={styles.filterMenuContainer}>
        <View style={styles.filterMenuBackground}>
          <SvgXml xml={FilterBackgroundSVG} width={393} height={582} />
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.filterMenu}>
            <View style={styles.authorHeaderRow}>
              <Text style={styles.filterTitle}>Search Filters <Text style={styles.authorHeaderGray}>Age Ratings</Text></Text>
            </View>
            <View style={styles.authorSearchBar}>
              <SvgXml xml={SearchLoupeIcon} width={20} height={20} style={{marginLeft: 12, marginRight: 8}} />
              <TextInput
                style={styles.authorSearchInput}
                placeholder="Search Age Ratings"
                placeholderTextColor="#898A8D"
                value={ageRatingsSearch}
                onChangeText={setAgeRatingsSearch}
                blurOnSubmit={false}
                returnKeyType="search"
              />
            </View>
            <ScrollView 
              style={{flex: 1, marginTop: 12, maxHeight: 380}}
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              nestedScrollEnabled={true}
            >
              {ageRatings.filter(a => a.name.toLowerCase().includes(ageRatingsSearch.toLowerCase())).map((ageRating) => (
                <TouchableOpacity
                  key={ageRating.id}
                  style={selectedAgeRatingsIds.includes(ageRating.id) ? styles.authorBoxSelected : styles.authorBox}
                  onPress={() => toggleAgeRatingsSelect(ageRating.id)}
                  activeOpacity={0.8}
                >
                  <View style={{flex: 1}}>
                    <Text style={selectedAgeRatingsIds.includes(ageRating.id) ? styles.authorNameSelected : styles.authorName}>{ageRating.name}</Text>
                    <Text style={styles.authorSubtitle} numberOfLines={1}>{ageRating.description}</Text>
                  </View>
                  <View style={selectedAgeRatingsIds.includes(ageRating.id) ? styles.authorRadioSelected : styles.authorRadioUnselected} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => {
                const selectedNames = ageRatings
                  .filter(ageRating => selectedAgeRatingsIds.includes(ageRating.id))
                  .map(ageRating => ageRating.name);
                
                setFilteredAgeRatings(selectedNames);
                setShowAgeRatingsModal(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
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
                <View style={{width: '100%', alignItems: 'center'}}>
                  {/* Author Filter */}
                  <TouchableOpacity style={styles.filterItem} onPress={() => setShowAuthorModal(true)}>
                    <View style={styles.filterItemContent}>
                      <Text style={styles.filterLabel}>Author</Text>
                      <Text style={styles.filterValue}>
                        {filteredAuthors.length > 0 
                          ? filteredAuthors.join(', ') 
                          : "Steve McQueen, J.K. Rowlings, Elo..."}
                      </Text>
                    </View>
                    <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                  </TouchableOpacity>
                  {/* Genre Filter */}
                  <TouchableOpacity style={styles.filterItem} onPress={() => setShowGenreModal(true)}>
                    <View style={styles.filterItemContent}>
                      <Text style={styles.filterLabel}>Genre</Text>
                      <Text style={styles.filterValue}>
                        {filteredGenres.length > 0 
                          ? filteredGenres.join(', ') 
                          : "Horror, Comedy, Zombie"}
                      </Text>
                    </View>
                    <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                  </TouchableOpacity>
                  {/* Ratings Filter */}
                  <TouchableOpacity style={styles.filterItem} onPress={() => setShowRatingsModal(true)}>
                    <View style={styles.filterItemContent}>
                      <Text style={styles.filterLabel}>Ratings</Text>
                      {filteredRatings.length > 0 
                        ? (
                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.filterValue}>{filteredRatings.join(', ')}</Text>
                          </View>
                        )
                        : <SvgXml xml={RatingStarsSVG} width={108} height={20} />
                      }
                    </View>
                    <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                  </TouchableOpacity>
                  {/* Age Ratings Filter */}
                  <TouchableOpacity style={styles.filterItem} onPress={() => setShowAgeRatingsModal(true)}>
                    <View style={styles.filterItemContent}>
                      <Text style={styles.filterLabel}>Age Ratings</Text>
                      <Text style={styles.filterValue}>
                        {filteredAgeRatings.length > 0 
                          ? filteredAgeRatings.join(', ') 
                          : "3+, 13+"}
                      </Text>
                    </View>
                    <SvgXml xml={ArrowRightIcon} width={24} height={24} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.filterActions}>
                <TouchableOpacity 
                  style={styles.clearFiltersButton}
                  onPress={handleClearFilters}
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

      {showAuthorModal && <AuthorModal />}
      {showGenreModal && <GenreModal />}
      {showRatingsModal && <RatingsModal />}
      {showAgeRatingsModal && <AgeRatingsModal />}
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
    position: 'absolute',
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
    flex: 1,
    flexDirection: 'column',
    height: '100%',
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
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'center',
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
    gap: 0,
    bottom: -26,
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
    width: '90%',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 12,
    paddingVertical: 16,
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
  authorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 8,
  },
  authorHeaderGray: {
    color: '#ABB0BA',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    marginLeft: 4,
  },
  authorSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 64.815 },
    shadowOpacity: 0.03,
    shadowRadius: 46.852,
    elevation: 8,
  },
  authorSearchInput: {
    flex: 1,
    width: '100%',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#898A8D',
    lineHeight: 28,
    letterSpacing: -0.56,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingLeft: 8,
  },
  authorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 64,
  },
  authorBoxSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EB4D2A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 64,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#1E1E1E',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: -0.8,
  },
  authorNameSelected: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#EB4D2A',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 28,
    letterSpacing: -0.8,
  },
  authorSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: '#ABB0BA',
    fontWeight: '400',
    marginTop: 2,
  },
  authorRadioSelected: {
    width: 12,
    height: 12,
    borderRadius: 38.235,
    backgroundColor: '#EB4D2A',
    marginLeft: 16,
    borderWidth: 2,
    borderColor: '#EB4D2A',
  },
  authorRadioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 38.235,
    backgroundColor: 'transparent',
    marginLeft: 16,
    borderWidth: 2,
    borderColor: 'rgba(171, 176, 186, 0.60)',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
});