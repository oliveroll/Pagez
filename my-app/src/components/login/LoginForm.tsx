"use client";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
  onUsePhone?: () => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onUsePhone, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (onLogin) {
      // Show error for demo purposes when using "wrong" credentials
      if (username.toLowerCase() === 'examplemodel' || !username.trim() || !password.trim()) {
        setShowError(true);
      } else {
        setShowError(false);
        onLogin(username, password);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {/* Username Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#BBAEA8"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#BBAEA8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={togglePasswordVisibility}
        >
          <Image 
            source={require('../../assets/images/login/Invisible.png')} 
            style={[styles.eyeImage, { opacity: showPassword ? 0.5 : 1 }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {showError && (
        <Text style={styles.errorText}>
          Username or email not registered to an account
        </Text>
      )}

      {/* Forgot Password Link - Positioned Right */}
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={onForgotPassword} style={styles.forgotPasswordLink}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Use phone number instead */}
      <TouchableOpacity onPress={onUsePhone} style={styles.phoneLink}>
        <Text style={styles.phoneLinkText}>Use phone number instead</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 26,
    marginBottom: 8, // Exact 8px spacing
    paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Medium-trial',
    fontWeight: 'normal',
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
    marginBottom: 20,
    marginTop: 0,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Bogart-Semibold-trial',
    fontWeight: 'normal',
    letterSpacing: -0.5,
  },
  phoneLink: {
    alignItems: 'center',
    marginBottom: 30,
  },
  phoneLinkText: {
    color: '#1E1E1E',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.8,
  },
  eyeIcon: {
    padding: 8,
  },
  eyeImage: {
    width: 20,
    height: 20,
  },
  errorText: {
    color: '#DD1313',
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.4,
    marginBottom: 8,
    marginTop: -4,
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 0, // Remove any margin to align with login button
  },
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginRight: 0, // Tight alignment with login button right edge
  },
  forgotPasswordText: {
    color: '#DD1313',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: -0.48,
    textDecorationLine: 'underline',
  },
});
