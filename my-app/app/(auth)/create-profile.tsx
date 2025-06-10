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
  const [showFinalOnboarding, setShowFinalOnboarding] = useState(false);

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

  const handleNextToFinalOnboarding = () => {
    setShowFinalOnboarding(true);
  };

  const isFormValid = name.trim() !== '' && username.trim() !== '';

  // Show final onboarding screen
  if (showFinalOnboarding) {
    return (
      <SafeAreaView style={styles.welcomeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#EB4D2A" />
        
        {/* Status Bar Indicator */}
        <View style={styles.welcomeStatusIndicator} />
        
        {/* Decorative Paper Elements - Book Pages */}
        <View style={styles.paperElement1}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement2}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement3}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement4}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement5}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement6}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement7}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.finalOnboardingContent}>
          {/* Onboarding Text */}
          <View style={styles.finalTextContainer}>
            <Text style={styles.finalOnboardingText}>
              Find out about books, authors and stories.
            </Text>
            <Text style={styles.finalOnboardingText}>
              Read what people think or share yours.
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.welcomeButtonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleCompleteProfile(false)}
          >
            <Text style={styles.startButtonText}>Start using Pagez</Text>
          </TouchableOpacity>
        </View>

        {/* Home Indicator */}
        <View style={styles.welcomeHomeIndicator} />
      </SafeAreaView>
    );
  }

  // Show author account option screen
  if (showAuthorOption) {
    return (
      <SafeAreaView style={styles.welcomeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#EB4D2A" />
        
        {/* Status Bar Indicator */}
        <View style={styles.welcomeStatusIndicator} />
        
        {/* Decorative Paper Elements - Book Pages */}
        <View style={styles.paperElement1}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement2}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement3}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement4}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement5}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement6}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>
        <View style={styles.paperElement7}>
          <View style={styles.paperLines}>
            <View style={styles.paperLine} />
            <View style={styles.paperLine} />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.welcomeContent}>
          {/* Profile Photo */}
          <View style={styles.welcomeProfileContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.welcomeProfileImage} />
            ) : (
              <View style={styles.welcomeProfilePlaceholder}>
                <Ionicons name="person" size={40} color="#FFFFFF" />
              </View>
            )}
          </View>
          
          {/* Welcome Text */}
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeGreeting}>Oh, hey beautiful.</Text>
            <Text style={styles.welcomeTitle}>welcome</Text>
            <Text style={styles.welcomeTitle}>to pagez.</Text>
          </View>
        </View>

        {/* Next Button */}
        <View style={styles.welcomeButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextToFinalOnboarding}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Home Indicator */}
        <View style={styles.welcomeHomeIndicator} />
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  skipButton: {
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#BBAEA8',
  },
  createAccountButton: {
    width: '100%',
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
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#EB4D2A',
  },
  welcomeStatusIndicator: {
    position: 'absolute',
    top: 25,
    left: '50%',
    marginLeft: -53.5,
    width: 107,
    height: 35,
    backgroundColor: '#000000',
    borderRadius: 50,
  },
  paperElement1: {
    position: 'absolute',
    top: 60,
    left: -60,
    width: 140,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    transform: [{ rotate: '25deg' }],
    opacity: 0.95,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paperElement2: {
    position: 'absolute',
    top: 90,
    right: -40,
    width: 80,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    transform: [{ rotate: '-20deg' }],
    opacity: 0.9,
    padding: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paperElement3: {
    position: 'absolute',
    top: 180,
    right: -30,
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    transform: [{ rotate: '15deg' }],
    opacity: 0.85,
    padding: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paperElement4: {
    position: 'absolute',
    top: 400,
    right: -50,
    width: 90,
    height: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    transform: [{ rotate: '-30deg' }],
    opacity: 0.9,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paperElement5: {
    position: 'absolute',
    bottom: 180,
    left: -70,
    width: 130,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    transform: [{ rotate: '35deg' }],
    opacity: 0.95,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paperElement6: {
    position: 'absolute',
    bottom: 120,
    right: -45,
    width: 85,
    height: 85,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    transform: [{ rotate: '-25deg' }],
    opacity: 0.9,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paperElement7: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
    opacity: 0.8,
    padding: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeProfileContainer: {
    marginBottom: 40,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  welcomeProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  welcomeProfilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeGreeting: {
    fontSize: 28,
    fontFamily: 'Bogart-Light-trial',
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  welcomeTitle: {
    fontSize: 48,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 50,
    letterSpacing: -1,
    fontStyle: 'italic',
  },
  welcomeButtonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 30,
    right: 30,
  },
  nextButton: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  welcomeHomeIndicator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 139,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
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
  finalOnboardingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  finalTextContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  finalOnboardingText: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 38,
  },
  startButton: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  paperLines: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  paperLine: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 2,
    borderRadius: 0.5,
  },
});