import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Mock data - Replace with actual API calls
const mockBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Percy Jackson and the Olympians',
    author: 'Rick Riordan',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Fire Dance',
    author: 'Unknown Author',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
  },
];

const mockAuthors = ['Steve McQueen', 'J.K. Rowlings', 'Elon Musk'];
const mockGenres = ['Horror', 'Comedy', 'Zombie'];
const mockAgeRatings = ['3+', '13+'];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState(3); // 3 out of 5 stars

  const renderStars = (rating: number, maxRating: number = 5) => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Text
          key={i}
          style={[
            styles.star,
            { color: i <= rating ? '#FF4444' : '#E0E0E0' }
          ]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search API call
    console.log('Searching for:', query);
  };

  const handleFilterPress = (filterType: string) => {
    // TODO: Navigate to detailed filter screens
    router.push(`/filters/${filterType.toLowerCase()}` as any);
  };

  const handleBookPress = (bookId: number) => {
    // TODO: Navigate to book details
    router.push(`/book/${bookId}` as any);
  };

  const handleClearFilters = () => {
    // TODO: Clear all applied filters
    console.log('Clearing filters');
  };

  const handleDone = () => {
    // TODO: Apply filters and navigate back
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Community"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <TouchableOpacity style={styles.filterIcon}>
                <Text style={styles.filterIconText}>🔻</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Book Showcase */}
        <View style={styles.booksSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockBooks.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={styles.bookItem}
                onPress={() => handleBookPress(book.id)}
              >
                <View style={styles.bookCover}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search Filters Section */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Search Filters</Text>
          
          {/* Author Filter */}
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => handleFilterPress('Author')}
          >
            <View style={styles.filterContent}>
              <Text style={styles.filterLabel}>Author</Text>
              <Text style={styles.filterValue}>
                {mockAuthors.join(', ')}...
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {/* Genre Filter */}
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => handleFilterPress('Genre')}
          >
            <View style={styles.filterContent}>
              <Text style={styles.filterLabel}>Genre</Text>
              <Text style={styles.filterValue}>
                {mockGenres.join(', ')}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {/* Ratings Filter */}
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => handleFilterPress('Ratings')}
          >
            <View style={styles.filterContent}>
              <Text style={styles.filterLabel}>Ratings</Text>
              <View style={styles.starsContainer}>
                {renderStars(selectedRating)}
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {/* Age Ratings Filter */}
          <TouchableOpacity
            style={styles.filterItem}
            onPress={() => handleFilterPress('Age Ratings')}
          >
            <View style={styles.filterContent}>
              <Text style={styles.filterLabel}>Age Ratings</Text>
              <Text style={styles.filterValue}>
                {mockAgeRatings.join(', ')}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearFilters}
        >
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Done</Text>
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
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  searchContainer: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  filterIcon: {
    marginLeft: 8,
  },
  filterIconText: {
    fontSize: 14,
    color: '#FF4444',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  booksSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bookItem: {
    marginRight: 12,
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFF',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  filtersSection: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    minHeight: height * 0.5,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 20,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  filterContent: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 4,
  },
  filterValue: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#888',
  },
  chevron: {
    fontSize: 24,
    color: '#CCC',
    fontFamily: 'Bogart-Regular-Trial',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    marginRight: 2,
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFF',
  },
});

// TODO: Backend Integration Points
// 1. Replace mockBooks with API call to fetch user's book library
// 2. Replace mockAuthors with dynamic author list from API
// 3. Replace mockGenres with API-driven genre categories
// 4. Implement search functionality with backend search endpoint
// 5. Add real filter application logic with API parameters
// 6. Connect profile image to user authentication system
// 7. Implement real navigation routing for filter detail screens