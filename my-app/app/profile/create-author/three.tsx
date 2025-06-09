//link/navigate to author

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [bio, setBio] = useState('');

  // TODO: Backend developer - integrate with user profile API
  const handleContinue = () => {
    // TODO: Save bio data to backend
    console.log('Bio to save:', bio);
    
    // Navigate to next screen - replace with actual destination
    router.push('/next-step' as any);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F7EFF" />
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Pagez Author</Text>
          
          {/* Placeholder for header balance */}
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Tell more about yourself</Text>
          
          <View style={styles.bioContainer}>
            <Text style={styles.bioLabel}>Bio</Text>
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              placeholder="Write about yourself, your interests, and what you love to read..."
              placeholderTextColor="#A0A0A0"
              multiline
              textAlignVertical="top"
              maxLength={500}
              // TODO: Backend developer - add character count validation
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            bio.trim().length > 0 ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={bio.trim().length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7EFF',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height - 120, // Account for bottom button
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
    color: 'white',
    marginBottom: 40,
    lineHeight: 38,
  },
  bioContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 200,
  },
  bioLabel: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  bioInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333333',
    lineHeight: 24,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  bottomContainer: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  continueButton: {
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  continueButtonActive: {
    backgroundColor: '#4F7EFF',
  },
  continueButtonInactive: {
    backgroundColor: '#B0B0B0',
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: 'white',
  },
});

// TODO: Backend developer integration points:
// 1. Replace mock bio state with user profile data from API
// 2. Implement handleContinue function to save bio to backend
// 3. Add proper error handling for API calls
// 4. Add loading states during API operations
// 5. Implement character count validation (currently set to 500 max)
// 6. Add proper navigation flow based on user completion status