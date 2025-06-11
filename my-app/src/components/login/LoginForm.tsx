"use client";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
  onUsePhone?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onUsePhone }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (onLogin) {
      onLogin(username, password);
    }
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
          secureTextEntry
          autoCapitalize="none"
        />
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
  },
  input: {
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
});
