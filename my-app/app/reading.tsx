import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Share,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { SvgXml } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Import SVG assets
const leftArrowSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_2571)">
<path d="M4.00977 11.98H18.9998" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.013 5.98801L4.00195 12L10.013 18.012" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4_2571">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const equalizerSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_2636)">
<path d="M4 6V18" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 9V15" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6V18" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 3V21" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 8V16" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

const bookmarkSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_2564)">
<path d="M7.7002 3H16.3002C17.4052 3 18.3002 3.895 18.3002 5V21L12.0082 17.727L5.7002 21V5C5.7002 3.895 6.5952 3 7.7002 3Z" stroke="#EB4D2A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

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

export default function ReadingScreen() {
  const params = useLocalSearchParams();
  const { title, author, bookId = '1' } = params;
  const [readingProgress, setReadingProgress] = useState(0.25);
  const [selectedText, setSelectedText] = useState('');
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const scrollViewRef = useRef(null);

  const handleBackPress = () => {
    router.back();
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setReadingProgress(Math.min(Math.max(progress, 0), 1));
  };

  const handleTextSelection = (event) => {
    const selection = event.nativeEvent.selection;
    if (selection && selection.start !== selection.end) {
      setSelectedText(selection.text);
      showHighlightOptions();
    }
  };

  const showHighlightOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Highlight Yellow', 'Highlight Green', 'Highlight Blue', 'Highlight Pink', 'Share Quote'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            // Cancel
            return;
          } else if (buttonIndex === 5) {
            handleShareQuote();
          } else {
            const colors = ['yellow', 'green', 'blue', 'pink'];
            handleHighlight(colors[buttonIndex - 1] as Highlight['color']);
          }
        }
      );
    } else {
      // For Android, you would implement a similar menu using a custom component
      Alert.alert(
        'Text Options',
        'Choose an action',
        [
          { text: 'Highlight Yellow', onPress: () => handleHighlight('yellow') },
          { text: 'Highlight Green', onPress: () => handleHighlight('green') },
          { text: 'Highlight Blue', onPress: () => handleHighlight('blue') },
          { text: 'Highlight Pink', onPress: () => handleHighlight('pink') },
          { text: 'Share Quote', onPress: () => handleShareQuote() },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleHighlight = (color: Highlight['color']) => {
    if (!selectedText) return;

    const newHighlight: Highlight = {
      id: Date.now().toString(),
      bookId: bookId as string,
      userId: 'current-user', // This would come from auth context in real app
      text: selectedText,
      color,
      startPosition: 0, // In real app, you'd track the actual position
      endPosition: selectedText.length,
      createdAt: new Date().toISOString(),
    };

    setHighlights(prev => [...prev, newHighlight]);
    setSelectedText('');
  };

  const handleShareQuote = async () => {
    if (!selectedText) return;

    try {
      await Share.share({
        message: `"${selectedText}" - from ${title}`,
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const renderHighlightedText = (text: string) => {
    // In a real app, you would implement more sophisticated text rendering
    // that shows highlights at their correct positions
    return highlights.reduce((renderedText, highlight) => {
      const highlightStyle = getHighlightStyle(highlight.color);
      return renderedText.replace(
        highlight.text,
        `<Text style={${JSON.stringify(highlightStyle)}}>${highlight.text}</Text>`
      );
    }, text);
  };

  const getHighlightStyle = (color: Highlight['color']) => {
    const colors = {
      yellow: 'rgba(255, 235, 59, 0.3)',
      green: 'rgba(76, 175, 80, 0.3)',
      blue: 'rgba(33, 150, 243, 0.3)',
      pink: 'rgba(233, 30, 99, 0.3)',
    };
    return {
      backgroundColor: colors[color],
    };
  };

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: false,
      }} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.leftSection}>
              <TouchableOpacity onPress={handleBackPress} style={styles.iconCircle}>
                <SvgXml xml={leftArrowSvg} width={24} height={24} />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.bookTitle}>{title}</Text>
                <Text style={[styles.chapterInfo, { marginTop: -8 }]}>Chapter 3 – Page 57</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconCircle}>
                <SvgXml xml={equalizerSvg} width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle}>
                <SvgXml xml={bookmarkSvg} width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.progressLineContainer}>
            <View style={[styles.progressLine, { width: `${readingProgress * 100}%` }]} />
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.textContent}>
            <View style={styles.readingContainer}>
              <Text 
                style={styles.readerText} 
                selectable={true}
                onPress={() => {}}
              >
                Brilliantly styled as a translation of an ancient epic, Victory City is a saga of love, adventure, and myth that is in itself a testament to the power of storytelling.
              </Text>

              <View style={styles.highlightContainer}>
                <Text 
                  style={styles.highlightedText} 
                  selectable={true}
                  onPress={() => {}}
                >
                  "Victory City is a triumph—not because it exists, but because it is utterly enchanting."
                </Text>
                <Text style={styles.highlightSource}>—The Atlantic</Text>
              </View>

              <Text 
                style={styles.readerText} 
                selectable={true}
                onPress={() => {}}
              >
                In the wake of an unimportant battle between two long-forgotten kingdoms in fourteenth-century southern India, a nine-year-old girl has a divine encounter that will change the course of history. After witnessing the death of her mother, the grief-stricken Pampa Kampana becomes a vessel for a goddess, who begins to speak out of the girl's mouth.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Info Box */}
        <View style={styles.bottomInfoContainer}>
          <View style={styles.bottomInfoBox}>
            <View style={styles.bottomInfoContent}>
              <Text style={styles.bottomBookTitle}>Pretty Little Liars</Text>
              <Text style={styles.bottomChapterInfo}>Chapter 3 – Page 57</Text>
            </View>
            <TouchableOpacity style={styles.pauseButton}>
              <Text style={styles.pauseButtonText}>II</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEA',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 8 : 20,
    backgroundColor: '#F4EFEA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F4EFEA',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4EFEA',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  bookTitle: {
    color: '#1E1E1E',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.56,
  },
  chapterInfo: {
    color: '#898A8D',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: -0.56,
    marginTop: -8,
  },
  headerBorder: {
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  textContent: {
    width: '100%',
    minHeight: 683,
    paddingVertical: 20,
  },
  readingContainer: {
    width: 353,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  readerText: {
    width: '100%',
    color: '#000',
    fontFamily: 'New York',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 31,
    marginBottom: 20,
    textAlign: 'left',
    paddingVertical: 10,
  },
  highlightContainer: {
    width: '100%',
    backgroundColor: 'rgba(235, 77, 42, 0.1)',
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
  },
  highlightedText: {
    width: '100%',
    color: '#000',
    fontFamily: 'New York',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 31,
    marginBottom: 8,
    textAlign: 'left',
  },
  highlightSource: {
    width: '100%',
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#898A8D',
    textAlign: 'left',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    width: '57%',
    height: '100%',
    backgroundColor: '#EB4D2A',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
    color: '#898A8D',
  },
  progressLineContainer: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#EB4D2A',
  },
  bottomInfoContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomInfoBox: {
    width: 353,
    height: 70,
    flexShrink: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(137, 138, 141, 0.54)',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 64.815,
    },
    shadowOpacity: 0.03,
    shadowRadius: 46.852,
    elevation: 5,
  },
  bottomInfoContent: {
    flex: 1,
  },
  bottomBookTitle: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  bottomChapterInfo: {
    color: '#898A8D',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  pauseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EB4D2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
}); 