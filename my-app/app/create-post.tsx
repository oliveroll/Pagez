import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import ActivitySelector from '../src/components/ActivitySelector';

const { width: screenWidth } = Dimensions.get('window');

// Define the curved header SVG
const headerBackgroundSvg = `<svg width="393" height="100" viewBox="0 0 393 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H393V60C393 82.0914 375.091 100 353 100H40C17.9086 100 0 82.0914 0 60V0Z" fill="#F4EFEA"/>
</svg>`;

// Define SVG for the chevron icon
const chevronRightSvg = `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 13L7 7L1 1" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function CreatePostScreen() {
  const [selectedBook, setSelectedBook] = useState({
    title: 'Beloved Girls',
    coverImage: require('../src/assets/images/homepage/Sisters.png'),
  });

  const [selectedActivity, setSelectedActivity] = useState('Reading');
  const [isActivitySelectorVisible, setIsActivitySelectorVisible] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handlePostPress = () => {
    // TODO: Implement post creation logic
    router.back();
  };

  const handleBookSelect = () => {
    // TODO: Navigate to book selection screen
    console.log('Navigate to book selection');
  };

  const handleActivitySelect = () => {
    setIsActivitySelectorVisible(true);
  };

  return (
    <>
      <Stack.Screen options={{ 
        headerShown: false,
      }} />
      <View style={styles.container}>
        {/* Curved Header Background */}
        <View style={styles.headerBackground}>
          <SvgXml xml={headerBackgroundSvg} width={screenWidth} height={100} />
        </View>

        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#EB4D2A" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>New Post</Text>
              <View style={{ width: 40 }} />
            </View>
            <View style={styles.headerBorder} />
          </View>

          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Activity Selector */}
            <TouchableOpacity style={styles.selectorButton} onPress={handleActivitySelect}>
              <Text style={styles.sectionLabel}>{selectedActivity}...</Text>
              <SvgXml xml={chevronRightSvg} width={8} height={14} />
            </TouchableOpacity>

            {/* Book Selector */}
            <TouchableOpacity style={styles.selectorButton} onPress={handleBookSelect}>
              <View style={styles.bookInfo}>
                <Image 
                  source={selectedBook.coverImage}
                  style={styles.bookCover}
                />
                <View style={styles.bookTextContainer}>
                  <Text style={styles.sectionLabel}>Select the book</Text>
                  <Text style={styles.bookTitle}>{selectedBook.title}</Text>
                </View>
              </View>
              <SvgXml xml={chevronRightSvg} width={8} height={14} />
            </TouchableOpacity>

            {/* Rating Selector */}
            <TouchableOpacity style={styles.selectorButton}>
              <Text style={styles.sectionLabel}>Share rating?</Text>
              <SvgXml xml={chevronRightSvg} width={8} height={14} />
            </TouchableOpacity>

            {/* Opinion Input */}
            <View style={styles.opinionContainer}>
              <TextInput
                style={styles.opinionInput}
                multiline
                placeholder="Your Opinion"
                placeholderTextColor="rgba(30, 30, 30, 0.3)"
                textAlignVertical="top"
              />
            </View>

            {/* Attach Image Button */}
            <TouchableOpacity style={styles.attachButton}>
              <Text style={styles.attachButtonText}>Attach Image</Text>
            </TouchableOpacity>

            {/* Post Button */}
            <TouchableOpacity style={styles.bottomPostButton} onPress={handlePostPress}>
              <Text style={styles.bottomPostButtonText}>Post it</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Activity Selector Modal */}
          <ActivitySelector
            visible={isActivitySelectorVisible}
            onClose={() => setIsActivitySelectorVisible(false)}
            onSelect={setSelectedActivity}
            selectedActivity={selectedActivity}
          />
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEA',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    zIndex: 2,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBorder: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.75)',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#1E1E1E',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.32,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookCover: {
    width: 40,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  bookTextContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#898A8D',
    marginTop: 4,
  },
  opinionContainer: {
    marginTop: 8,
  },
  opinionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    height: 200,
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.32,
    textAlignVertical: 'top',
  },
  attachButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  attachButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#1E1E1E',
  },
  bottomPostButton: {
    backgroundColor: '#EB4D2A',
    borderRadius: 100,
    padding: 16,
    marginTop: 'auto',
    marginBottom: 16,
    alignItems: 'center',
  },
  bottomPostButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#FFFFFF',
  },
}); 