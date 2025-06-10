import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function PhoneRegistrationScreen() {
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    // TODO: Send phone to backend, send code, etc.
    router.replace('/(auth)/phone-verification' as any);
  };

  const handleUseEmailInstead = () => {
    router.replace('/(auth)/register' as any);
  };

  const handleGoBack = () => {
    router.replace('/(auth)/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3f0" />
      
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

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#BBAEA8"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Use email instead */}
        <TouchableOpacity onPress={handleUseEmailInstead}>
          <Text style={styles.emailOption}>Use email instead</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0', // Beige background like other screens
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
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: Math.min(32, width * 0.085), // Large title like register screen
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 40,
    lineHeight: Math.min(38, width * 0.095),
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 26,
    paddingHorizontal: 25,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.5,
    backgroundColor: '#FFFFFF',
  },
  emailOption: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 60,
  },
  continueButton: {
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  continueButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.5,
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