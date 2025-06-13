import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { Highlight } from '../types';
import * as Clipboard from 'expo-clipboard';

interface QuoteShareProps {
  highlight: Highlight;
  onClose: () => void;
}

export const QuoteShare: React.FC<QuoteShareProps> = ({ highlight, onClose }) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${highlight.text}" - from ${highlight.bookId}`,
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(highlight.text);
    } catch (error) {
      console.error('Error copying quote:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{highlight.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quote: {
    fontFamily: 'New York',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#EB4D2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },
}); 