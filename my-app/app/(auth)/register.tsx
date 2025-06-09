import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RegistrationScreen() {
    // ...
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateAccount = () => {
    // Handle account creation logic
    // console.log('Creating account with:', { username, email });
    router.replace('/(auth)/create-profile' as any);
  };

  const handleSocialLogin = (provider) => {
    // Handle social login logic
    console.log(`Login with ${provider}`);
  };

  const handlePhoneLogin = () => {
    router.replace('/(auth)/phone' as any);
  };

  const handleGoBack = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Status Bar Indicator */}
      <View style={styles.statusIndicator} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Create your account here</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#BBAEA8"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#BBAEA8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Phone Number Option */}
        <TouchableOpacity onPress={handlePhoneLogin}>
          <Text style={styles.phoneOption}>Use phone number instead</Text>
        </TouchableOpacity>

        {/* Social Login Section */}
        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Or continue using...</Text>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={() => handleSocialLogin('Apple')}
            >
              <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={() => handleSocialLogin('Google')}
            >
              <Ionicons name="logo-google" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            
            
          </View>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusIndicator: {
    position: 'absolute',
    top: 25,
    left: '50%',
    marginLeft: -53.5, // Half of 107px
    width: 107,
    height: 35,
    backgroundColor: '#000000',
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 78,
    paddingBottom: 20,
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
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
    marginRight: 44, // To center the title accounting for back button
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(171, 176, 186, 0.4)',
    marginHorizontal: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 29,
  },
  title: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
    letterSpacing: -0.04,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 45,
    paddingHorizontal: 20,
    fontFamily: 'Bogart-Regular-Trial',
    fontSize: 17,
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
  phoneOption: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
    letterSpacing: -0.04,
    marginTop: 20,
    marginBottom: 60,
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  socialTitle: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
    marginBottom: 24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1E1E1E',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  createButtonText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.04,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 139,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});