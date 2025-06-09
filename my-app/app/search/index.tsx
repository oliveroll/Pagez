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
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data - Backend developer should replace with API calls
const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverColor: '#2E5BBA',
    coverImage: 'https://example.com/gatsby-cover.jpg', // Replace with actual image URLs
  },
  {
    id: '2',
    title: 'Percy Jackson and the Olympians',
    author: 'Rick Riordan',
    subtitle: 'The Chalice of the Gods',
    coverColor: '#1A4B3A',
    coverImage: 'https://example.com/percy-cover.jpg',
  },
  {
    id: '3',
    title: 'Fire Dance',
    author: 'Ilana C. Myer',
    coverColor: '#1B2B47',
    coverImage: 'https://example.com/fire-dance-cover.jpg',
  },
  {
    id: '4',
    title: 'Ghost Forest',
    author: 'Pik-Shuen Fung',
    coverColor: '#F4D03F',
    coverImage: 'https://example.com/ghost-forest-cover.jpg',
  },
  {
    id: '5',
    title: 'Tucked Away',
    author: 'Phyllis Rudin',
    coverColor: '#DC3545',
    coverImage: 'https://example.com/tucked-away-cover.jpg',
  },
  {
    id: '6',
    title: 'Late Night Thoughts',
    author: 'Written by Me',
    coverColor: '#2C2C2C',
    coverImage: 'https://example.com/late-night-cover.jpg',
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
      style={[styles.bookCard, { backgroundColor: book.coverColor }]}
      onPress={() => handleBookPress(book.id)}
      activeOpacity={0.8}
    >
      {/* TODO: Backend integration - Replace with actual book cover images */}
      <View style={styles.bookContent}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
        {book.subtitle && (
          <Text style={styles.bookSubtitle}>{book.subtitle}</Text>
        )}
      </View>
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Community"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setShowKeyboard(true)}
            onSubmitEditing={() => handleSearch(searchText)}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🏷️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profileImage}>
            {/* TODO: Backend integration - Replace with actual user profile image */}
            <Text style={styles.profileInitial}>U</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Books Grid */}
        <View style={styles.booksGrid}>
          {MOCK_BOOKS.map(renderBookCard)}
        </View>

        {/* Partial book cards at bottom */}
        <View style={styles.partialCards}>
          <View style={[styles.partialCard, { backgroundColor: '#E8E8E8' }]} />
          <View style={[styles.partialCard, { backgroundColor: '#E8E8E8' }]} />
          <View style={[styles.partialCard, { backgroundColor: '#E8E8E8' }]} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backArrow: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  filterButton: {
    padding: 4,
  },
  filterIcon: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  profileButton: {
    width: 44,
    height: 44,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  bookCard: {
    width: (width - 48) / 3,
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    justifyContent: 'flex-end',
  },
  bookContent: {
    alignItems: 'flex-start',
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bookSubtitle: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  partialCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  partialCard: {
    width: (width - 48) / 3,
    height: 40,
    borderRadius: 8,
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
});