import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [authorName, setAuthorName] = useState('J.K. Rowlings');
  const [username, setUsername] = useState('jkr');
  const [profileImage, setProfileImage] = useState(null);

  // Mock profile image URL - replace with actual image picker logic
  const mockProfileImage = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';

  const handleBack = () => {
    // TODO: Navigate back to previous screen
    router.back();
  };

  const handleChoosePicture = () => {
    // TODO: Implement image picker functionality
    // This would typically open camera roll or camera
    console.log('Choose picture pressed');
    router.push('/image-picker' as any);
  };

  const handleContinue = () => {
    // TODO: Save profile data to backend
    // API call to save authorName, username, and profileImage
    console.log('Continue pressed with data:', {
      authorName,
      username,
      profileImage: profileImage || mockProfileImage
    });
    router.push('/dashboard' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pagez Author</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Complete your profile</Text>

          {/* Profile Picture Section */}
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleChoosePicture} style={styles.profileImageContainer}>
              <Image 
                source={{ uri: profileImage || mockProfileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChoosePicture}>
              <Text style={styles.choosePictureText}>Choose a picture</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Author Name Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Author Name</Text>
              <TextInput
                style={styles.textInput}
                value={authorName}
                onChangeText={setAuthorName}
                placeholder="Enter your author name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Username Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7DF3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginRight: 40, // Compensate for back button width
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginBottom: 40,
    lineHeight: 38,
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  choosePictureText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#4F7DF3',
  },
  formContainer: {
    gap: 15,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    padding: 0,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#4F7DF3',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
  },
});