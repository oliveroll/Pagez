import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialLoginProps {
  onSocialLogin?: (platform: string) => void;
  onJoinNow?: () => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ onSocialLogin, onJoinNow }) => {
  const handleSocialLogin = (platform: string) => {
    if (onSocialLogin) {
      onSocialLogin(platform);
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.signupSection}>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.joinNowText} onPress={onJoinNow}>
            Join now
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
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
    marginBottom: 25,
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
});
