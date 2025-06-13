import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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

interface ReaderViewProps {
  content: string;
  highlights: Highlight[];
  onTextSelection: (selectedText: string, start: number, end: number) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  content,
  highlights,
  onTextSelection,
}) => {
  const [selectedWords, setSelectedWords] = useState<number[]>([]);

  console.log('ReaderView - content length:', content?.length, 'highlights:', highlights?.length);

  const getHighlightColor = (color: string) => {
    const colors = {
      yellow: 'rgba(255, 235, 59, 0.4)',
      green: 'rgba(76, 175, 80, 0.3)',
      blue: 'rgba(33, 150, 243, 0.3)',
      pink: 'rgba(233, 30, 99, 0.3)',
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

  // Split content into words and spaces, keeping track of positions
  const createWords = () => {
    if (!content) return [];
    
    const words = [];
    let currentPosition = 0;
    
    // Split by spaces but keep the spaces
    const parts = content.split(/(\s+)/);
    
    parts.forEach((part, index) => {
      const start = currentPosition;
      const end = currentPosition + part.length;
      
      words.push({
        text: part,
        index,
        start,
        end,
        isWord: part.trim().length > 0
      });
      
      currentPosition = end;
    });
    
    console.log('Created words:', words.length);
    return words;
  };

  const words = createWords();

  const isWordHighlighted = (wordStart: number, wordEnd: number) => {
    return highlights.some(h => 
      wordStart >= h.startPosition && wordEnd <= h.endPosition
    );
  };

  const isWordSelected = (index: number) => {
    return selectedWords.includes(index);
  };

  const handleWordPress = (wordIndex: number) => {
    if (selectedWords.includes(wordIndex)) {
      // Deselect word
      setSelectedWords(prev => prev.filter(i => i !== wordIndex));
    } else {
      // Select word
      setSelectedWords(prev => [...prev, wordIndex]);
    }
  };

  const handleCreateHighlight = () => {
    if (selectedWords.length === 0) return;

    // Sort selected word indices
    const sortedIndices = [...selectedWords].sort((a, b) => a - b);
    const firstWord = words[sortedIndices[0]];
    const lastWord = words[sortedIndices[sortedIndices.length - 1]];
    
    // Get the actual text from the content using positions
    const selectedText = content.substring(firstWord.start, lastWord.end);

    onTextSelection(selectedText.trim(), firstWord.start, lastWord.end);
    setSelectedWords([]);
  };

  const renderWord = (word: any, index: number) => {
    if (!word.isWord) {
      // Return spaces/punctuation as-is
      return <Text key={index} style={styles.readerText}>{word.text}</Text>;
    }

    const isHighlighted = isWordHighlighted(word.start, word.end);
    const isSelected = isWordSelected(index);
    
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleWordPress(index)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.readerText,
            isHighlighted && { backgroundColor: getHighlightColor('yellow') },
            isSelected && { backgroundColor: 'rgba(235, 77, 42, 0.3)' }
          ]}
        >
          {word.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {words.map((word, index) => renderWord(word, index))}
      </View>
      
      {selectedWords.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.highlightButton}
            onPress={handleCreateHighlight}
          >
            <Text style={styles.buttonText}>
              Highlight ({selectedWords.length} words)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => setSelectedWords([])}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Debug info */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          Selected: {selectedWords.length} words | Highlights: {highlights.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 353,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  readerText: {
    color: '#000',
    fontFamily: 'New York',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 31,
    textAlign: 'left',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    paddingVertical: 10,
  },
  highlightButton: {
    backgroundColor: '#EB4D2A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
}); 