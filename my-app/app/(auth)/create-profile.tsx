import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function CreateProfileScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showAuthorOption, setShowAuthorOption] = useState(false);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera roll permissions to upload your picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCreateAccount = () => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter your name to continue.');
      return;
    }
    
    if (!username.trim()) {
      Alert.alert('Username required', 'Please enter a username to continue.');
      return;
    }

    // Show author account option after basic profile is complete
    setShowAuthorOption(true);
  };

  const handleCompleteProfile = (createAuthor = false) => {
    // Simulate profile creation
    console.log('Creating profile with:', { 
      name, 
      username, 
      profileImage, 
      isAuthor: createAuthor 
    });
    
    if (createAuthor) {
      // Navigate to author account creation flow
      router.replace('/profile/create-author/one');
    } else {
      // Navigate to main app
      router.replace('/home');
    }
  };

  const handleSkip = () => {
    // Navigate to main app with minimal profile
    router.replace('/home');
  };

  const isFormValid = name.trim() !== '' && username.trim() !== '';

  // Show author account option screen
  if (showAuthorOption) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setShowAuthorOption(false)}
            >
              <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Almost Done!</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.successSection}>
              <View style={styles.profilePreview}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.previewImage} />
                ) : (
                  <View style={styles.previewPlaceholder}>
                    <Ionicons name="person" size={40} color="#BBAEA8" />
                  </View>
                )}
              </View>
              
              <Text style={styles.welcomeTitle}>Welcome, {name}!</Text>
              <Text style={styles.welcomeSubtitle}>@{username}</Text>
            </View>

            <View style={styles.authorSection}>
              <Text style={styles.authorTitle}>Are you an author or storyteller?</Text>
              <Text style={styles.authorDescription}>
                Create an author account to publish your books, connect with readers, and manage your literary works.
              </Text>

              <View style={styles.authorFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="book" size={20} color="#EB4D2A" />
                  <Text style={styles.featureText}>Publish & manage books</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="create" size={20} color="#EB4D2A" />
                  <Text style={styles.featureText}>Create author notes</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="people" size={20} color="#EB4D2A" />
                  <Text style={styles.featureText}>Connect with readers</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.finalButtonContainer}>
              <TouchableOpacity
                style={styles.authorButton}
                onPress={() => handleCompleteProfile(true)}
              >
                <Text style={styles.authorButtonText}>Yes, create author account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.readerButton}
                onPress={() => handleCompleteProfile(false)}
              >
                <Text style={styles.readerButtonText}>Continue as reader</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Home Indicator */}
        <View style={styles.homeIndicator} />
      </SafeAreaView>
    );
  }

  // Initial profile setup screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Complete Profile</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.instructionText}>
            Now, let's complete your profile.
          </Text>

          {/* Profile Picture */}
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={handleImagePicker}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Ionicons name="camera" size={40} color="#BBAEA8" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleImagePicker}>
            <Text style={styles.uploadText}>Upload your picture</Text>
          </TouchableOpacity>

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#BBAEA8"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#BBAEA8"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.createAccountButton,
                !isFormValid && styles.createAccountButtonDisabled
              ]}
              onPress={handleCreateAccount}
              disabled={!isFormValid}
            >
              <Text style={styles.createAccountText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    marginHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  instructionText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BBAEA8',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#EB4D2A',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 40,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 28,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  skipButton: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#BBAEA8',
  },
  createAccountButton: {
    flex: 1,
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonDisabled: {
    backgroundColor: '#BBAEA8',
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Author option screen styles
  successSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePreview: {
    marginBottom: 20,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  previewPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#1E1E1E',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#BBAEA8',
  },
  authorSection: {
    marginBottom: 40,
  },
  authorTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 15,
  },
  authorDescription: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  authorFeatures: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#1E1E1E',
    flex: 1,
  },
  finalButtonContainer: {
    gap: 15,
  },
  authorButton: {
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  readerButton: {
    height: 55,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readerButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#BBAEA8',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 139,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
  },
});