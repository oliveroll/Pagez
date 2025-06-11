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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Mock password reset email sending
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      Alert.alert(
        'Reset Email Sent',
        'If an account with this email exists, you will receive password reset instructions.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Auto navigate back to login after confirmation
              setTimeout(() => {
                router.replace('/(auth)/login');
              }, 1000);
            }
          }
        ]
      );
    }, 1500);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF3EC" />
      
      {/* Status Bar Indicator */}
      <View style={styles.statusIndicator} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Main Content */}
      <View style={styles.content}>
        {!emailSent ? (
          <>
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#BBAEA8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {/* Send Reset Email Button */}
            <TouchableOpacity 
              style={[styles.resetButton, isLoading && styles.resetButtonDisabled]} 
              onPress={handleSendResetEmail}
              disabled={isLoading}
            >
              <Text style={styles.resetButtonText}>
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={64} color="#EB4D2A" />
              <Text style={styles.successTitle}>Email Sent!</Text>
              <Text style={styles.successSubtitle}>
                Check your email for password reset instructions.
              </Text>
            </View>
          </>
        )}

        {/* Back to Login */}
        <TouchableOpacity onPress={handleBackToLogin} style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>
            Remember your password?{' '}
            <Text style={styles.backToLoginLink}>Back to Login</Text>
          </Text>
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
    backgroundColor: '#FCF3EC',
  },
  statusIndicator: {
    height: 5,
    backgroundColor: '#EB4D2A',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FCF3EC',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Medium-trial',
    color: '#1E1E1E',
  },
  divider: {
    height: 1,
    backgroundColor: '#BBAEA8',
    opacity: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Bogart-Semibold-trial',
    color: '#1E1E1E',
    marginBottom: 12,
    letterSpacing: -0.56,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
    lineHeight: 22,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    color: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#BBAEA8',
  },
  resetButton: {
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  resetButtonDisabled: {
    backgroundColor: '#BBAEA8',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    color: '#FFFFFF',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Bogart-Semibold-trial',
    color: '#1E1E1E',
    marginTop: 20,
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  backToLoginText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-trial',
    color: '#666666',
  },
  backToLoginLink: {
    color: '#EB4D2A',
    fontFamily: 'Bogart-Medium-trial',
  },
  homeIndicator: {
    height: 4,
    width: 140,
    backgroundColor: '#1E1E1E',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
}); 