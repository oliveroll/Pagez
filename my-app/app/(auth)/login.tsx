import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const bookHeaderImage = require('../../src/assets/images/book-header.png');

const { width, height } = Dimensions.get('window');

// Login Button Component
const LoginButton = ({ onPress, title = "Login" }) => (
  <TouchableOpacity onPress={onPress} style={styles.loginButton}>
    <Text style={styles.loginButtonText}>{title}</Text>
  </TouchableOpacity>
);

// Input Field Component
const LoginInput = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#BBAEA8"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      keyboardType={placeholder.toLowerCase().includes('email') ? 'email-address' : 'default'}
    />
  </View>
);

// Page Indicator Component
const PageIndicator = ({ currentPage = 2, totalPages = 3 }) => (
  <View style={styles.pageIndicator}>
    {Array.from({ length: totalPages }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          index === currentPage ? styles.activeDot : styles.inactiveDot
        ]}
      />
    ))}
  </View>
);

// Home Indicator Component
const HomeIndicator = () => (
  <View style={styles.homeIndicator}>
    <View style={styles.homeIndicatorBar} />
  </View>
);

export default function LoginScreen({ inOnboarding }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Google AuthSession setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '407408718192.apps.googleusercontent.com',
    iosClientId: '',
    androidClientId: '',
    webClientId: '',
  });

  // Handle Google Auth response
  React.useEffect(() => {
    if (response?.type === 'success') {
      router.replace('/(auth)/create-profile');
    }
  }, [response]);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      router.replace('/(auth)/create-profile');
    } else {
      router.replace('/(auth)/create-profile');
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === 'Google') {
      promptAsync();
    } else {
      router.replace('/(auth)/create-profile');
    }
  };

  const handleUsePhone = () => {
    router.push('/(auth)/phone');
  };

  const handleJoinNow = () => {
    router.replace('/(auth)/register');
  };

  return (
    <SafeAreaView style={[
      styles.container,
      inOnboarding && { width, height, paddingHorizontal: 0, paddingVertical: 0 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3f0" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with rotated image */}
        <View style={styles.headerSection}>
          <View style={styles.rotatedImageContainer}>
            <Image
              source={bookHeaderImage}
              style={styles.rotatedImage}
              resizeMode="cover"
            />
          </View>
          
          <Text style={styles.logo}>pagez</Text>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>Let's go...</Text>

          {/* Input Fields with exact same spacing */}
          <View style={styles.inputContainer}>
            <LoginInput
              placeholder="Username or Email"
              value={username}
              onChangeText={setUsername}
            />
            
            <LoginInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Login Button with same spacing */}
            <LoginButton onPress={handleLogin} />
          </View>

          {/* Use phone number instead */}
          <TouchableOpacity onPress={handleUsePhone} style={styles.phoneLink}>
            <Text style={styles.phoneLinkText}>Use phone number instead</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Or continue using...</Text>
            
            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Instagram')}
              >
                <Ionicons name="logo-instagram" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Apple')}
              >
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Section */}
          <View style={styles.signupSection}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.joinNowText} onPress={handleJoinNow}>
                Join now
              </Text>
            </Text>
          </View>

          {/* Page Indicator */}
          <PageIndicator />
        </View>
      </ScrollView>
      
      {/* Home Indicator */}
      <HomeIndicator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    minHeight: height,
  },
  headerSection: {
    height: Math.min(250, height * 0.32), // Even more compact for tighter spacing
    position: 'relative',
    overflow: 'visible',
  },
  rotatedImageContainer: {
    position: 'absolute',
    width: Math.min(320, width * 0.85),
    height: Math.min(320, height * 0.32),
    right: -40,
    top: -20,
    transform: [{ rotate: '-9.33deg' }],
    borderRadius: 8,
    overflow: 'hidden',
  },
  rotatedImage: {
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    left: 25,
    top: 20, // Moved closer to title
    fontSize: Math.min(52, width * 0.13),
    fontFamily: 'Bogart-Bold-Trial',
    color: '#EB4D2A',
    fontWeight: 'bold',
    fontStyle: 'italic',
    zIndex: 10,
    textShadowColor: 'rgba(235, 77, 42, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    transform: [{ rotate: '-3deg' }],
    letterSpacing: 2,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 0, // No space between logo and title
  },
  title: {
    fontSize: Math.min(48, width * 0.12),
    fontFamily: 'Bogart-Bold-Trial', // Made bold as requested
    color: '#EB4D2A',
    fontWeight: 'bold', // Made bold
    fontStyle: 'italic',
    lineHeight: Math.min(54, width * 0.135),
    letterSpacing: 1,
    marginBottom: 12, // Tighter spacing before inputs
    textShadowColor: 'rgba(235, 77, 42, 0.15)',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 3,
    transform: [{ rotate: '-1deg' }],
  },
  inputContainer: {
    marginBottom: 0, // Removed margin to control spacing individually
  },
  inputWrapper: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 26,
    marginBottom: 8, // Exact same 8px spacing between all elements
    paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.5,
  },
  loginButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Spacing after login button
    marginTop: 0, // Removed to ensure consistent 8px spacing from password field
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  phoneLink: {
    alignItems: 'center',
    marginBottom: 30,
  },
  phoneLinkText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#1E1E1E',
    letterSpacing: -0.5,
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  socialTitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#1E1E1E',
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  signupText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#1E1E1E',
    letterSpacing: -0.5,
    lineHeight: 22,
    textAlign: 'center',
  },
  joinNowText: {
    color: '#EB4D2A',
    fontWeight: 'bold',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#EB4D2A',
  },
  inactiveDot: {
    backgroundColor: '#D9D9D9',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 139,
    height: 5,
  },
  homeIndicatorBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 2.5,
  },
});