import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Book } from '../types';

const { width: screenWidth } = Dimensions.get('window');

interface BookCardProps {
  book: Book;
  onPress: (book: Book) => void;
  showAuthor?: boolean;
  variant?: 'small' | 'medium' | 'large';
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onPress, 
  showAuthor = true, 
  variant = 'medium' 
}) => {
  const cardWidth = variant === 'small' ? 120 : variant === 'large' ? 180 : 140;
  const imageHeight = variant === 'small' ? 160 : variant === 'large' ? 240 : 200;

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth }]} 
      onPress={() => onPress(book)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={typeof book.coverUrl === 'string' ? { uri: book.coverUrl } : book.coverUrl} 
          style={[styles.bookImage, { height: imageHeight }]}
          resizeMode="cover"
        />
        {book.rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {book.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {book.title}
        </Text>
        
        {showAuthor && (
          <Text style={styles.bookAuthor} numberOfLines={1}>
            {book.author}
          </Text>
        )}
        
        {book.genres.length > 0 && (
          <Text style={styles.bookGenre} numberOfLines={1}>
            {book.genres[0]}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Bogart-Medium-trial',
  },
  bookInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Semibold-trial',
    color: '#1E1E1E',
    lineHeight: 18,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666',
    marginBottom: 2,
  },
  bookGenre: {
    fontSize: 11,
    fontFamily: 'Bogart-Regular-trial',
    color: '#999',
  },
}); 