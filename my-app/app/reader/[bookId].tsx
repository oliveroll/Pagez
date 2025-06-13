import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ReaderView } from '../../src/components/reader/ReaderView';
import { Highlight as HighlightComponent } from '../../src/components/reader/Highlight';
import { QuoteShare } from '../../src/components/reader/QuoteShare';

// Define the interface directly in this file
interface Highlight {
  id: string;
  bookId: string;
  userId: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  startPosition: number;
  endPosition: number;
  createdAt: string;
}

export default function ReaderScreen() {
  const { bookId, title, author } = useLocalSearchParams();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [showQuoteShare, setShowQuoteShare] = useState(false);

  console.log('Reader Screen - bookId:', bookId, 'title:', title, 'author:', author);

  const handleTextSelection = useCallback((selectedText: string, start: number, end: number) => {
    console.log('Text selected:', selectedText, 'start:', start, 'end:', end);
    if (selectedText.trim()) {
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        bookId: bookId as string,
        userId: 'user123', // Replace with actual user ID
        text: selectedText,
        color: 'yellow',
        startPosition: start,
        endPosition: end,
        createdAt: new Date().toISOString(),
      };
      setHighlights(prev => [...prev, newHighlight]);
    }
  }, [bookId]);

  const handleDeleteHighlight = useCallback((highlightId: string) => {
    setHighlights(prev => prev.filter(h => h.id !== highlightId));
  }, []);

  const handleHighlightPress = useCallback((highlight: Highlight) => {
    setSelectedHighlight(highlight);
    setShowQuoteShare(true);
  }, []);

  const handleCloseQuoteShare = useCallback(() => {
    setShowQuoteShare(false);
    setSelectedHighlight(null);
  }, []);

  // Mock book content - replace with actual content from your backend
  const mockContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

  console.log('Mock content length:', mockContent.length);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Reader Screen - Book ID: {bookId}</Text>
      <Text style={styles.debugText}>Content length: {mockContent.length} characters</Text>
      
      <ReaderView
        content={mockContent}
        highlights={highlights}
        onTextSelection={handleTextSelection}
      />
      
      {highlights.map(highlight => (
        <HighlightComponent
          key={highlight.id}
          highlight={highlight}
          onDelete={handleDeleteHighlight}
          onShare={() => handleHighlightPress(highlight)}
          onCopy={() => handleHighlightPress(highlight)}
        />
      ))}

      {showQuoteShare && selectedHighlight && (
        <QuoteShare
          highlight={selectedHighlight}
          onClose={handleCloseQuoteShare}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF3EC',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EB4D2A',
    marginBottom: 10,
    textAlign: 'center',
  },
  debugText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
}); 