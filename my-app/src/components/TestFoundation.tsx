import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BooksContext';
import { useReadingLists } from '../context/ReadingListsContext';
import { COLORS } from '../constants/colors';
import { formatDate, formatNumber } from '../utils/formatters';

export const TestFoundation: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { books, trending, recommended, isLoading: booksLoading } = useBooks();
  const { readingLists, isLoading: listsLoading } = useReadingLists();

  if (authLoading || booksLoading || listsLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔄 Loading Foundation...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>✅ Pagez Foundation Test</Text>
      
      {/* Auth Context Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔐 Authentication Context</Text>
        <Text style={styles.text}>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
        <Text style={styles.text}>User: {user ? user.displayName : 'Not logged in'}</Text>
      </View>

      {/* Books Context Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Books Context</Text>
        <Text style={styles.text}>Total Books: {books.length}</Text>
        <Text style={styles.text}>Trending Books: {trending.length}</Text>
        <Text style={styles.text}>Recommended Books: {recommended.length}</Text>
        {books.length > 0 && (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{books[0].title}</Text>
            <Text style={styles.bookAuthor}>by {books[0].author}</Text>
            <Text style={styles.bookRating}>⭐ {books[0].rating}/5 ({formatNumber(books[0].totalRatings)} ratings)</Text>
          </View>
        )}
      </View>

      {/* Reading Lists Context Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Reading Lists Context</Text>
        <Text style={styles.text}>Total Reading Lists: {readingLists.length}</Text>
        {readingLists.map((list) => (
          <View key={list.id} style={styles.listItem}>
            <Text style={styles.listName}>{list.name}</Text>
            <Text style={styles.listBooks}>{list.totalBooks} books</Text>
          </View>
        ))}
      </View>

      {/* Constants Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Constants & Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: COLORS.primary[500] }]} />
          <Text style={styles.text}>Primary Color</Text>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: COLORS.secondary[500] }]} />
          <Text style={styles.text}>Secondary Color</Text>
        </View>
      </View>

      {/* Utilities Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Utilities</Text>
        <Text style={styles.text}>Date Formatting: {formatDate('2024-01-01T00:00:00Z')}</Text>
        <Text style={styles.text}>Number Formatting: {formatNumber(1500)} • {formatNumber(2500000)}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.successText}>🎉 All Foundation Components Working!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.text.primary,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary[500],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text.primary,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: COLORS.text.secondary,
  },
  bookItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.background.primary,
    borderRadius: 6,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  bookAuthor: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  bookRating: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginTop: 4,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  listName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.primary,
  },
  listBooks: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  footer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: COLORS.success[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.success[200],
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.success[700],
  },
}); 